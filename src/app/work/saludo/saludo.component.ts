import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saludo',
  templateUrl: './saludo.component.html'
})
export class SaludoComponent implements OnInit {
  imageIqMedi: string;

  constructor() {
    this.imageIqMedi = '/assets/resources/iq-medi.png';
   }

  ngOnInit() {
  }

}
