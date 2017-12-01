import { Component, OnInit } from '@angular/core';
import { LOGGER } from "../../providers/logger.service"
import { UserService } from "../../providers/user.service";
import { User } from "../../../entity/User";
import { runDbTest } from "../../providers/postgres.service"
import { ExceptionInfo } from '_debugger';
import { createConnection } from "typeorm";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title = `App works !`;

//  constructor(private userService: UserService) { 
  constructor() { 
    }

  async ngOnInit() {
    LOGGER.info("Hello Again!");

    runDbTest();

    createConnection({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "whatever",
      "database": "puppies",
      "synchronize": true,
      "logging": false,
         entities: [
          User
      ],
    }).then(async connection => {
      try {
      let user: User = await connection.getRepository(User).findOneById(1);

      LOGGER.info(`User Name: ${user.firstName} ${user.lastName}`);
      }
      catch (error) {
        LOGGER.info(error);
      }
    }).catch(error => {
      LOGGER.info(error);
    });
    
    try {
      //let userService: UserService = new UserService();

      //let user: User = await userService.getUser(1);

      //LOGGER.info(`User Name: ${user.firstName} ${user.lastName}`);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }
}
