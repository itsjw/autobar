import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGGER } from '../../providers/logger.service';
import { DatabaseService } from '../../providers/database.service';
import { getRepository } from 'typeorm';
import { User } from '../../../entity/User';
import { Spreadsheet } from '../../../entity/Spreadsheet';
import { Col } from '../../../entity/Col';
import { ColRow } from 'entity/ColRow';

@Component({
  selector: 'app-component-three',
  templateUrl: './component-three.component.html',
  styleUrls: ['./component-three.component.scss']
})
export class ComponentThreeComponent implements OnInit {
  title = `Component Three`;

  users: User[] = [];

  spreadsheets: Spreadsheet[] = [];

  spreadsheet: Spreadsheet;

  cols: Col[] = [];

  //  constructor(private userService: UserService) { 
  constructor(private router: Router, public databaseService: DatabaseService) {

  }


  async ngOnInit() {
    try {
      this.users = await getRepository(User).find();

      for (var user of this.users) {
        LOGGER.info(`User Name in Component Three: ${user.id} ${user.firstName} ${user.lastName}`);
      }
    }
    catch (error) {
      LOGGER.info(error);
    }

    try {
      this.spreadsheets = await getRepository(Spreadsheet)
      .createQueryBuilder("spreadsheet")
      .leftJoinAndSelect("spreadsheet.rows", "row")
      .leftJoinAndSelect("row.colRows", "colRow")
      .leftJoinAndSelect("colRow.col", "col")
      .getMany();

      this.spreadsheet = this.spreadsheets[0];

      for (var spreadsheet of this.spreadsheets) {
        LOGGER.info(`Spreadsheet: ${spreadsheet.name}`);
        for (var row of spreadsheet.rows) {
          LOGGER.info(`Row: ${row.name}`);
          for (var colRow of row.colRows) {
            LOGGER.info(`Col: ${colRow.col.name} ${colRow.value}`);
          }
        }
      }

      this.cols = await getRepository(Col).find();
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  routeToHome(event) {
    this.router.navigate(['home']);
  }

  async save(event) {
    try {
      await getRepository(Spreadsheet).save(this.spreadsheet);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  async addColumn(event) {
    try {
      let col: Col = new Col();
      
      col.name = `Col ${this.cols.length}`;
      col.description = `Col ${this.cols.length} Description`;

      for (var row of this.spreadsheet.rows) {
        let colRow: ColRow = new ColRow();

        colRow.col = col;
        colRow.row = row;
        colRow.value = 0;

        row.colRows.push(colRow)
      }

      await getRepository(Spreadsheet).save(this.spreadsheet);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  async addRow(event) {
    try {
      await getRepository(Spreadsheet).save(this.spreadsheet);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }
}
