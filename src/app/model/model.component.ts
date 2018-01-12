import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
	people: any[] = [
    {
      "id":1,
      "name": "Douglas  Pace"
    },
    {
    	"id":2,
      "name": "Mcleod  Mueller"
    },
    {
    	"id":3,
      "name": "Day  Meyers"
    },
    {
    	"id":4,
      "name": "Aguirre  Ellis"
    },
    {
    	"id":6,
      "name": "Cook  Tyson"
    }
  ];

  constructor() { }

  ngOnInit() {

  }

}
