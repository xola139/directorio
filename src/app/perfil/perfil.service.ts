import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';

@Injectable()
export class PerfilService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  constructor(private http: Http) { }


   showPerfil(id) {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }


  updatePerfil(id, data) {
    return new Promise((resolve, reject) => {
    	console.log(data);
        this.http.put(this.baseApiUrl + '/images/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updatePerfilStatusImage(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
        this.http.put(this.baseApiUrl + '/images/update-status-image', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

 

}
