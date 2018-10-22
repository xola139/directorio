import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { ModelService } from './model.service';
import * as $ from 'jquery';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css','../app.component.css']
})
export class ModelComponent implements OnInit {
  myData :any;
  verItems :number;
  disponibles :any;
  promos :any;
  pictures:any;
  tipoFoto:any;
  hideme=[];
  isMobile :Boolean;
  items:any; 
  chooseCiudad:any;
  ciudades=[];


constructor( private loaderService: LoaderService, 
             private modelService: ModelService,
             private router: Router,
             private route: ActivatedRoute ) {
  this.disponibles = [];
  this.promos = [];
  this.verItems = 9;
  this.pictures = [];
  
 }
  
  ngOnInit() {

    //http call starts
    this.loaderService.display(true);

    if(navigator.userAgent.indexOf("Mobile") > 0){
         this.isMobile = true; 
      }else{
        this.isMobile= false;
    }
    
    this.getModelos();
    this.getPromos();

  }

mostratLoader(){
  this.loaderService.display(true);
  //$('#modalLoader').modal('show');
}

  verPorCiudad(){
    var _item = [];
    for(var x=0;x< this.items.length;x++){
      if(this.chooseCiudad =='TODOS' || this.items[x].ciudad == this.chooseCiudad ){
        _item.push(this.items[x]); 
      }
    }
    this.myData = _item;
  }
  
  getModelos() {
    var _id = this.route.snapshot.params['id'];
    this.modelService.showModelos(_id).then((res) => {
    this.myData = this.items = res ; 
    this.loaderService.display(false);
    }, (err) => {
      console.log(err);
    });
  }

  getPromos(){
    this.modelService.getPromos().then((res) => {
     this.promos  = res;
   }, (err) => {
     console.log(err);
   });
 }


  getPictures(data,tipoFoto,idImg){
    this.pictures = data.images;
    this.pictures.id = data.id;

    setTimeout(() => {
      var top = $('#'+idImg).position().top;
      $('#exampleModalLong').animate({scrollTop:(top - 50)}, 'slow');
      },1000);

  }



  getVerMas(){

    if(this.verItems < this.myData.length){
      //this.verItems +=3;
      for(var x=0;x< 3;x++){
        this.verItems++;
        this.modelService.getModelo(this.myData[this.verItems].id).then((res) => {
          this.myData[this.verItems] = res
        }, (err) => {
          console.log(err);
        });

      }

      


    }
  }

  gotoCard(id){
      var top = $('#card_' + id).position().top;
      $('html, body').animate({scrollTop:(top - 60)}, 'slow');
      
      
      
  }

   shared(){
    window.open('twitter://user?screen_name=xola139', '_system', 'location=no');
  
   }



}
