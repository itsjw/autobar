import "reflect-metadata";
import {createConnection} from "typeorm";
import { LOGGER } from "./logger.service"
import {User} from "../../entity/User";
  
export function runDbTest() {
    LOGGER.info("**** HERE");
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
        
            LOGGER.info("Inserting a new user into the database...");
            const user = new User();
            user.firstName = "Timber";
            user.lastName = "Saw";
            user.age = 25;
            await connection.manager.save(user);
            LOGGER.info("Saved a new user with id: " + user.id);
            
            LOGGER.info("Loading users from the database...");
            const users = await connection.manager.find(User);
            LOGGER.info("Loaded users: ", users);
             
            LOGGER.info("Here you can setup and run express/koa/any other framework.");
            
          }).catch(error => {
            LOGGER.info(error);
          })
        }
      