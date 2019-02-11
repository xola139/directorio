
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { ModelService } from './model.service';
import * as $ from 'jquery';
import { LoaderService } from '../loader.service';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css','../app.component.css']
})
export class ModelComponent implements OnInit {

     url: SafeResourceUrl;

   @ViewChild('containerperfil', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef; 


    myData: any;
    verItems: number;
    disponibles: any;
    promos: any;
    pictures: any;
    tipoFoto: any;
    hideme = [];
    isMobile: Boolean;
    items: any;
    chooseCiudad: any;
    ciudades = [];
    lstCiudades: any;
    Allciudades: any;
    viewAdmin: Boolean;
    viewMore:Boolean;

    constructor(private loaderService: LoaderService,
        private modelService: ModelService,
        private router: Router,
        private route: ActivatedRoute,

        private componentFactoryResolver: ComponentFactoryResolver) {

        this.disponibles = [];
        this.promos = [];
        this.verItems = 9;
        this.pictures = [];

    }

    ngOnInit() {
        

        console.log("Entra para iniiciar...11111   "+localStorage.getItem("dataUSer"));

        if(localStorage.getItem("dataUSer")) {
            var _dataUser = JSON.parse(localStorage.dataUSer);
            this.verItems = _dataUser.verItems;
            
        }else{
            console.log("Entra para iniiciar...")
            localStorage.dataUSer = JSON.stringify({verItems:9});
            
        }

        //http call starts
        this.loaderService.display(true);

        if (navigator.userAgent.indexOf("Mobile") > 0) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }

        this.getModelos();
        this.Allciudades = this.modelService.getAllCiudades();
        this.viewAdmin =  this.route.snapshot.queryParams.aut ? true:false
        this.viewMore = true;

        
        

    }

    mostratLoader() {
        this.loaderService.display(true);
        //$('#modalLoader').modal('show');
    }


    mostrarProfile(id) {
       
    this.viewContainerRef.remove();
    const factory = this.componentFactoryResolver.resolveComponentFactory(PerfilComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.instance.verPerfil = id;
    ref.changeDetectorRef.detectChanges();
  

    }

    


    verPorCiudad() {
        var _item = [];
        for (var x = 0; x < this.items.length; x++) {
            if (this.chooseCiudad == 'TODOS' || this.items[x].ciudad == this.chooseCiudad) {
                _item.push(this.items[x]);
            }
        }
        this.myData = _item;
    }

    getModelos() {
        var _id = this.route.snapshot.params['id'];
        this.modelService.showModelos(_id).then((res) => {
            this.myData = this.items = res;
            this.getLstCiudades();
            this.loaderService.display(false);

        }, (err) => {
            console.log(err);
        });
    }

    getLstCiudades() {
        this.modelService.getCiudades().then((res) => {
            this.lstCiudades = res;
        }, (err) => {
            console.log(err);
        });
    }



    verPromos() {
        var _item = [];
        for (var x = 0; x < this.items.length; x++) {
            console.log("tipo " + this.items[x].tipo);
            if (this.items[x].tipo == 'promo') {
                _item.push(this.items[x]);
            }
        }
        this.myData = _item;
    }



    getPictures(data, tipoFoto, idImg) {
        this.pictures = data.images;
        this.pictures.id = data.id;

        setTimeout(() => {
            var top = $('#' + idImg).position().top;
            $('#exampleModalLong').animate({
                scrollTop: (top - 50)
            }, 'slow');
        }, 1000);

    }

    getVerMas() {
        if (this.verItems < this.myData.length) {
            this.verItems +=3;

            var _dataUser = JSON.parse(localStorage.dataUSer);
            _dataUser.verItems = this.verItems;
            
            localStorage.setItem("dataUSer", JSON.stringify(_dataUser));
            
        }else{
            this.viewMore = false;
        }
    }

    gotoCard(id) {
        var top = $('#card_' + id).position().top;
        $('html, body').animate({
            scrollTop: (top - 60)
        }, 'slow');
    }

    shared() {
        window.open('twitter://user?screen_name=xola139', '_system', 'location=no');

    }



}