import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
  	this.loaderService.display(false);
  }

}
