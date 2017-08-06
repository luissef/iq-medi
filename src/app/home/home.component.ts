import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  homeTittle = 'IQ-MEDI';
  imageIqMedi: string;

  constructor() {
    this.imageIqMedi = '/assets/resources/iq-medi.png';
  }

  ngOnInit() {
  }

}
