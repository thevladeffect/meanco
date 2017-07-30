/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { environment } from 'environments/environment';

import { EsriMapComponent } from '../app/esri-map/esri-map.component';
import { ViewModalComponent } from '../app/view-modal/view-modal.component';
import { EditModalComponent } from '../app/edit-modal/edit-modal.component';
import { DonorManagementComponent } from '../app/donor-management/donor-management.component';

import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EsriLoaderService } from 'angular2-esri-loader';
import { DonorService } from '../app/services/donor.service';
import { SocketIoModule, SocketIoConfig } from 'ng2-socket-io';

const config: SocketIoConfig = { url: environment.baseUrl, options: {} };

describe('EsriMapComponent', () => {
  let component: EsriMapComponent;
  let fixture: ComponentFixture<EsriMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EsriMapComponent,
        ViewModalComponent,
        EditModalComponent,
        DonorManagementComponent
      ],
      imports: [
        SocketIoModule.forRoot(config),
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        HttpModule
      ],
      providers: [
        EsriLoaderService,
        DonorService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsriMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
