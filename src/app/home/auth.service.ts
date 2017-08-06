import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';

import { Usuario } from '../modelos/usuario';

@Injectable()
export class AuthService {
  usuario: Usuario = null;
  loggedIn: boolean;

  constructor( ) {
    this.loggedIn = false;
  }

  login(usuario: Usuario) {
    this.usuario = usuario;
    this.loggedIn = true;
    return this.loggedIn;
  }

  logout(): void {
    this.usuario = null;
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
