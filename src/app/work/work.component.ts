import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';

import { AuthService } from '../home/auth.service';
import { AppService } from '../app.service';

import { Estudiante } from '../modelos/estudiante';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html'
})
export class WorkComponent implements OnInit {
  workTittle = 'Área de Trabajo';
  imageIqMedi: string;
  formRegistrarEstudiante: FormGroup;
  estudiante: Estudiante;
  mensaje: String;

  @ViewChild('btncerrarregistrarestudiante') btncerrarregistroestudiante: ElementRef;
  @ViewChild('btnmostraralertregest') btnmostraralert: ElementRef;
  @ViewChild('btnmostrarloadingwork') btnmostrarloadingwork: ElementRef;
  @ViewChild('btncerrarloadingwork') btncerrarloadingwork: ElementRef;

  constructor(
    private fbRegistrarEstudiante: FormBuilder,
    private authService: AuthService,
    private appService: AppService
  ) {
    this.crearComponenteRegistrarEstuadiante();
    this.imageIqMedi = '/assets/resources/iq-medi.png';
  }

  crearComponenteRegistrarEstuadiante() {
    this.formRegistrarEstudiante = this.fbRegistrarEstudiante.group({
      ci: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechanacimiento: ['', Validators.required]
    })
  }

  registrarEstudiante() {
    this.btnmostrarloadingwork.nativeElement.click();
    this.estudiante = new Estudiante(
      null,
      this.authService.usuario.id,
      this.formRegistrarEstudiante.value.ci,
      this.formRegistrarEstudiante.value.nombres,
      this.formRegistrarEstudiante.value.apellidos,
      this.formRegistrarEstudiante.value.fechanacimiento,
      true
    );

    this.btncerrarregistroestudiante.nativeElement.click();
    this.appService.setEstudiante(this.estudiante);
    this.btnmostraralert.nativeElement.click();
    this.mensaje = 'Persona Registrada';
  }

  limpiarRegistrarEstudiante() {
    this.formRegistrarEstudiante.reset();
    this.cerrarloading();
  }

  ngOnInit() {
  }

  cerrarloading() {
    setTimeout(() => this.btncerrarloadingwork.nativeElement.click(), 500);
  }

}
