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
      var items = [];
      for(var it in res){
        items.push({id:res[it].id,profile_image_url:res[it].profile_image_url,ciudad:res[it].disponibles[0].ciudad,descripcion:res[it].disponibles[0].descripcion}) ;
      }

      const ELEMENT_DATES: ElementDisponible[] = items;

      this.dsDisponible = new MatTableDataSource(ELEMENT_DATES);      
    }, (err) => {
      console.log(err);
    });
  }

   showModalPromo(item){
     console.log(item);
    this.msgDisponible = item.descripcion;
    this.msgTitle = item.id;
    this.msgUrl = item.profile_image_url;
    this.itemDisponible = item;

    
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

}


export interface ElementDisponible {
  id: string;
  profile_image_url:string;
  ciudad: string;
  descripcion:string;
  
}
