import {Component,OnInit} from '@angular/core';
import {MatTableDataSource,MatSnackBar} from '@angular/material';
import { PromosService } from './promos.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class PromosComponent  implements OnInit {
constructor(private promosService: PromosService,public snackBar: MatSnackBar) {
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
    this.getPromosList();
    
    
    
  }

  getPromosList() {
    this.promosService.getAllPromos().then((res) => {
      this.promos = res;
      console.log(this.promos);
      const ELEMENT_DATES: Element[] = this.promos;

      this.dataSource = new MatTableDataSource(ELEMENT_DATES);      
    }, (err) => {
      console.log(err);
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



  /*copyItem(item) {
    if(item ==null)
      return;

   /* let  theCopy =  item.fk_images[0] ? 
                item.id +"  "+item.fk_images[0].telefono +"  "+ item.promos[item.promos.length -1].descripcion:
                item.id +"  "+ item.promos[item.promos.length -1].descripcion;*/
     //let  theCopy =  item.id; 
    //return theCopy;
  //}

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

