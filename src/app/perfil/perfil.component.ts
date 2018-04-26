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
  	
	constructor(public dialog: MatDialog,private _location: Location,private route: ActivatedRoute, private router: Router, private perfilService: PerfilService) { }


  	ngOnInit() {
  		
  		this.getPerfil(this.route.snapshot.params['id']);
		
  	}

  	getPerfil(id) {

  		
    	this.perfilService.showPerfil(id).then((res) => {
      	this.perfil = res;
        console.log(this.perfil);

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

}