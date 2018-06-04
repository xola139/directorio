import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	console.log("intentando ando!!!");
  	 setTimeout(()=>{
      window.location.href = 'https://api.whatsapp.com/send?phone=5215510496449';
     },2000);
  }

}
