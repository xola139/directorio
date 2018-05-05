import {Component,OnInit} from '@angular/core';
import {MatTableDataSource,MatSnackBar} from '@angular/material';
import { PromosService } from './promos.service';


@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})

export class PromosComponent  implements OnInit {

  
  constructor(private promosService: PromosService,public snackBar: MatSnackBar) {
  }

  promos: any;
  displayedColumns = ['avatar','id','telefono','descripcion','idTwit'];
  dataSource :any;
  msgPromo:string;
  msgTitle:string;
  itemPromo:any;



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
  }
 
  copyItem(item) {
    if(item ==null)
      return;

   /* let  theCopy =  item.fk_images[0] ? 
                item.id +"  "+item.fk_images[0].telefono +"  "+ item.promos[item.promos.length -1].descripcion:
                item.id +"  "+ item.promos[item.promos.length -1].descripcion;*/
     let  theCopy =  item.id; 
    return theCopy;
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

