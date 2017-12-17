import { Component, OnInit, Input } from '@angular/core';
import { LOGGER } from '../../providers/logger.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements OnInit {
  @Input() name: string = '';
  title: string = '';

  constructor(private activeModal: NgbActiveModal) {

  }

  async ngOnInit() {
  }

  close() {
    this.activeModal.close(this.name);
  }

  dismiss() {
    this.activeModal.dismiss('Dismissed');
  }
}
