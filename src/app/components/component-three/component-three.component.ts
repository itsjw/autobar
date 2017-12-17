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

  tabIndex: number = 0;

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

      for (var spreadsheet of this.spreadsheets) {
        LOGGER.info(`Spreadsheet: ${spreadsheet.name}`);
        for (var row of spreadsheet.rows) {
          LOGGER.info(`Row: ${row.name}`);
          for (var colRow of row.colRows) {
            LOGGER.info(`Col: ${colRow.col.name} ${colRow.value}`);
          }
        }

        this.orderSpreadsheet(spreadsheet);
      }
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  routeToHome(event) {
    this.router.navigate(['home']);
  }

  async save(spreadsheet: Spreadsheet) {
    try {
      await getRepository(Spreadsheet).save(spreadsheet);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  async addColumn(spreadsheet: Spreadsheet, name: string) {
    try {
      let col: Col = new Col();

      col.name = name;
      col.description = `Col ${name} Description`;
      col.sortOrder = (spreadsheet.rows[0].colRows.length > 0) ? spreadsheet.rows[0].colRows.length : 0;

      for (var row of spreadsheet.rows) {
        let colRow: ColRow = new ColRow();

        colRow.col = col;
        colRow.row = row;
        colRow.value = 0;

        row.colRows.push(colRow)
      }

      await getRepository(Spreadsheet).save(spreadsheet);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  async addRow(spreadsheet: Spreadsheet, name: string) {
    try {
      let row: Row = new Row();

      row.name = name;
      row.description = `Row ${name} Description`;
      row.sortOrder = (spreadsheet.rows.length > 0) ? spreadsheet.rows.length : 0;
      row.colRows = [];

      spreadsheet.rows.push(row);

      for (var firstRowColRow of spreadsheet.rows[0].colRows) {
        let colRow: ColRow = new ColRow();

        colRow.col = firstRowColRow.col;
        colRow.row = row;
        colRow.value = 0;

        row.colRows.push(colRow);
      }

      await getRepository(Spreadsheet).save(spreadsheet);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  addRowModal(spreadsheet: Spreadsheet) {
    const modalRef = this.modalService.open(NameDialogComponent)
    modalRef.componentInstance.title = 'Add Row';

    modalRef.result.then((result) => {
      this.addRow(spreadsheet, result);
    }, (reason) => {
      console.log('Dismissed!!');
    });
  }

  addColumnModal(spreadsheet: Spreadsheet) {
    const modalRef = this.modalService.open(NameDialogComponent)
    modalRef.componentInstance.title = 'Add Column';

    modalRef.result.then((result) => {
      this.addColumn(spreadsheet, result);
    }, (reason) => {
      console.log('Dismissed!!');
    });
  }

  async deleteColumn(spreadsheet: Spreadsheet, col: Col) {
    alert("Delete Column");

    //for (var col )

    /*
    await getRepository(Col)
    .createQueryBuilder()
    .delete()
    .where("id = :id", { id: col.id })
    .execute();
    */
  }

  setTabIndex(spreadsheet_index: number) {
    this.tabIndex = spreadsheet_index;
  }

  orderSpreadsheet(spreadsheet: Spreadsheet) {
    spreadsheet.rows.sort((a, b) => a.sortOrder < b.sortOrder ? -1 : a.sortOrder > b.sortOrder ? 1 : 0);

    for (var row of spreadsheet.rows) {
      row.colRows.sort((a, b) => a.col.sortOrder < b.col.sortOrder ? -1 : a.col.sortOrder > b.col.sortOrder ? 1 : 0);
    }
  }

  async collapseSpreadsheetSortOrder(spreadsheet: Spreadsheet) {
    for (var index = 0; index < spreadsheet.rows.length; index++) {
      spreadsheet.rows[index].sortOrder = index;
    }

    if (spreadsheet.rows.length > 0) {
      for (var index = 0; index < spreadsheet.rows[0].colRows.length; index++) {
        spreadsheet.rows[0].colRows[index].col.sortOrder = index;
      }
    }

    await getRepository(Spreadsheet).save(spreadsheet);
  }
}
