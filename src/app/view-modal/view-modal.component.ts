import { Component, TemplateRef, NgModule, ViewChild, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Socket } from 'ng2-socket-io';


@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.css']
})
export class ViewModalComponent implements OnInit {

  public modalRef: BsModalRef;
  @ViewChild('template') tr: TemplateRef<any>

  private showEmail: Boolean = false;
  private showContact: Boolean = false;

  private data: any;

  constructor(
    private modalService: BsModalService,
    private socket: Socket
  ) { }

  ngOnInit() {
    this.socket.on('update', (item) => {
      this.data = item;
    });
  }

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
