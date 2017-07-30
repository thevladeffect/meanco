import { Component, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

  public modalRef: BsModalRef;
  @ViewChild('template') tr: TemplateRef<any>

  latitude: Number;
  longitude: Number;

  constructor(
    private modalService: BsModalService
  ) { }

  public openModal(lat: Number, lon: Number) {

    this.latitude = lat;
    this.longitude = lon;
    this.modalRef = this.modalService.show(this.tr);
  }

  public closeModal() {

    this.modalRef.hide();
  }

  public onSuccess(success: boolean) {

    if (success) this.closeModal();
  }
}
