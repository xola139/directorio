import { Component, OnInit,ViewChild, ElementRef,Inject } from '@angular/core';
import { DisponibleService } from './disponible.service';
import {MatTableDataSource,MatSnackBar,MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as $ from 'jquery';



@Component({
  selector: 'app-disponibles',
  templateUrl: './disponibles.component.html',
  styleUrls: ['./disponibles.component.css']
})
export class DisponiblesComponent implements OnInit {
  @ViewChild("myInput") inputEl: ElementRef;
	disponibles: any;
	displayedColumnsDisponible = ['profile_image_url','id','ciudad'];
	dsDisponible :any;
  msgDisponible:string;
  msgTitle:string;
  msgUrl:string;
  itemDisponible:any;
  animal: string;
  name: string;


  constructor(public dialog: MatDialog,private disponibleService: DisponibleService,public snackBar: MatSnackBar) {
    
  }


applyFilterDisponible(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dsDisponible.filter = filterValue;
    this.disponibles  = this.dsDisponible.filteredData;
  }


  ngOnInit() {
  	 this.getDisponiblesList(); 

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
   getDisponiblesList() {
    this.disponibleService.getDisponibles().then((res) => {
      this.disponibles = res;
      var items = [];
      for(var it in res){
        items.push({id:res[it].id,profile_image_url:res[it].profile_image_url,ciudad:res[it].disponibles[0].ciudad,descripcion:res[it].disponibles[0].descripcion}) ;
      }

      const ELEMENT_DATES: ElementDisponible[] = items;

      this.dsDisponible = new MatTableDataSource(ELEMENT_DATES);      
    }, (err) => {
      console.log(err);
    });
  }

   showModalPromo(item){
     console.log(item);
     //this.msgDisponible = item.disponibles[item.disponibles.length -1].descripcion;
    this.msgDisponible = item.descripcion;
    this.msgTitle = item.id;
    this.msgUrl = item.profile_image_url;
    this.itemDisponible = item;

    
  }

  copyItem(item) {
    
    var input;
    
    if(item !=null){
      input = document.createElement('input');
      var messageCopy = item.id + " " + item.descripcion;
      input.setAttribute('value', messageCopy);
      document.body.appendChild(input);
      input.select();
      var result = document.execCommand('copy');
      document.body.removeChild(input);
      return result;
 
    }
    
    
    
  }

  openSnackBar() {
    this.snackBar.open("copiado", "Acción", {
      duration: 2000,
    });
  }


  cerrarModal(){
   this.inputEl.nativeElement.focus()
  }

}


export interface ElementDisponible {
  id: string;
  profile_image_url:string;
  ciudad: string;
  descripcion:string;
  
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
