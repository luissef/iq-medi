import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Authexitguard } from '../home/authexit.guard';

import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [Authexitguard] },
  { path: 'home', component: HomeComponent, canActivate: [Authexitguard] }
]

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class HomeRoutingModule { }
