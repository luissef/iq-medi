import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './home/home.module';
import { WorkModule } from './work/work.module';

const APP_ROUTES: Routes = []

/**
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule,
    HomeModule,
    WorkModule
  ]
})

export class AppRoutingModule { }
