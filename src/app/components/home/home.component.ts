import { Component, OnInit } from '@angular/core';
import { getLogger } from "../../providers/logger.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `App works !`;

  constructor() { }

  ngOnInit() {
    getLogger().info("Hello");
  }

}
