import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.router-module';

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
  providers: []
})

export class HomeModule { }
