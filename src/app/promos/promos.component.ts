import {Component,OnInit} from '@angular/core';
import {MatTableDataSource,MatSnackBar} from '@angular/material';
import { PromosService } from './promos.service';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})

export class PromosComponent  implements OnInit {

  promos: any;
  disponibles: any;

  constructor(private promosService: PromosService,public snackBar: MatSnackBar) {
  }


  displayedColumns = ['id','telefono','descripcion','idTwit'];
  displayedColumnsDisponoble = ['id','descripcion'];

  dataSource :any;
  dsDisponible :any;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  applyFilterDisponible(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dsDisponible.filter = filterValue;
  }

  ngOnInit() {
    this.getPromosList();
    this.getDisponiblesList(); 
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

  getDisponiblesList() {
    this.promosService.getDisponibles().then((res) => {
      this.disponibles = res;
      
      const ELEMENT_DATES: ElementDisponible[] = this.disponibles;

      this.dsDisponible = new MatTableDataSource(ELEMENT_DATES);      
    }, (err) => {
      console.log(err);
    });
  }

  copyItem(item) {
    let  theCopy =  item.images[0] ? 
                item.id +"  "+item.images[0].telefono +"  "+ item.descripcion:
                item.id +"  "+ item.descripcion;
    
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
  idTwit: string;
  telefono: string;
  descripcion: string;
  timemsString: string;
}

export interface ElementDisponible {
  id: string;
  descripcion: string;
  
}
