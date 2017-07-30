import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class DonorService {

  constructor(
    private http: Http
  ) { }

  public getDonors(): Observable<any> {
    return this.http
      .get(API_URL + '/donors')
      .catch(this.handleError);
  }

  public getDonorById(id): Observable<any> {
    return this.http
      .get(API_URL + '/donors/' + id)
      .catch(this.handleError);
  }

  public updateDonor(donor): Observable<any> {
    return this.http
      .put(API_URL + '/donors/' + donor._id, donor)
      .catch(this.handleError);
  }

  public createDonor(donor): Observable<any> {
    return this.http
      .post(API_URL + '/donors', donor)
      .catch(this.handleError);
  }

  public deleteDonor(id): Observable<any> {
    return this.http
      .delete(API_URL + '/donors/' + id)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
