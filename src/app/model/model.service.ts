import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { PromosService } from '../promos/promos.service'
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';


@Injectable()
export class ModelService   {
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  
  
  constructor(private http: Http,private promosService: PromosService) { }


  deletePostTwitter(id) {
    return new Promise((resolve, reject) => {
        this.http.delete(this.baseApiUrl + '/images/deletePostTwitter/'+ id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }


   showModelos(id) {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images/by/'+ id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllModelos() {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }





   showMostrarEnDispoibles() {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images/getMostrarEnDispoibles/')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }



  getPromos(){
    return this.promosService.getAllPromos();
  }

  saveModel(data) {
    return new Promise((resolve, reject) => {
        this.http.put(this.baseApiUrl +'/images/guardar', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  registerNewModel(data) {
    return new Promise((resolve, reject) => {
        this.http.put(this.baseApiUrl +'/images/registrar', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }


  updateAutPost(data) {
    return new Promise((resolve, reject) => {
        this.http.put(this.baseApiUrl +'/images/autPost', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  enableUser(data) {
    return new Promise((resolve, reject) => {
        this.http.put(this.baseApiUrl +'/images/enableUser', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }


}


