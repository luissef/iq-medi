import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class Authguard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService ) { }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    }else {
      this.router.navigate([ '/home' ]);
    return false;
    }
  }
}
