import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { EsriLoaderService } from 'angular2-esri-loader';
import { HeaderComponent } from './header/header.component';

import { DonorService } from './donor.service';

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    EsriLoaderService,
    DonorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
