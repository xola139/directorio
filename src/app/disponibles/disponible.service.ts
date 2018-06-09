import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http';
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';



@Injectable()
export class DisponibleService {

 private baseApiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: Http) { }


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
