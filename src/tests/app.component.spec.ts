/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';

import { HeaderComponent } from '../app/header/header.component'
import { RouterModule, Routes } from '@angular/router';
import { EsriMapComponent } from '../app/esri-map/esri-map.component';
import { DonorManagementComponent } from '../app/donor-management/donor-management.component';
import { ViewModalComponent } from '../app/view-modal/view-modal.component';
import { EditModalComponent } from '../app/edit-modal/edit-modal.component';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

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

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        EsriMapComponent,
        ViewModalComponent,
        EditModalComponent,
        DonorManagementComponent,
      ],
      imports: [
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true }
        ),
        AlertModule.forRoot(),
        FormsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Blood donor map');
  }));

  it('should have a HeaderComponent', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  }));

  it('should have a Router outlet', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));
});
