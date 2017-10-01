import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';

import { Usuario } from '../modelos/usuario';

/**
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  usuario: Usuario = null;
  loggedIn: boolean;

  /**
   * Creates an instance of AuthService.
   * @memberof AuthService
   */
  constructor( ) {
    this.loggedIn = false;
  }

  /**
   *
   * @param {Usuario} usuario
   * @returns
   * @memberof AuthService
   */
  login(usuario: Usuario) {
    this.usuario = usuario;
    this.loggedIn = true;
    return this.loggedIn;
  }

  /**
   *
   * @memberof AuthService
   */
  logout(): void {
    this.usuario = null;
    this.loggedIn = false;
  }

  /**
   *
   * @returns
   * @memberof AuthService
   */
  isLoggedIn() {
    return this.loggedIn;
  }
}
