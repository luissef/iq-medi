import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Authexitguard } from './authexit.guard';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.router-module';

/**
 *
 * @export
 * @class HomeModule
 */
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [Authexitguard]
})

export class HomeModule { }
