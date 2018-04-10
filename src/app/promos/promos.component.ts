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
 text1: string;
 isCopied1: boolean;
 

constructor(private promosService: PromosService) {
  
 }


displayedColumns = ['id','descripcion','idTwit'];
  dataSource :any;

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
      const ELEMENT_DATES: Element[] = this.promos;

      this.dataSource = new MatTableDataSource(ELEMENT_DATES);      
    }, (err) => {
      console.log(err);
    });
  }

  copyItem(item) {
    console.log(item);
    
    return item.descripcion;
  }



}
export interface Element {
  id: string;
  idTwit: string;
  telefono: string;
  descripcion: string;
  timemsString: string;
}


