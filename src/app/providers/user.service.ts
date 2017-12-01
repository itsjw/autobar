import { LOGGER } from "./logger.service";
import { Injectable } from '@angular/core';
import { createConnection, getManager, getRepository } from "typeorm";
import { User } from "../../entity/User";


@Injectable()
export class UserService {

  constructor() {
  }

  getUser(userId: number) {
    createConnection(/*...*/).then(async connection => {
      
      let user: User = await getRepository(User).findOneById(userId);

      return user;
    }).catch(error => {
      LOGGER.info(error);
    });
  }
}
