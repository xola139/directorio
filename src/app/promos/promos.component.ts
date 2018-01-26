import { Component, OnInit } from '@angular/core';
import  {Http} from '@angular/http';
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {

    myData:Array<any>;

  constructor(private http:Http){
  	this.http.get('https://jsonplaceholder.typicode.com/photos')
  	.map(response => response.json())
  	.subscribe(res => this.myData = res);
  }



  ngOnInit() {
  }

}


