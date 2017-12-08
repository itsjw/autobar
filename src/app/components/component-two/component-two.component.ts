import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGGER } from '../../providers/logger.service';
import { DatabaseService } from '../../providers/database.service';
import { getRepository } from 'typeorm';
import { User } from '../../../entity/User';

@Component({
  selector: 'app-component-two',
  templateUrl: './component-two.component.html',
  styleUrls: ['./component-two.component.scss']
})
export class ComponentTwoComponent implements OnInit {
  title = `Home !`;
  
  //  constructor(private userService: UserService) { 
    constructor(private router: Router, public databaseService: DatabaseService) { 
    
    }
  
  
  async ngOnInit() {
    try {
      let user: User = await getRepository(User).findOneById(1);

      LOGGER.info(`User Name in Component One: ${user.firstName} ${user.lastName}`);
      }
      catch (error) {
        LOGGER.info(error);
      }
}

  routeToHome(event) {
    this.router.navigate(['home']);
  }
}
