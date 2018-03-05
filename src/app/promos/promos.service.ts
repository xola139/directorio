import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PromosService {

    constructor(private http: Http) { }
    getAllPromos() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/promos')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
