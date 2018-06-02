import { Component,ElementRef,ViewChild  } from '@angular/core';
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
  @ViewChild('navbarButton') navbarButton:ElementRef;
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
     if(navigator.userAgent.indexOf("Mobile") > 0){
        this.navbarButton.nativeElement.click();
      }
  }
  
}
