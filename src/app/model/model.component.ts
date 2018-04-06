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
