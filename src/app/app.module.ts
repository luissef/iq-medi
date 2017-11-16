import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorkComponent } from './work/work.component';

import { AppRoutingModule } from './app.router-module';
import { HomeModule } from './home/home.module';
import { WorkModule } from './work/work.module';

import { AuthService } from './home/auth.service';
import { AppService } from './app.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { APP_BASE_HREF } from '@angular/common';

import {ToolTipModule} from 'angular2-tooltip'

export const firebaseConfig = {
  apiKey: 'AIzaSyDz6Z7GWHd3qtjH19l_q3DR63daZrIihIY',
  authDomain: 'iq-medi.firebaseapp.com',
  databaseURL: 'https://iq-medi.firebaseio.com',
  storageBucket: 'iq-medi.appspot.com',
  messagingSenderId: '303493590025'
}

/**
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    WorkModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    ToolTipModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireAuth, AuthService, AppService, { provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
