import { Component, OnInit,ViewChild, ElementRef,Inject } from '@angular/core';
import { PerfilService } from '../perfil/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

@ViewChild('redirectButton') redirectButton:ElementRef;
createmsg:any;  
theurl:any;
nombre:string;
  constructor(  private perfilService: PerfilService,private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.createmsg = {};

    this.nombre = this.route.snapshot.params['id']
    this.getPerfil(this.nombre);



  //	console.log("intentando ando!!!");
/*  	 setTimeout(()=>{
      
      this.redirectButton.nativeElement.click();

     },2000);*/
  }


  getPerfil(id) {
      this.perfilService.showPerfil(id).then((res) => {

        console.log(res);
        this.createmsg = res;
        if(res!=null){  
          this.theurl = "https://api.whatsapp.com/send?phone=521"+this.createmsg.telefono+"&text=Hola%20vi%20mension%20en%20@escortenmx%20me%20das%20informaci%C3%B3n%20por%20favor";
          console.log(this.theurl);
          this.redirectButton.nativeElement.click();
        }
      
      }, (err) => {
        console.log(err);
      });
    }

}
