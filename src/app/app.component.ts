import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IQ-MEDI';
  mensajeError: string;
  imageIqMedi: string;
  formLogin: FormGroup;
  formRegistrar: FormGroup;

  constructor(
    private fblogin: FormBuilder,
    private fbregistrar: FormBuilder,
    private abfauth: AngularFireAuth
  ) {
    this.crearComponenteLogin();
    this.crearComponenteRegistrar();
    this.imageIqMedi = '/assets/resources/iq-medi.png';
  }

  crearComponenteLogin() {
    this.formLogin = this.fblogin.group({
      email: ['', Validators.required],
      contrasenia: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])]
    })
  }

  crearComponenteRegistrar() {
    this.formRegistrar = this.fbregistrar.group({
      email: ['', Validators.required],
      contrasenia: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])]
    })
  }

  login() {
    console.log('Login');
    // console.log(this.formLogin.value);
    this.limpiarLogin();
  }

  registrar() {
    console.log('Registrar');
    // console.log(this.formRegistrar.value);
    this.abfauth.auth.createUserWithEmailAndPassword(this.formRegistrar.value.email, this.formRegistrar.value.contrasenia)
      .then((user) => {
        console.log(user);
      })
      .catch(error => {
        console.log(error.message);
        console.log(error)
        alert(error.message);
      });
    this.limpiarRegistrar();
  }

  limpiarLogin() {
    console.log('Limpiando Formulario');
    this.formLogin.reset();
  }

  limpiarRegistrar() {
    console.log('Limpiando Formulario');
    this.formRegistrar.reset();
  }
}
