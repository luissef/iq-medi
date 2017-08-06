import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';

import { AppService } from './app.service';
import { AuthService } from './home/auth.service';

import { Usuario } from './modelos/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IQ-MEDI';
  alerta = '';
  imageIqMedi: string;
  usuario: Usuario;
  formLogin: FormGroup;
  formRegistrar: FormGroup;

  @ViewChild('btncerrarregistrar') btncerrarregistrar: ElementRef;
  @ViewChild('btnmostraralert') btnmostraralert: ElementRef;
  @ViewChild('btncerrarlogin') btncerrarlogin: ElementRef;
  @ViewChild('btnmenuprincipal') btnmenuprincipal: ElementRef;

  constructor(
    private router: Router,
    private fblogin: FormBuilder,
    private fbregistrar: FormBuilder,
    private abfauth: AngularFireAuth,
    private appservice: AppService,
    public authService: AuthService
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
        Validators.maxLength(20)])]
    })
  }

  crearComponenteRegistrar() {
    this.formRegistrar = this.fbregistrar.group({
      email: ['', Validators.required],
      contrasenia: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)])],
      usuario: ['', Validators.required]
    })
  }

  login() {
    this.abfauth.auth.signInWithEmailAndPassword(this.formLogin.value.email, this.formLogin.value.contrasenia)
      .then((user) => {
        this.usuario = new Usuario(
          user.uid,
          null,
          user.email,
          false
        );

        // tslint:disable-next-line:prefer-const
        let auxAppService = this.appservice;
        // tslint:disable-next-line:prefer-const
        let auxAuthService = this.authService;
        // tslint:disable-next-line:prefer-const
        let auxBtncerrarlogin = this.btncerrarlogin;
        // tslint:disable-next-line:prefer-const
        let auxRouter = this.router;
        // tslint:disable-next-line:prefer-const
        let auxMensajeError = this.mensajeError;
        // tslint:disable-next-line:prefer-const
        let auxBtnmostraralert = this.btnmostraralert;
        // tslint:disable-next-line:prefer-const
        let auxBtnmenuprincipal = this.btnmenuprincipal;

        this.appservice.getUsuario(this.usuario)
        .then(function(usuario) {
          if (usuario.isactive) {
            auxAuthService.login(usuario);
            auxBtncerrarlogin.nativeElement.click();
            auxBtnmenuprincipal.nativeElement.click();
            const link = ['/work/'];
            auxRouter.navigate(link);
          } else {
            auxBtncerrarlogin.nativeElement.click();
            auxMensajeError('Usuario desactivado, comuníquese con el administrador “luis.jacome@epn.edu.ec”');
            auxBtnmostraralert.nativeElement.click();
          }
        });
      }
    )
      .catch(error => {
        this.btncerrarlogin.nativeElement.click();
        this.mensajeError(error.message);
        this.btnmostraralert.nativeElement.click();
      }
    );
  }

  logout() {
    this.btnmenuprincipal.nativeElement.click();
    this.authService.logout();
    this.abfauth.auth.signOut();
    const link = ['/home/'];
    this.router.navigate(link);
  }

  registrar() {
    this.abfauth.auth.createUserWithEmailAndPassword(
      this.formRegistrar.value.email,
      this.formRegistrar.value.contrasenia)
      .then((user) => {
        this.usuario = new Usuario(
          user.uid,
          this.formRegistrar.value.usuario,
          user.email,
          true);
        this.appservice.setUsuario(this.usuario);
        this.authService.login(this.usuario);
        this.btncerrarregistrar.nativeElement.click();
        const link = ['/work/'];
        this.router.navigate(link);
      }
    )
      .catch(error => {
        this.btncerrarregistrar.nativeElement.click();
        this.mensajeError(error.message);
        this.btnmostraralert.nativeElement.click();
      }
    );
  }

  limpiarLogin() {
    this.formLogin.reset();
  }

  limpiarRegistrar() {
    this.formRegistrar.reset();
  }

  mensajeError(mensaje: string) {
    this.alerta = '';

    if (mensaje.localeCompare('The email address is badly formatted.') === 0) {
      this.alerta = 'La dirección de email está mal formada.';
    }else if (mensaje.localeCompare('The email address is already in use by another account.') === 0) {
      this.alerta = 'La dirección de email ya está siendo usada en otra cuenta.';
    }else {
      this.alerta = mensaje;
    }
  }
}
