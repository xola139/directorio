import { Component, OnInit } from '@angular/core';
import  {Http} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { ModelService } from './model.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  myData :any;

  verItems :number;

  disponibles :any;
  promos :any;
  pictures:any;
  tipoFoto:any;
  hideme=[];
  


 folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];



constructor(  private modelService: ModelService) {
  this.disponibles = [];
  this.promos = [];
  this.verItems = 5;
  this.pictures = [];
  
 }
  
  ngOnInit() {
    this.getModelos();
    this.getPromos();
  }

  getModelos() {
    this.modelService.showModelos().then((res) => {
    
      var datos = res;
      
      for (let i = 0; i < Object.keys(datos).length; i++) {
        res[i].telefono= res[i].telefono != null ?res[i].telefono.replace(/\s/g, ""):"";
        res[i].satisfechos = [];
        res[i].fotos = [];

        for (let x = 0; x < res[i].images.length; x++) {
          if(res[i].images[x].status == 'foto')
            res[i].fotos.push( res[i].images[x]);
          else
            res[i].satisfechos.push( res[i].images[x]);
        }

        
        
      }

      this.myData  = res;
      console.log(this.myData);


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

  getPictures(data,tipoFoto){
    this.tipoFoto = tipoFoto;
    data.fotos.reverse();
    this.pictures = data;
  }

  toggleCard(id){
    $('.multi-collapse0').collapse('toggle');
    console.log(id);
  }

  getVerMas(){

    if(this.verItems < this.myData.length){
      this.verItems +=3;
    }

    
  }

  gotoCard(id){
      var top = $('#card_' + id).position().top;
      $(window).scrollTop( top );
  }

   shared(){
    window.open('twitter://user?screen_name=xola139', '_system', 'location=no');
  
   }
}
