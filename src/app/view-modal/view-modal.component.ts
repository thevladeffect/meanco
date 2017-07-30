import { Component, TemplateRef, NgModule, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.css']
})
export class ViewModalComponent {

  public modalRef: BsModalRef;
  @ViewChild('template') tr: TemplateRef<any>

  private showEmail: Boolean = false;
  private showContact: Boolean = false;

  private data: any;

  constructor(
    private modalService: BsModalService
  ) { }

  public openModal(data) {
    this.data = data;
    this.modalRef = this.modalService.show(this.tr);
  }

  public closeModal() {
    this.modalRef.hide();
    this.showEmail = false;
    this.showContact = false;
  }
}
