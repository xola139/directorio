import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { DisponibleService } from '../disponibles/disponible.service';
import { ModelService } from '../model/model.service';
import { MatSnackBar, MatTableDataSource,MatCheckboxChange } from '@angular/material';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { PromosService } from '../promos/promos.service';
import { LoaderService } from '../loader.service';
import { ToolService } from './tools.service';
import { ciudades } from '../util';



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
  dsModelos :any;
  autPost:Boolean;
  message:string;
  lstMsg:any;
  isRegistrer:boolean;
  numberImage:any;
  cudades = ciudades.ciudades;
  ciudad:any;

  
  @ViewChild('copyButton') copyButton:ElementRef;
  @ViewChild('btnClose') btnClose : ElementRef 
  
  constructor(private loaderService: LoaderService, 
          @Inject(DOCUMENT) dom: Document,
          private disponibleService: DisponibleService, 
          private modelService:ModelService,
          public snackBar: MatSnackBar,
          private promosService: PromosService,
          private toolService: ToolService) {

    this.dom = dom;
    this.isRegistrer = true;
}

  

  ngOnInit() {
    this.disponibles = [];
    this.lstNoVip = {texto:"",created_at:""};
  	this.itemSelect = {id:'',autPost:false,opcionesTelefono:null};
  	this.itemSelect.opcionesTelefono = {whatsappdirecto:false};
    this.typeItemSelect = '';
    this.getModelos();
    this.getMessages(); 
  	//this.getDisponiblesList();
  }



  applyFilterDisponible(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dsDisponible.filter = filterValue;
    this.disponibles  = this.dsDisponible.filteredData;
  }

  applyFilterModelo(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dsModelos.filter = filterValue;
    this.modelos  = this.dsModelos.filteredData;
    this.isRegistrer = this.modelos.length > 0 ? true:false;
  }


  getMessages() {
    this.toolService.getMessages().then((res) => {
      this.lstMsg = res;
    }, (err) => {
      console.log(err);
    });
  }


copyJump(val: number,pic){
  this.numberImage = val;  
  this.btnClose.nativeElement.click();

  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:application/octet-stream,' + encodeURIComponent(pic.media_url_https));
  pom.setAttribute('download', 'filename');
  pom.style.display = 'none';
  document.body.appendChild(pom);
  pom.click();
  document.body.removeChild(pom);  
  
}


copyDataModel(data){
  var _m = Math.floor((Math.random() * this.lstMsg.length) + 1)
  this.ratingHtml = "";
  this.ratingHtml =  this.lstMsg[_m].message +"\n";
  this.ratingHtml += "@"+ data.id +"\n";
  this.ratingHtml += data.telefono  +"\n"; 
  this.ratingHtml += "Disponible en  " +data.ciudad+ "\n" ; 
  this.ratingHtml += "WhatsApp aqui!   \n"; 
  this.ratingHtml += data.wbitly +" \n"
  this.ratingHtml += "Agenda!  \n"; 
       
  let selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = this.ratingHtml;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
  this.openSnackBar();

}


sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}



  /* To copy any Text */
copyText(){
  
  this.ratingHtml = "";
  this.urls = "";
  var _m = Math.floor((Math.random() * this.lstMsg.length) + 1)

  this.itemSelect.telefono = this.itemSelect.telefono ? this.itemSelect.telefono.trim():"";
  
  this.urls += this.numberImage != -1 ? this.itemSelect.images[this.numberImage].expanded_url+"\n":"";
  
  this.ratingHtml =  this.lstMsg[_m].message +"\n";
  this.ratingHtml += "@"+this.itemSelect.id +"\n";
  this.ratingHtml += this.itemSelect.telefono.trim() +"\n"; 
  this.ratingHtml += "Disponible en  \n"; 
  
  this.ratingHtml += "WhatsApp aqui!  \n"; 
  this.ratingHtml += this.itemSelect.wbitly +" \n"
  
  this.ratingHtml += this.numberImage != -1 ? this.urls:""  ;

  let selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = this.ratingHtml;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);

}



  updateCiudad(event:MatCheckboxChange){
    var dataAutPost = {_id:this.itemSelect._id};
    dataAutPost[event['currentTarget'].name] = event['currentTarget'].value;
    this.modelService.updateAutPost(dataAutPost).then((res) => {
       console.log(res);
    }, (err) => {
       console.log(err);
    });
  }

  autPostChange(event:MatCheckboxChange) {
    
    
    var dataAutPost = {_id:this.itemSelect._id};
    
    if(event.source.id == 'whatsappdirecto')
      dataAutPost['opcionesTelefono'].whatsappdirecto = event.checked;
    else 
      dataAutPost[event.source.id] = event.checked;
   

    this.modelService.updateAutPost(dataAutPost).then((res) => {
       console.log(res);
    }, (err) => {
       console.log(err);
    });
  }


  enableUserChange(event:MatCheckboxChange) {

    var _opcionesTelefono ={ }
    var dataEnableUser= {_id:this.itemSelect._id,status:event.checked,whatsappdirecto:event.checked };

     this.modelService.enableUser(dataEnableUser).then((res) => {
       console.log(res);
     }, (err) => {
       console.log(err);
     });
  }


  getDisponiblesList() {
    this.modelService.getAllModelos().then((res) => {
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
    this.toolService.getDataValidado(data.id).then((res) => {
    this.selectedImg =[];
    data.images = res["images"];
    data.telefono = res["telefono"];
    data.ciudad = res["ciudad"];
    data.status = res["status"];
    data.validado = res["validado"];
    data.disponible = res["disponible"];

	  this.itemSelect = data;
	  this.typeItemSelect = tipo;
    this.ciudad =  res["ciudad"];


  
  }, (err) => {
   console.log(err);
   
 });

}


getDetailDisponible(data){
  
  this.loaderService.display(true); 
  this.itemSelect.data
  //this.itemSelect.id = data.id;

//console.log(data);

//var _res;
  
  /*this.disponibleService.getNoVip(data.id).then((res) => {
    
      _res = res;

      this.itemSelect.descripcion = _res.text
      
      this.itemSelect.images = _res .images;

      this.loaderService.display(false); 
    }, (err) => {
      console.log(err);
    });*/

  

}

 getModelos() {
    this.modelService.getAllModelos().then((res) => {


       this.modelos = res;
       const ELEMENT_DATES: ElementDisponible[] = this.modelos;
       this.dsModelos = new MatTableDataSource(ELEMENT_DATES); 
       this.loaderService.display(false);
    }, (err) => {
      console.log(err);
    });
  }

  saveNewDisponible(){
    this.disponibleService.registerNewDisponible(this.newModel).then((result) => {
      this.getDisponiblesList();
      alert("guardado!!"+ this.newModel);
      

    }, (err) => {
      console.log(err);
    });
  }

   saveMessage(){

    var m = { message:this.message };
    
    this.toolService.saveMessage(m).then((result) => {
      alert("Mensaje  guardado!!");
      this.message = "";
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
	this.itemSelect.telefono = this.itemSelect.telefono ? this.itemSelect.telefono.trim():"";
	this.urls = "";
	
	this.urls += this.itemSelect.images[id].expanded_url+"\n";

  var _m = Math.floor((Math.random() * this.lstMsg.length) + 1)
  
  this.ratingHtml =this.lstMsg[_m].message +"\n";
  this.ratingHtml += "@"+this.itemSelect.id +"\n"+	"📲"+this.itemSelect.telefono.trim()+"\n"; 
  this.ratingHtml += "Disponible en  \n";
  this.ratingHtml += "#escortenmx  \n"
  this.ratingHtml += this.itemSelect.wbitly+" \n"
  this.ratingHtml +=   this.urls  ;

  this.copyElementText('elem'+id);

  this.openSnackBar();
     


  

//  var newWindow = window.open('https://mobile.twitter.com/'+this.itemSelect.id );
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
    
        element = this.dom.getElementById(id);
        element.select();
        this.dom.execCommand("copy");

    



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