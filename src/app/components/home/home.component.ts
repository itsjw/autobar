import { Router } from "@angular/router"
import { Component, OnInit } from '@angular/core';
import { LOGGER } from "../../providers/logger.service"
import { UserService } from "../../providers/user.service";
import { User } from "../../../entity/User";
import { runDbTest } from "../../providers/postgres.service"
import { ExceptionInfo } from '_debugger';
import { createConnection, getRepository } from "typeorm";
import { DatabaseService } from "../../providers/database.service"
import { Repository } from 'typeorm/repository/Repository';
import { Connection } from 'typeorm/connection/Connection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title = `Home !`;

//  constructor(private userService: UserService) { 
  constructor(private router: Router, public databaseService: DatabaseService) { 
  
  }

  async ngOnInit() {
    /*
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
    */

    if (!this.databaseService) {
      LOGGER.info("Database Service is null");
    }
    else {
      LOGGER.info("Database Service has been injected");
    }

    /*
    //let userRepository: Repository<User> = this.databaseService.getUserRepository;
    let userRepository: Repository<User> = this.databaseService.getUserRepository();
    
    if (!userRepository) {
      LOGGER.info("User Repository is null");
    }
    else {
      LOGGER.info("Got a User Repository");

      //let user: User = await userRepository.findOneById(User);
    }
*/
    let connection: Connection = await this.databaseService.getConnection();
    
    if (!connection) {
      LOGGER.info("Connection is null");
    }
    else {
      LOGGER.info("Got a Connection");

      let user: User = await connection.getRepository(User).findOneById(1);
  
      LOGGER.info(`Hello Again! ${user.firstName} ${user.lastName}`);
      }

    /*
      let user: User = await this.databaseService.getUser();
      if (!user) {
        LOGGER.info("User is null");
      }
      else {
        LOGGER.info("Got a User");
  
        LOGGER.info(`Hello Again! ${user.firstName} ${user.lastName}`);
      }
      */
    try {
      //let userService: UserService = new UserService();

      //let user: User = await userService.getUser(1);

      //LOGGER.info(`User Name: ${user.firstName} ${user.lastName}`);
    }
    catch (error) {
      LOGGER.info(error);
    }
  }

  routeToOne(event) {
    this.router.navigate(['one']);
  }
}
