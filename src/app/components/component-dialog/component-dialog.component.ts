import { Component, OnInit } from '@angular/core';
import { LOGGER } from '../../providers/logger.service';

@Component({
  templateUrl: './component-dialog.component.html',
  styleUrls: ['./component-dialog.component.scss']
})
export class ComponentDialogComponent implements OnInit {
  title = `Component Dialog`;

  constructor() {

  }

  async ngOnInit() {
  }
}
