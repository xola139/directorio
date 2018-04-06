import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ModelService {

  constructor(private http: Http) { }

   showModelos() {
    return new Promise((resolve, reject) => {
        this.http.get('/images/')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }
}


