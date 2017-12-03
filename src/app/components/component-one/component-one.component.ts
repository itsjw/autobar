import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../providers/database.service';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss']
})
export class ComponentOneComponent implements OnInit {
  title = `Home !`;
  
  //  constructor(private userService: UserService) { 
    constructor(private router: Router, public databaseService: DatabaseService) { 
    
    }
  
  
  ngOnInit() {
  }

  routeToHome(event) {
    this.router.navigate(['home']);
  }
}
