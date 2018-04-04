import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PerfilService {

  constructor(private http: Http) { }


   showPerfil(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/images/' + id)
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
        this.http.put('/images/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }


 

}
