import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { LOGGER } from '../providers/logger.service'
import * as $ from 'jquery'
import { ModalService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    selector: 'modal',
    template: '<ng-content></ng-content>'
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: JQuery;

    constructor(private modalService: ModalService, private elementRef: ElementRef) {
        LOGGER.info('In Modal Component Constructor');
        try {
            LOGGER.info(this.elementRef);
            this.element = $(this.elementRef.nativeElement);
        }
        catch (error) {
            LOGGER.info(error);
        }
    }

    ngOnInit(): void {
        LOGGER.info('In Modal Component ngOnInit');
        try {
            let modal = this;

            // ensure id attribute exists
            if (!this.id) {
                LOGGER.info('modal must have an id');
                return;
            }
            else {
                /*
                LOGGER.info(`modal id: ${this.id}`);
                this.element = $(`#${this.id}`);
                LOGGER.info(this.element);

                let spreadsheetSaveButton: JQuery = $('#spreadsheet-save-button');
                LOGGER.info('spreadsheet' + spreadsheetSaveButton);

                let modalDiv: JQuery = $('#custom-modal-1-div');
                this.element = $('#custom-modal-1-div');
                LOGGER.info('modal' + modalDiv);

                */
            }

            // move element to bottom of page (just before </body>) so it can be displayed above everything else
            LOGGER.info(this.element);
            this.element.appendTo('body');

            // close modal on background click
            this.element.on('click', function (e: any) {
                var target = $(e.target);
                if (!target.closest('.modal-body').length) {
                    modal.close();
                }
            });

            // add self (this modal instance) to the modal service so it's accessible from controllers
            this.modalService.add(this);
        }
        catch (error) {
            LOGGER.info(error);
        }
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.show();
        $('body').addClass('modal-open');
    }

    // close modal
    close(): void {
        this.element.hide();
        $('body').removeClass('modal-open');
    }
}