import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';

import { DonorService } from '../services/donor.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Socket } from 'ng2-socket-io';

const BASE_URL = environment.baseUrl;

@Component({
  selector: 'app-donor-management',
  templateUrl: './donor-management.component.html',
  styleUrls: ['./donor-management.component.css']
})
export class DonorManagementComponent implements OnInit {

  public modalRef: BsModalRef;
  @ViewChild('template') tr: TemplateRef<any>

  private id;
  private donor: any = {};

  public alerts: any = [];

  @Input() latitude: Number;
  @Input() longitude: Number;
  @Output() onSuccess = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<boolean>();

  private customUrl: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donorService: DonorService,
    private modalService: BsModalService,
    private socket: Socket
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id) {
      this.donorService.getDonorById(this.id)
        .subscribe(donor => {
          this.donor = donor.json();
        });
    }
  }

  private updateDonor() {
    if (this.id) {

      this.donorService.updateDonor(this.donor)
        .subscribe(res => {
          if (res.json().name == 'MongoError') {
            // only check is email uniqueness
            this.alerts.push({
              type: 'danger',
              msg: 'Update failed: Email address already exists',
              timeout: 3000
            });
          } else {
            this.alerts.push({
              type: 'success',
              msg: 'Updated successfully',
              timeout: 3000
            });
            this.socket.emit('edit', this.donor);
          }
        });
    } else {

      this.donor.location = {};
      this.donor.location.latitude = this.latitude;
      this.donor.location.longitude = this.longitude;

      this.donorService.createDonor(this.donor)
        .subscribe(res => {
          let resJson = res.json();
          if (resJson.name == 'MongoError') {
            // only check is email uniqueness
            this.alerts.push({
              type: 'danger',
              msg: 'Error: Email address already exists',
              timeout: 3000
            });
          } else {
            this.alerts.push({
              type: 'success',
              msg: 'Created successfully',
              timeout: 3000
            });
            this.customUrl = BASE_URL + "/donor/" + resJson._id;
            this.modalRef = this.modalService.show(this.tr);
            this.socket.emit('add', resJson);
            this.onSuccess.emit(true);
          }
        });
    }
  }

  private deleteDonor() {
    this.donorService.deleteDonor(this.id)
      .subscribe(donor => {
        this.alerts.push({
          type: 'success',
          msg: 'Deleted successfully',
          timeout: 3000
        });
        this.socket.emit('remove', this.donor);
        this.onDelete.emit(true);
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 1000);
      });
  }

  private closeUrlModal() {
    this.modalRef.hide();
  }
}
