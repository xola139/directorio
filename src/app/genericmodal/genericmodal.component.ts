import {Component, Inject, Injectable,OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {GoogleAnalyticsEventsService} from "../google-analytics-events.service";

@Component({
  selector: 'app-genericmodal',
  templateUrl: './genericmodal.component.html',
  styleUrls: ['./genericmodal.component.css',
  '../disponibles/disponibles.component.css',
  '../app.component.css']
})
export class GenericmodalComponent  {
  isMobile:Boolean;
  
  constructor(private dialogRef: MatDialogRef<GenericmodalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data : any, public googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
    

    if(navigator.userAgent.indexOf("Mobile") > 0){
         this.isMobile = true; 
      }else{
        this.isMobile= false;
    }
  }

  public closeDialog(){
    this.dialogRef.close();
  }

  eventAnalytics(from,type){
    if(from == 'disponible')
      this.googleAnalyticsEventsService.emitEvent("disponibleCategory", "click", type, 1);  
    else if(from == 'disponible')
      this.googleAnalyticsEventsService.emitEvent("promosCategory", "click", type, 1);  

    
  }


  public formatoFecha (texto){
  function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }
  var today = new Date(texto);
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var formateando =  dd+"/"+mm+"/"+yyyy;
  return formateando;
  }
  

}
