import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorkComponent } from './work/work.component';

import { AppRoutingModule } from './app.router-module';
import { HomeModule } from './home/home.module';
import { WorkModule } from './work/work.module';

import { AuthService } from './home/auth.service';
import { AppService } from './app.service';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyDz6Z7GWHd3qtjH19l_q3DR63daZrIihIY',
  authDomain: 'iq-medi.firebaseapp.com',
  databaseURL: 'https://iq-medi.firebaseio.com',
  storageBucket: 'iq-medi.appspot.com',
  messagingSenderId: '303493590025'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    WorkModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireAuth, AuthService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
