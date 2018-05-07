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

	constructor(public dialog: MatDialog,private _location: Location,private route: ActivatedRoute, private router: Router, private perfilService: PerfilService) { 
		
      


	}

  
  	ngOnInit() {
			this.perfil = {};
      this.perfil.idiomas = [{espanol:false},{ingles:false}];
      this.perfil.opcionesTelefono = [{whatsapp:false},{llamadas:false}];
			for (let i = 0; i < 24; i++) {
        this.horarios.push({value: i, viewValue: i +':00'});
      }	
  		this.getPerfil(this.route.snapshot.params['id']);
		
  	}

  	getPerfil(id) {
			
	
			this.perfilService.showPerfil(id).then((res) => {
				this.perfil = res;
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