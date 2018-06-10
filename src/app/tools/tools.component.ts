import { Component, OnInit } from '@angular/core';
import { DisponibleService } from '../disponibles/disponible.service';
import { ModelService } from '../model/model.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { PromosService } from '../promos/promos.service';
import { LoaderService } from '../loader.service';



@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css','../promos/promos.component.css']
})
export class ToolsComponent implements OnInit {
  
  private dom: Document;

  disponibles:any;
  modelos:any;
  itemSelect:any;
  typeItemSelect:any;
  selectedImg = [];
  lstPromo= [];
  ratingHtml:any;
  urls:any;
  newModel = {id:"",telefono:"",status:false,diasAtencion:[]};
  urlPerfil:string;
  lstPromos:any;
  idnovip:string;
  lstNoVip:any ;
  dsDisponible :any;
  
  
  constructor(private loaderService: LoaderService, 
          @Inject(DOCUMENT) dom: Document,
          private disponibleService: DisponibleService, 
          private modelService:ModelService,
          public snackBar: MatSnackBar,
          private promosService: PromosService,) {

    this.dom = dom;



   }

  ngOnInit() {

    this.lstNoVip = {texto:"",created_at:""};
  	this.itemSelect = {id:''};
  	this.typeItemSelect = '';
	  this.getModelos();
  	this.getDisponiblesList();
    this.getPromosList();
  


  }

  applyFilterDisponible(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dsDisponible.filter = filterValue;
    this.disponibles  = this.dsDisponible.filteredData;
  }



  getDisponiblesList() {
    this.disponibleService.getAllDisponibles().then((res) => {
    	console.log(res);

       this.disponibles = res;
       const ELEMENT_DATES: ElementDisponible[] = this.disponibles;
       this.dsDisponible = new MatTableDataSource(ELEMENT_DATES); 
       this.loaderService.display(false);
    }, (err) => {
      console.log(err);
    });
  }


  getNoVip() {
    this.disponibleService.getNoVip(this.idnovip).then((res) => {
      console.log(res);
      
      this.lstNoVip = res;
      
      this.loaderService.display(false); 
    }, (err) => {
      console.log(err);
    });
  }




getDetails(data,tipo){
	this.selectedImg =[];
  data.images.reverse();
	this.itemSelect = data;
	this.typeItemSelect = tipo;

  console.log(this.itemSelect);
}


getDetailDisponible(data){
  
  this.loaderService.display(true); 
  
  
  this.itemSelect.images = [];

  this.itemSelect.id = data.id;
  this.disponibleService.getNoVip(data.id).then((res) => {
    
      resultado(res);
      this.loaderService.display(false); 
    }, (err) => {
      console.log(err);
    });

  var resultado = function (res){
      this.itemSelect.descripcion = res.text
      
      this.itemSelect.images = res.images;
    }

}

 getModelos() {
    this.modelService.showModelos("0-0").then((res) => {
      this.modelos = res;
      this.loaderService.display(false);
    }, (err) => {
      console.log(err);
    });
  }


  saveNewDisponible(){
    this.disponibleService.registerNewDisponible(this.newModel).then((result) => {
      this.getDisponiblesList();
      alert("guardado!!"+ this.newModel);
      this.newModel.id = "";

    }, (err) => {
      console.log(err);
    });
  }

 saveModel() {
    this.modelService.saveModel(this.newModel).then((result) => {
      let id = result['_id'];
      this.newModel.id = "";
      this.newModel.telefono = "";
      alert("guardado!!"+id);
    }, (err) => {
      console.log(err);
    });
  }

  registerModelVip(){
    this.modelService.registerNewModel(this.newModel).then((result) => {
      let id = result['id'];
      this.newModel.id = "";
      alert("Registrado!!"+id);
      console.log(result);
      this.urlPerfil ="#/perfil/"+id;
    }, (err) => {
      console.log(err);
    });
  }


fnPasteNewUser(){
  var hidden = document.createElement("textarea");
  document.body.appendChild(hidden);
  console.log(">>>>>>>>>>>>>>>>>");
  hidden.focus();
  document.execCommand('paste', null, '');
  console.log(hidden.value);
}
    
fnPaste(){

  var element = null; // Should be <textarea> or <input>

  element = this.dom.getElementById("txtid");
  element.select();
  this.dom.execCommand("paste");
}
    
selectBadge (e, id) {
  this.ratingHtml = "";
	
	this.urls = "";
	
	this.urls += this.itemSelect.images[id].expanded_url+"\n";
  
  
  this.ratingHtml = "Agenda cita con ..";
  this.ratingHtml += "@"+this.itemSelect.id +"\n"+	"📲"+this.itemSelect.telefono.trim()+"\n"; 
  this.ratingHtml += "Disponible en  \n";
  this.ratingHtml += "#escortenmx  \n"
  this.ratingHtml +=   this.urls  ;

	 
}

  selectPromos(e, id){
    
    id = "@"+id +"\n";
    if (e.target.checked) {
      console.log(id);
      this.lstPromo.push(id);
    } else {
        this.lstPromo.splice(this.lstPromo.indexOf(id), 1);
    }

    console.log(this.lstPromo);
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

  openTwitter(id) {
      window.open('twitter://user?screen_name='+id, '_system', 'location=no');

  }
  
  
   getPromosList() {
      this.promosService.getAllPromos().then((res) => {
      this.lstPromos = res;
    }, (err) => {
      console.log(err);
    });
  }
  

  openSnackBar() {
    this.snackBar.open("copiado", "Acción", {
      duration: 2000,
    });
  }


}


  export interface ElementNoVip {
  id: string;
  profile_image_url:string;
  ciudad: string;
  descripcion:string;
  disponibles:string[];
  
}


export interface ElementDisponible {
  id: string;
  telefono:string;
  
}