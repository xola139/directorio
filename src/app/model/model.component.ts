import { Component, OnInit } from '@angular/core';
import  {Http} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { ModelService } from './model.service';



@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  myData = {};

  foods = [
    {value: 'steak-0', viewValue: 'Todos'},
    {value: 'pizza-1', viewValue: 'Disponible'},
    {value: 'tacos-2', viewValue: 'Indispoble'}
  ];

constructor(  private modelService: ModelService) { }


  
  ngOnInit() {
    this.getModelos();
  }

    getModelos() {

      
      this.modelService.showModelos().then((res) => {
        this.myData  = res;
      }, (err) => {
        console.log(err);
      });
    }
}
