import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';

@Injectable()
export class PromosService {

  private baseApiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: Http) { }


  getAllPromos() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseApiUrl + '/promos')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  getDisponibles() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseApiUrl + '/disponible')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

}
