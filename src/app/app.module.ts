import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WorkComponent } from './work/work.component';

import { AppRoutingModule } from './app.router.module';
import { HomeModule } from './home/home.module';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth'

export const firebaseConfig = {
  apiKey: 'AIzaSyDz6Z7GWHd3qtjH19l_q3DR63daZrIihIY',
  authDomain: 'iq-medi.firebaseapp.com',
  databaseURL: 'https://iq-medi.firebaseio.com',
  storageBucket: 'iq-medi.appspot.com',
  messagingSenderId: '303493590025'
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
