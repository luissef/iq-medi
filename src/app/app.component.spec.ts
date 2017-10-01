import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.router-module';
import { RouterModule, Routes } from '@angular/router';

import { APP_BASE_HREF } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService } from './home/auth.service';
import { AppService } from './app.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyDz6Z7GWHd3qtjH19l_q3DR63daZrIihIY',
  authDomain: 'iq-medi.firebaseapp.com',
  databaseURL: 'https://iq-medi.firebaseio.com',
  storageBucket: 'iq-medi.appspot.com',
  messagingSenderId: '303493590025'
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        AppRoutingModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        AngularFireAuth,
        AppService,
        AuthService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));
});
