import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

/**
 *
 * @export
 * @class Authguard
 * @implements {CanActivate}
 */
@Injectable()
export class Authguard implements CanActivate {

  /**
   * Creates an instance of Authguard.
   * @param {Router} router
   * @param {AuthService} auth
   * @memberof Authguard
   */
  constructor(
    private router: Router,
    private auth: AuthService ) { }

  /**
   *
   * @returns
   * @memberof Authguard
   */
  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    }else {
      this.router.navigate([ '/home' ]);
      return false;
    }
  }
}
