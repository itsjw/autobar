import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGGER } from '../../providers/logger.service';
import { DatabaseService } from '../../providers/database.service';
import { getRepository } from 'typeorm';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentDialogComponent } from '../component-dialog/component-dialog.component'
import { User } from '../../../entity/User';
import { Spreadsheet } from '../../../entity/Spreadsheet';
import { Row } from '../../../entity/Row';
import { Col } from '../../../entity/Col';
import { ColRow } from '../../../entity/ColRow';
import { NameDialogComponent } from 'app/components/name-dialog/name-dialog.component';

@Component({
  selector: 'app-component-three',
  templateUrl: './component-three.component.html',
  styleUrls: ['./component-three.component.scss']
})
export class ComponentThreeComponent implements OnInit {
  title = `Component Three`;

  users: User[] = [];

  spreadsheets: Spreadsheet[] = [];

  cols: Col[] = [];

  //  constructor(private userService: UserService) { 
  constructor(private router: Router, public databaseService: DatabaseService, private modalService: NgbModal) {

  }


  async ngOnInit() {
    try {
      /*
      this.users = await getRepository(User).find();

      for (var user of this.users) {
        LOGGER.info(`User Name in Component Three: ${user.id} ${user.firstName} ${user.lastName}`);
      }
      */
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
        //.orderBy("row.sortOrder", "ASC")
        .getMany();

      //      this.spreadsheet = this.spreadsheets[0];

      for (var spreadsheet of this.spreadsheets) {
        LOGGER.info(`Spreadsheet: ${spreadsheet.name}`);
        for (var row of spreadsheet.rows) {
          LOGGER.info(`Row: ${row.name}`);
          for (var colRow of row.colRows) {
            LOGGER.info(`Col: ${colRow.col.name} ${colRow.value}`);
          }
        }

        spreadsheet.rows.sort((a, b) => a.sortOrder < b.sortOrder ? -1 : a.sortOrder > b.sortOrder ? 1 : 0)

        for (var row of spreadsheet.rows) {
          row.colRows.sort((a, b) => a.col.sortOrder < b.col.sortOrder ? -1 : a.col.sortOrder > b.col.sortOrder ? 1 : 0)
        }
      }

      this.cols = await getRepository(Col).find();

      this.cols.sort((a, b) => a.sortOrder < b.sortOrder ? -1 : a.sortOrder > b.sortOrder ? 1 : 0)
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  routeToHome(event) {
    this.router.navigate(['home']);
  }

  async save(spreadsheet_index: number) {
    try {
      await getRepository(Spreadsheet).save(this.spreadsheets[spreadsheet_index]);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  async addColumn(spreadsheet_index: number, name: string) {
    try {
      let col: Col = new Col();

      col.name = name;
      col.description = `Col ${name} Description`;
      col.sortOrder = this.cols.length;

      this.cols.push(col);

      for (var row of this.spreadsheets[spreadsheet_index].rows) {
        let colRow: ColRow = new ColRow();

        colRow.col = col;
        colRow.row = row;
        colRow.value = 0;

        row.colRows.push(colRow)
      }

      await getRepository(Spreadsheet).save(this.spreadsheets[spreadsheet_index]);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  async addRow(spreadsheet_index: number, name: string) {
    try {
      let row: Row = new Row();

      row.name = name;
      row.description = `Row ${name} Description`;
      row.sortOrder = this.spreadsheets[spreadsheet_index].rows.length;
      row.colRows = [];

      this.spreadsheets[spreadsheet_index].rows.push(row);

      for (var col of this.cols) {
        let colRow: ColRow = new ColRow();

        colRow.col = col;
        colRow.row = row;
        colRow.value = 0;

        row.colRows.push(colRow);
      }

      await getRepository(Spreadsheet).save(this.spreadsheets[spreadsheet_index]);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  addRowModal(spreadsheet_index: number) {
    const modalRef = this.modalService.open(NameDialogComponent)
    modalRef.componentInstance.title = 'Add Row';

    modalRef.result.then((result) => {
      this.addRow(spreadsheet_index, result);
    }, (reason) => {
      console.log('Dismissed!!');
    });
  }

  addColumnModal(spreadsheet_index: number) {
    const modalRef = this.modalService.open(NameDialogComponent)
    modalRef.componentInstance.title = 'Add Column';

    modalRef.result.then((result) => {
      this.addColumn(spreadsheet_index, result);
    }, (reason) => {
      console.log('Dismissed!!');
    });
  }
}
