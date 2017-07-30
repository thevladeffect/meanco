/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DonorService } from '../app/services/donor.service';

import { HttpModule } from '@angular/http';

describe('DonorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DonorService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([DonorService], (service: DonorService) => {
    expect(service).toBeTruthy();
  }));
});
