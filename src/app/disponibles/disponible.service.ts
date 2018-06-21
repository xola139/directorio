import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http';
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';



@Injectable()
export class DisponibleService {

 private baseApiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: Http) { }

  registerNewDisponible(data) {
    return new Promise((resolve, reject) => {
        this.http.put(this.baseApiUrl +'/disponible/agregarDisponibles', data)
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

 getAllDisponibles() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseApiUrl + '/disponible/all')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

 getNoVip(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseApiUrl + '/disponible/noVip/'+id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }




}
