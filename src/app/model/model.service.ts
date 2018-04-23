import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { PromosService } from '../promos/promos.service'
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';


@Injectable()
export class ModelService   {
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  
  
  constructor(private http: Http,private promosService: PromosService) { }

   showModelos() {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images/')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  getDisponibles(){
    return this.promosService.getDisponibles();
  }
}


