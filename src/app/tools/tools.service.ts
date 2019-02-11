import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalVariable } from '../global';

@Injectable()
export class ToolService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  constructor(private http: Http) { }

  saveMessage(data) {
      return new Promise((resolve, reject) => {
          this.http.put(this.baseApiUrl +'/messages/register', data)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });
  }

  getMessages() {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/messages/getMessages')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  getValidados() {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images/getValidados')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  getDataValidado(id) {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images/getDataValidado/'+id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }


}
