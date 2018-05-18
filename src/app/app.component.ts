import { Component } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario: string;
  otheruser: any;

  constructor(protected localStorage: AsyncLocalStorage) {}


 
  title = 'theapp';


  ngOnInit() {
    this.localStorage.getItem('usuario').subscribe((data) => {
    this.usuario = localStorage.getItem('usuario');

     
    });
  }
  
}
