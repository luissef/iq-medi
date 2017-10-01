import { Component, OnInit } from '@angular/core';

/**
 *
 * @export
 * @class SaludoComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-saludo',
  templateUrl: './saludo.component.html'
})

export class SaludoComponent implements OnInit {
  imageIqMedi: string;

  /**
   * Creates an instance of SaludoComponent.
   * @memberof SaludoComponent
   */
  constructor() {
    this.imageIqMedi = '/assets/resources/iq-medi.png';
   }

  /**
   *
   * @memberof SaludoComponent
   */
  ngOnInit() {
  }

}
