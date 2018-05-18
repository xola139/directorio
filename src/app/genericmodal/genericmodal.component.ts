import {Component, Inject, Injectable,OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-genericmodal',
  templateUrl: './genericmodal.component.html',
  styleUrls: ['./genericmodal.component.css','../disponibles/disponibles.component.css']
})
export class GenericmodalComponent  {
  isMobile:Boolean;
  
  constructor(private dialogRef: MatDialogRef<GenericmodalComponent>, @Inject(MAT_DIALOG_DATA) public data : any) {


    if(navigator.userAgent.indexOf("Mobile") > 0){
         this.isMobile = true; 
      }else{
        this.isMobile= false;
    }

    

  }

  public closeDialog(){
    this.dialogRef.close();
  }

}
