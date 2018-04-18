import { Component, OnInit } from '@angular/core';
import {MatTableDataSource,MatRadioChange} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from './perfil.service';






@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

	perfil:any;
  
  	
	constructor(private route: ActivatedRoute, private router: Router, private perfilService: PerfilService) { }


  	ngOnInit() {
  		
  		this.getPerfil(this.route.snapshot.params['id']);
		
  	}

  	getPerfil(id) {

  		console.log(">>>>>>>>>>>>>>>>>>>>>><"+id);
    	this.perfilService.showPerfil(id).then((res) => {
      	this.perfil = res;
        console.log(this.perfil);

    	}, (err) => {
      	console.log(err);
    	});
  	}

  	updatePerfil(id) {

	    this.perfilService.updatePerfil(id, this.perfil).then((result) => {
      	let id = result['_id'];
      	console.log("Excelente");
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


}
