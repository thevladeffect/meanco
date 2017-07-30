/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EsriMapComponent } from '../app/esri-map/esri-map.component';
import { DonorManagementComponent } from '../app/donor-management/donor-management.component';
import { ViewModalComponent } from '../app/view-modal/view-modal.component';
import { EditModalComponent } from '../app/edit-modal/edit-modal.component';

import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ng2-socket-io';

import { environment } from 'environments/environment';

import { DonorService } from '../app/services/donor.service';

const config: SocketIoConfig = { url: environment.baseUrl, options: {} };

const appRoutes: Routes = [
  {
    path: '',
    component: EsriMapComponent
  },
  {
    path: 'donor/:id',
    component: DonorManagementComponent
  },
  {
    path: 'modal',
    component: ViewModalComponent
  }
];

describe('DonorManagementComponent', () => {
  let component: DonorManagementComponent;
  let fixture: ComponentFixture<DonorManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DonorManagementComponent,
        EsriMapComponent,
        ViewModalComponent,
        EditModalComponent
      ],
      imports: [
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true }
        ),
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        HttpModule,
        SocketIoModule.forRoot(config)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        DonorService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
