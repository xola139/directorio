import { Component, OnInit } from '@angular/core';
import { DisponibleService } from './disponible.service';
import {MatTableDataSource,MatSnackBar} from '@angular/material';
import * as $ from 'jquery';



@Component({
  selector: 'app-disponibles',
  templateUrl: './disponibles.component.html',
  styleUrls: ['./disponibles.component.css']
})
export class DisponiblesComponent implements OnInit {
	disponibles: any;
	displayedColumnsDisponible = ['profile_image_url','id','ciudad'];
	dsDisponible :any;
  msgDisponible:string;
  msgTitle:string;
  msgUrl:string;
  itemDisponible:any;
  constructor(private disponibleService: DisponibleService,public snackBar: MatSnackBar) {
    
  }


applyFilterDisponible(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dsDisponible.filter = filterValue;
  }


  ngOnInit() {
  	 this.getDisponiblesList(); 

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

   showModalPromo(item){
    this.msgDisponible = item.disponibles[item.disponibles.length -1].descripcion;
    this.msgTitle = item.id;
    console.log(item);
    this.msgUrl = item.profile_image_url;
    this.itemDisponible = item;

    
  }

  copyItem(item,event) {
    
    var input;
    
    if(item !=null){
      input = document.createElement('input');
      var messageCopy = item.id + " " + item.disponibles[item.disponibles.length-1].descripcion;
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

}


export interface ElementDisponible {
  id: string;
  profile_image_url:string;
  ciudad: string;
  
}
