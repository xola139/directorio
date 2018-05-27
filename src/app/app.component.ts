import { Component  } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import {Router, NavigationEnd} from "@angular/router";
import {GoogleAnalyticsEventsService} from "./google-analytics-events.service";
import * as $ from 'jquery';
declare let $ : any;
declare var ga: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario: string;
  otheruser: any;
  public isCollapsed = true;
  

 constructor(protected localStorage: AsyncLocalStorage,public router: Router,
   public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {

}

title = 'theapp';


  ngOnInit() {
    this.localStorage.getItem('usuario').subscribe((data) => {
    this.usuario = localStorage.getItem('usuario');
    });
  }

  toggleCollapsable(){
    console.log("llegandooooo"+$('.collapse'));
    $('#navbarNavAltMarkup').collapse();
  }
  
}
