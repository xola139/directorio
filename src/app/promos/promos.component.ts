import {Component,OnInit,ViewChild, ElementRef} from '@angular/core';
import {MatTableDataSource,MatSnackBar,MatDialog} from '@angular/material';
import { PromosService } from './promos.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GenericmodalComponent } from '../genericmodal/genericmodal.component';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css'],
 })

export class PromosComponent  implements OnInit {

  @ViewChild('mensajeButton') mensajeButton:ElementRef;

  constructor(public dialog: MatDialog,
              private promosService: PromosService,
              public snackBar: MatSnackBar,
              private loaderService: LoaderService,) {

  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  promos: any;
  displayedColumns = ['avatar','id','telefono'];
  dataSource :any;
  msgPromo:string;
  msgTitle:string;
  itemPromo:any;
  itemDisponible:any;
  msgUrl:string;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.promos  = this.dataSource.filteredData;
  }


  
  ngOnInit() {

    //http call starts
    this.loaderService.display(true);
    this.getPromosList();
    
    
     setTimeout(()=>{
      this.mensajeButton.nativeElement.click();
     },10000);
  }

  getPromosList() {
    this.promosService.getAllPromos().then((res) => {
      this.promos = res;
      console.log(this.promos);
      const ELEMENT_DATES: Element[] = this.promos;

      this.dataSource = new MatTableDataSource(ELEMENT_DATES);      
      this.loaderService.display(false);
    }, (err) => {
      console.log(err);
    });
  }



  openDialog(item): void {
    var content = {msgItem:null,msgTitle:"",msgDescripcion:"",msgUrl:""};
    content.msgTitle = item.id;
    content.msgDescripcion = item.promos[item.promos.length -1].descripcion;
    content.msgUrl = item.avatar;

    item.opcionesTelefono = {whatsapp: false,llamadas: true,twitter: true};
    

    content.msgItem = item;
    this.dialog.open(GenericmodalComponent, {
      data: {item: content} ,width : '300px'
    });
  }



  showModalPromo(item){
    this.msgPromo = item.promos[item.promos.length -1].descripcion;
    this.msgTitle = item.id;
    this.itemPromo = item;
    this.itemDisponible = item;
    this.msgUrl = item.avatar;
  }
 
  copyItem(item) {
    
    var input;
    
    if(item !=null){
      input = document.createElement('input');
      var messageCopy = item.fk_images[0] ? 
                item.id +"  "+item.fk_images[0].telefono +"  "+ item.promos[item.promos.length -1].descripcion:
                item.id +"  "+ item.promos[item.promos.length -1].descripcion;
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


}
export interface Element {
  id: string;
  avatar: string;
  idTwit: string;
  telefono: string;
  descripcion: string;
  timemsString: string;
}

