import { Component, OnInit } from '@angular/core';
import {MatDialog,MatTableDataSource,MatRadioChange} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from './perfil.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

	perfil:any;
  resourcesLoaded: Boolean;
		
  idiomas = [
    {value: 'espanol', viewValue: 'Español'},
    {value: 'ingles', viewValue: 'Ingles'}

	];
	
	horarios = [ ];

  cudades = [
    {value: 'Aguascalientes', viewValue: 'Aguascalientes'},
    {value: 'Baja-California', viewValue: 'Baja California'},
    {value: 'Baja-California-Sur', viewValue: 'Baja California Sur'},
    {value: 'Campeche', viewValue: 'Campeche'},
    {value: 'Chiapas', viewValue: 'Chiapas'},
    {value: 'Chihuahua', viewValue: 'Chihuahua'},
    {value: 'Coahuila-de-Zaragoza', viewValue: 'Coahuila de Zaragoza'},
    {value: 'Colima', viewValue: 'Colima'},
    {value: 'CDMX', viewValue: 'CDMX'},
    {value: 'Estado-de-Mexico', viewValue: 'Estado de México'},
    {value: 'Durango', viewValue: 'Durango'},
    {value: 'Guanajuato', viewValue: 'Guanajuato'},
    {value: 'Guerrero', viewValue: 'Guerrero'},
    {value: 'Jalisco', viewValue: 'Jalisco'},
    {value: 'Michoacan-de-Ocampo', viewValue: 'Michoacán de Ocampo'},
    {value: 'Morelos', viewValue: 'Morelos'},
    {value: 'Nayarit', viewValue: 'Nayarit'},
    {value: 'Nuevo-Leon', viewValue: 'Nuevo León'},
    {value: 'Oaxaca', viewValue: 'Oaxaca'},
    {value: 'Puebla', viewValue: 'Puebla'},
    {value: 'Queretaro', viewValue: 'Querétaro'},
    {value: 'Quintana Roo', viewValue: 'Quintana Roo'},
    {value: 'San-Luis-Potosí', viewValue: 'San Luís Potosí'},
    {value: 'Sinaloa', viewValue: 'Sinaloa'},
    {value: 'Sonora', viewValue: 'Sonora'},
    {value: 'Tabasco', viewValue: 'Tabasco'},
    {value: 'Tamaulipas', viewValue: 'Tamaulipas'},
    {value: 'Tlaxcala', viewValue: 'Tlaxcala'},
    {value: 'Veracruz', viewValue: 'Veracruz'},
    {value: 'Yucatán', viewValue: 'Yucatán'},
    {value: 'Zacatecas', viewValue: 'Zacatecas'}

  ];


	constructor(public dialog: MatDialog,private _location: Location,private route: ActivatedRoute, private router: Router, private perfilService: PerfilService) { 
		

	}

  
  	ngOnInit() {
			this.perfil = {};
      this.perfil.idiomas = [{espanol:false,ingles:false}];
      this.perfil.opcionesTelefono = [{whatsapp:false,llamadas:false}];

      this.perfil.cuerpo = [{estatura:'',ojos:'',cabello:'',medidas:'',peso: ''}];
      
      this.perfil.horarioAtencion=[{hinicio:'',hfin:''}];
			
      for (let i = 0; i < 24; i++) {
        this.horarios.push({value: i, viewValue: i +':00'});
      }	
  		this.getPerfil(this.route.snapshot.params['id']);
		
  	}

  	getPerfil(id) {
			
	
			this.perfilService.showPerfil(id).then((res) => {
        

				this.perfil = res;

        
        if(this.perfil.cuerpo.length == 0){
          this.perfil.cuerpo = [{estatura:'',ojos:'',cabello:'',medidas:'',peso: ''}];
        }


        this.perfil.images.reverse();

    	}, (err) => {
      	console.log(err);
    	});
  	}

  	updatePerfil(id) {
      this.resourcesLoaded = true;
	    this.perfilService.updatePerfil(id, this.perfil).then((result) => {
        console.log(this.perfil);
      	let id = result['_id'];
      	this.resourcesLoaded = false;
    	}, (err) => {
      	console.log(err);
    });
  }

  radioChange(event: MatRadioChange,indice) {
    console.log(event);
    console.log(event.value);
    console.log(event.source);
    console.log(indice+"  $$$#$#$#$#")
    this.perfil.images[indice].status =event.value;
    //this.filter[l'property'] = this.selected;
    //console.log(this.filter);
  }

	backClicked(){
		this._location.back();
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
}

  
}