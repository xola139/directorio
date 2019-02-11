import { Component,ElementRef,ViewChild  } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {GoogleAnalyticsEventsService} from "./google-analytics-events.service";
import { LoaderService } from './loader.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';

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
  showLoader: boolean;
  public isCollapsed = true;
  
  protected localStorage: AsyncLocalStorage

  constructor(public router: Router, private loaderService: LoaderService,
   public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
  }

title = 'theapp';


  ngOnInit() {
  
    this.loaderService.display(true);
    //this.localStorage.getItem('usuario').subscribe((data) => {
    //this.usuario = localStorage.getItem('usuario');
    //});

    

    this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
    });
    this.loaderService.display(false);
//    $('#modalLoader').modal('hide');
  }

  toggleCollapsable(){
     if(navigator.userAgent.indexOf("Mobile") > 0){
        this.navbarButton.nativeElement.click();
      }
  }






  
}
