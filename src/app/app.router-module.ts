import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './home/home.module';
import { WorkModule } from './work/work.module';

const appRoutes: Routes = []

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule,
    HomeModule,
    WorkModule
  ]
})

export class AppRoutingModule { }
