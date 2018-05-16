import { Component, OnInit,ViewChild, ElementRef,Inject } from '@angular/core';
import { DisponibleService } from './disponible.service';
import {MatTableDataSource,MatSnackBar,MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GenericmodalComponent } from '../genericmodal/genericmodal.component';
import { GlobalVariables } from '../global';
import * as $ from 'jquery';



@Component({
  selector: 'app-disponibles',
  templateUrl: './disponibles.component.html',
  styleUrls: ['./disponibles.component.css']
})
export class DisponiblesComponent implements OnInit {
  @ViewChild("myInput") inputEl: ElementRef;
	disponibles: any;
	displayedColumnsDisponible = ['profile_image_url','id','ciudad'];
	dsDisponible :any;
  msgDisponible:string;
  msgTitle:string;
  msgUrl:string;
  itemDisponible:any;
  animal: string;
  name: string;

  isMobile:Boolean;

  constructor(public dialog: MatDialog,private disponibleService: DisponibleService,public snackBar: MatSnackBar) {
    
  }


applyFilterDisponible(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dsDisponible.filter = filterValue;
    this.disponibles  = this.dsDisponible.filteredData;
  }


  ngOnInit() {
    this.isMobile = GlobalVariables.IS_MOBILE;
  	this.getDisponiblesList(); 

  }

  openDialog(item): void {
    console.log(item);
    var content = {msgTitle:"",msgDescripcion:"",msgUrl:"",msgFecha:"",msgTelefono:""};
    content.msgTitle = item.id;
    content.msgDescripcion = item.descripcion;
    content.msgUrl = item.profile_image_url;
    content.msgFecha = item.created_at;
    content.msgTelefono = item.telefono;


    this.dialog.open(GenericmodalComponent, {
      data: {item: content} ,width : '300px'
    });
  }




   getDisponiblesList() {
    this.disponibleService.getDisponibles().then((res) => {
      this.disponibles = res;

      
      const ELEMENT_DATES: ElementDisponible[] = this.disponibles;

      this.dsDisponible = new MatTableDataSource(ELEMENT_DATES);      
    }, (err) => {
      console.log(err);
    });
  }

   

  copyItem(item) {
    
    var input;
    
    if(item !=null){
      input = document.createElement('input');
      var messageCopy = item.id + " " + item.descripcion;
      input.setAttribute('value', messageCopy);
      document.body.appendChild(input);
      input.select();
      var result = document.execCommand('copy');
      document.body.removeChild(input);
      return result;
 
    }
    
    
    
  }

  openSnackBar() {
    this.snackBar.open("copiado", "Acción", {
      duration: 2000,
    });
  }


  cerrarModal(){
   this.inputEl.nativeElement.focus()
  }

}


export interface ElementDisponible {
  id: string;
  profile_image_url:string;
  ciudad: string;
  descripcion:string;
  disponibles:string[];
  
}


