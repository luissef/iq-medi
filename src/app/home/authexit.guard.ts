import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

/**
 *
 * @export
 * @class Authexitguard
 * @implements {CanActivate}
 */
@Injectable()
export class Authexitguard implements CanActivate {

  /**
   * Creates an instance of Authexitguard.
   * @param {Router} router
   * @param {AuthService} auth
   * @memberof Authexitguard
   */
  constructor(
    private router: Router,
    private auth: AuthService ) { }

  /**
   *
   * @returns
   * @memberof Authexitguard
   */
  canActivate() {
    if (!this.auth.isLoggedIn()) {
      return true;
    }else {
      this.router.navigate([ '/work' ]);
      return false;
    }
  }
}
