import { Component, OnInit } from '@angular/core';
import { DisponibleService } from '../disponibles/disponible.service';
import { ModelService } from '../model/model.service';
import { MatSnackBar} from '@angular/material';
import {Inject} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css','../promos/promos.component.css']
})
export class ToolsComponent implements OnInit {
  disponibles:any;
  modelos:any;
  itemSelect:any;
  typeItemSelect:any;
  selectedImg = [];

   ratingHtml:any;
   urls:any;
   private dom: Document;
  constructor(@Inject(DOCUMENT) dom: Document,private disponibleService: DisponibleService, private modelService:ModelService,public snackBar: MatSnackBar) {

    this.dom = dom;

   }

  ngOnInit() {
  	this.itemSelect = {id:''};
  	this.typeItemSelect = '';
	this.getModelos();
  	this.getDisponiblesList();
  }


getDisponiblesList() {
    this.disponibleService.getDisponibles().then((res) => {
    	console.log(res);
      this.disponibles = res;
       
    }, (err) => {
      console.log(err);
    });
  }


getDetails(data,tipo){
	this.selectedImg =[];
	this.itemSelect = data;
	this.typeItemSelect = tipo;
}


 getModelos() {
    this.modelService.showModelos().then((res) => {
      this.modelos = res;
    }, (err) => {
      console.log(err);
    });
  }

    
selectBadge (e, id) {
  this.ratingHtml = "";
	if (e.target.checked) {
		this.selectedImg.push(id);
	} else {
	  	this.selectedImg.splice(this.selectedImg.indexOf(id), 1);
	}
	
	this.urls = "";
	for(var i=0;i<this.selectedImg.length;i++){
		this.urls += this.itemSelect.images[this.selectedImg[i]].url+"\n";
  }
  
  this.ratingHtml = 	this.itemSelect.id +"\n"+	this.itemSelect.telefono.trim() +"\n"+  this.urls  ;
	 
}



  copyElementText(id) {
   // this.ratingHtml = this.urls  ;
    var element = null; // Should be <textarea> or <input>
    try {
        element = this.dom.getElementById(id);
        element.select();
        this.dom.execCommand("copy");
    }
    finally {
       this.dom.getSelection().removeAllRanges;
    }
}
  

  openSnackBar() {
    this.snackBar.open("copiado", "Acción", {
      duration: 2000,
    });
  }


}


  
