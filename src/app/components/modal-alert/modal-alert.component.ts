import { Modal } from 'bootstrap';
import { Component, OnInit } from '@angular/core';
import { ModalAlertService } from '@services/modal-alert.service';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
})
export class ModalAlertComponent implements OnInit {
  constructor(private modalAlertService: ModalAlertService) {}
  public modal: Modal;

  public title = '';
  public description = '';

  public ngOnInit(): void {
    this.modal = new Modal(document.getElementById('modalAlert'));

    this.modalAlertService.options.subscribe((options) => {
      this.title = options.title || 'Heads up!';
      this.description = options.description;
      options ? this.modal.show() : this.modal.hide();
    });
  }
}
