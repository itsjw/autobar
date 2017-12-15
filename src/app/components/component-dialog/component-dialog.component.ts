import { Component, OnInit } from '@angular/core';
import { LOGGER } from '../../providers/logger.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  templateUrl: './component-dialog.component.html',
  styleUrls: ['./component-dialog.component.scss']
})
export class ComponentDialogComponent implements OnInit {
  title = `Component Dialog`;
  name = ``;

  constructor(private activeModal: NgbActiveModal) {

  }

  async ngOnInit() {
  }

  close() {
    this.activeModal.close('Close click');
  }
}
