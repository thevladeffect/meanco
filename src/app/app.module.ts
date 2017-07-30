import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { EsriLoaderService } from 'angular2-esri-loader';
import { HeaderComponent } from './header/header.component';

import { ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap';

import { DonorService } from './donor.service';
import { DonorManagementComponent } from './donor-management/donor-management.component';
import { ViewModalComponent } from './view-modal/view-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

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

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    HeaderComponent,
    DonorManagementComponent,
    ViewModalComponent,
    EditModalComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    EsriLoaderService,
    DonorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
