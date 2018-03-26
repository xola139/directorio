import { Component, OnInit } from '@angular/core';
import  {Http} from '@angular/http';
import { Observable } from "rxjs/Observable";
import { ModelService } from '../model.service';



@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  myData:Array<any>;

  constructor(private http:Http){
    
    this.http.get('http://127.0.0.1:3000/images')
    .map(response => response.json())
    .subscribe(res => this.myData = res);
  }

  
  ngOnInit() {

  }

}
