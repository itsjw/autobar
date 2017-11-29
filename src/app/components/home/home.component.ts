import { Component, OnInit } from '@angular/core';
import { LOGGER } from "../../providers/logger.service"
import { createConnection } from "typeorm";
import { User } from "../../../entity/User";
import { runDbTest } from "../../providers/postgres.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `App works !`;

  constructor() { }

  ngOnInit() {
    LOGGER.info("Hello Again!");

    runDbTest();
  }
}
