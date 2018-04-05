import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from './perfil.service';






@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

	perfil = {};
  
  	
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


}
