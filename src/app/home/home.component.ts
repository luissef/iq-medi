import { Component, OnInit } from '@angular/core';

/**
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  homeTittle = 'IQ-MEDI';
  imageIqMedi: string;

  /**
   * Creates an instance of HomeComponent.
   * @memberof HomeComponent
   */
  constructor() {
    this.imageIqMedi = '/assets/resources/iq-medi.png';
  }

  /**
   *
   * @memberof HomeComponent
   */
  ngOnInit() {
  }

}
