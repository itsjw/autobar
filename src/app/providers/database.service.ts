import { Injectable, OnInit } from '@angular/core';
import { createConnection, Connection} from "typeorm";
import { User } from "../../entity/User"
import { Repository } from 'typeorm/repository/Repository';
import { LOGGER } from "../providers/logger.service"
import { Spreadsheet } from 'entity/Spreadsheet';
import { Col } from '../../entity/Col';
import { Row } from '../../entity/Row';
import { ColRow } from '../../entity/ColRow';

@Injectable()
export class DatabaseService implements OnInit {
  
  connection: Connection;
  
  constructor() {
    LOGGER.info("Service Constructor Called");

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
          User, Spreadsheet, Row, Col, ColRow
      ],
    }).then(connection => {
      this.connection = connection;
    }).catch(error => {
      LOGGER.info(error);
    }).then(x => {
      if (this.connection) { 
        LOGGER.info("Created Connection");
      }
      else {
        LOGGER.info("NULL Connection");
      }
    });
  }

  ngOnInit() {
    LOGGER.info("ngOnInit Called");
    
/*
    this.connection = await createConnection({
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
    });

    if (!this.connection) {
      LOGGER.info("Connection 2 is null");
    }
    else {
      LOGGER.info("Got a Connection 2");

      let user: User = await this.connection.getRepository(User).findOneById(1);
  
      LOGGER.info(`Hello Again 2! ${user.firstName} ${user.lastName}`);
      }
*/
  }

  async getConnection(): Promise<Connection> {
    if (this.connection == null) {
      this.connection = await createConnection({
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
      });
    }

    return new Promise<Connection>((resolve, reject) => {
      resolve(this.connection);
    });
  }
/*
  async getUserRepository(): Repository<User> {
    let connection: Connection = await this.getConnection();
    return  connection.getRepository(User);
  }

  getUser(): Promise<User> {
    let user: Promise<User> = null;

    if (this.connection) {
      let connection: Connection = await this.getConnection();
      user = connection.getRepository(User).findOneById(1);
    }

    return user;
  }
  */
}
