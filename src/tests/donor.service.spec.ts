/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DonorService } from '../app/services/donor.service';

import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

const mockResponse = {
  data: [
    {
      "_id": "597dc7f221b73b7afdf544dc",
      "createdAt": "2017-07-30T11:50:10.627Z",
      "updatedAt": ("2017-07-30T11:50:10.627Z"),
      "firstName": "Vlad",
      "lastName": "Vidac",
      "email": "alecutheman@gmail.com",
      "contactNumber": "+40770258973",
      "bloodType": "A-",
      "ipAddress": "::1",
      "location": {
        "latitude": 45.755,
        "longitude": 21.195
      },
      "__v": 0
    },

    {
      "_id": ("597dcc1002bab87f411cb12d"),
      "createdAt": ("2017-07-30T12:07:44.372Z"),
      "updatedAt": ("2017-07-30T12:07:44.372Z"),
      "firstName": "Vlad",
      "lastName": "Vidac",
      "email": "alecutheman3@gmail.com",
      "contactNumber": "+40770258973",
      "bloodType": "A-",
      "ipAddress": "::1",
      "location": {
        "latitude": 45.754,
        "longitude": 21.194
      },
      "__v": 0
    },

    /* 3 */
    {
      "_id": ("597dcc5302bab87f411cb12e"),
      "createdAt": ("2017-07-30T12:08:51.073Z"),
      "updatedAt": ("2017-07-30T12:08:51.073Z"),
      "firstName": "Vlad",
      "lastName": "Vidac",
      "email": "alecutheman111@gmail.com",
      "contactNumber": "+40770258973",
      "bloodType": "A-",
      "ipAddress": "::1",
      "location": {
        "latitude": 45.755,
        "longitude": 21.193
      },
      "__v": 0
    },

    /* 4 */
    {
      "_id": ("597dce1602bab87f411cb131"),
      "createdAt": ("2017-07-30T12:16:22.042Z"),
      "updatedAt": ("2017-07-30T12:16:22.042Z"),
      "firstName": "Vlad",
      "lastName": "Vidac",
      "email": "alecuthesadadman@gmail.com",
      "contactNumber": "+40770258973",
      "bloodType": "A-",
      "ipAddress": "::1",
      "location": {
        "latitude": 45.756,
        "longitude": 21.194
      },
      "__v": 0
    },

    /* 5 */
    {
      "_id": ("597dda55391b7f81c962ed76"),
      "createdAt": ("2017-07-30T13:08:37.790Z"),
      "updatedAt": ("2017-07-30T13:08:37.790Z"),
      "firstName": "Vlad",
      "lastName": "Vidac",
      "email": "alecuthemanaaaaa@gmail.com",
      "contactNumber": "+40770258973",
      "bloodType": "A-",
      "ipAddress": "::1",
      "location": {
        "latitude": 45.756,
        "longitude": 21.196
      },
      "__v": 0
    },

    /* 6 */
    {
      "_id": ("597ddb5d391b7f81c962ed79"),
      "createdAt": ("2017-07-30T13:13:01.514Z"),
      "updatedAt": ("2017-07-30T13:13:01.514Z"),
      "firstName": "Vladss",
      "lastName": "Vidac",
      "email": "alecuthemanaaaaaaa@gmail.com",
      "contactNumber": "+40770258973",
      "bloodType": "A-",
      "ipAddress": "::1",
      "location": {
        "longitude": 21.198,
        "latitude": 45.754
      },
      "__v": 0
    }
  ]
};

describe('DonorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DonorService,
        { provide: XHRBackend, useClass: MockBackend },
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should create', inject([DonorService], (service: DonorService) => {
    expect(service).toBeTruthy();
  }));

  it('should get donors', inject([DonorService, XHRBackend], (donorService, mockBackend) => {

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });

    donorService.getDonors().subscribe((don) => {
      let donors = don._body.data;
      expect(donors.length).toBe(6);
      expect(donors[0]._id).toEqual('597dc7f221b73b7afdf544dc');
    });
  }));
});
