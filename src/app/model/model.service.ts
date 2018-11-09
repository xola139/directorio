import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { PromosService } from '../promos/promos.service'
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';


@Injectable()
export class ModelService   {
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  
  getAllCiudades() {
   var ciudades = [
    {value: 'Aguascalientes', viewValue: 'Aguascalientes'},
    {value: 'Baja California', viewValue: 'Baja California'},
    {value: 'Baja California Sur', viewValue: 'Baja California Sur'},
    {value: 'Campeche', viewValue: 'Campeche'},
    {value: 'Chiapas', viewValue: 'Chiapas'},
    {value: 'Chihuahua', viewValue: 'Chihuahua'},
    {value: 'Coahuila de Zaragoza', viewValue: 'Coahuila de Zaragoza'},
    {value: 'Colima', viewValue: 'Colima'},
    {value: 'Cuernavaca', viewValue: 'Cuernavaca'},
    {value: 'CDMX', viewValue: 'CDMX'},
    {value: 'Estado de Mexico', viewValue: 'Estado de México'},
    {value: 'Durango', viewValue: 'Durango'},
    {value: 'Guanajuato', viewValue: 'Guanajuato'},
    {value: 'Guerrero', viewValue: 'Guerrero'},
    {value: 'Guadalajara', viewValue: 'Guadalajara'},
    {value: 'León', viewValue: 'León'},
    {value: 'Michoacan de Ocampo', viewValue: 'Michoacán de Ocampo'},
    {value: 'Monterrey', viewValue: 'Monterrey'},
    {value: 'Morelos', viewValue: 'Morelos'},
    {value: 'Nayarit', viewValue: 'Nayarit'},
    {value: 'Oaxaca', viewValue: 'Oaxaca'},
    {value: 'Puebla', viewValue: 'Puebla'},
    {value: 'Playa del Carmen', viewValue: 'Playa del Carmen'},
    {value: 'Pachuca', viewValue: 'Pachuca'},
    {value: 'Poza Rica', viewValue: 'Poza Rica'},
    {value: 'Queretaro', viewValue: 'Querétaro'},
    {value: 'Quintana Roo', viewValue: 'Quintana Roo'},
    {value: 'San Luis Potosí', viewValue: 'San Luís Potosí'},
    {value: 'Sinaloa', viewValue: 'Sinaloa'},
    {value: 'Sonora', viewValue: 'Sonora'},
    {value: 'Tabasco', viewValue: 'Tabasco'},
    {value: 'Toluca', viewValue: 'Toluca'},
    {value: 'Tamaulipas', viewValue: 'Tamaulipas'},
    {value: 'Tlaxcala', viewValue: 'Tlaxcala'},
    {value: 'Xalapa', viewValue: 'Xalapa'},
    {value: 'Veracruz', viewValue: 'Veracruz'},
    {value: 'Yucatán', viewValue: 'Yucatán'},
    {value: 'Zacatecas', viewValue: 'Zacatecas'}

  ];
 return ciudades;
}

  
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


  getCiudades() {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images/getCiudades')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  getPromociones() {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images/getPromos')
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  getModelo(id) {
    return new Promise((resolve, reject) => {
        this.http.get(this.baseApiUrl + '/images/'+ id)
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


