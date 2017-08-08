import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';

import { AppService } from '../../app.service';
import { AuthService } from '../../home/auth.service';

import { Estudiante } from '../../modelos/estudiante';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html'
})
export class EstudianteComponent implements OnInit {

  private subEstudiantes: any;
  private subTests: any;
  private subPregunta: any;

  imageIqMedi: string;

  mensaje: string;

  formDetalleEstudiante: FormGroup;
  formBuscarFiltro: FormGroup;
  formRespuestaPregunta: FormGroup;

  estudiantes: any[];
  tests: any[];
  pregunta: any[];
  detallesestudiante: any;
  test: any;
  estudiante: Estudiante;

  // Cuestionario run
  numeropreguntas: number;
  numero_pregunta: number;
  puntajetotal: number;
  puntajeerror: number;

  // Cronometro run
  hora: number;
  minuto: number;
  segundo: number;
  decimi: number;
  intTiempo: any;

  @ViewChild('btncerrardetalleestudiante') btncerrardetalleestudiante: ElementRef;
  @ViewChild('btnBorrarEstudiante') btnBorrarEstudiante: ElementRef;
  @ViewChild('btnCerrarEliminarEstudianta') btnCerrarEliminarEstudianta: ElementRef;

  constructor(
    private fbDetalleEstudiante: FormBuilder,
    private fbBuscarFiltro: FormBuilder,
    private fbRespuestaPregunta: FormBuilder,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.crearComponenteDetalleEstuadiante();
    this.crearComponenteBuscar();
    this.crearComponenteRespuestaPregunta();
    this.imageIqMedi = '/assets/resources/iq-medi.png';
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.subEstudiantes = this.appService.getEstudiantes(this.authService.usuario)
      .subscribe(estudiantes => this.estudiantes = estudiantes);

      this.subTests = this.appService.getTest(this.estudiante)
      .subscribe(tests => this.tests = tests);
    }
  }

  crearComponenteDetalleEstuadiante() {
    this.formDetalleEstudiante = this.fbDetalleEstudiante.group({
      ci: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechanacimiento: ['', Validators.required]
    });
  }

  crearComponenteBuscar() {
    this.formBuscarFiltro = this.fbBuscarFiltro.group({
      buscar: ''
    });
  }

  crearComponenteRespuestaPregunta() {
    this.formRespuestaPregunta = this.fbRespuestaPregunta.group({
      respuesta: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subEstudiantes.unsubscribe();
    this.subTests.unsubscribe();
  }

  buscar() {
    if (this.authService.isLoggedIn) {
      this.subEstudiantes.unsubscribe();
      this.subEstudiantes = this.appService.getEstudiantes(this.authService.usuario)
      .subscribe(estudiantes => this.estudiantes = estudiantes);
      this.crearComponenteBuscar();
    }
  }

  buscarporci() {
    let auxCi = this.formBuscarFiltro.value.buscar;

    try {
      // tslint:disable-next-line:radix
      auxCi = parseInt(auxCi);
    } catch (error) {
      console.log(error);
      auxCi = null;
    }

    if (auxCi) {
      if (this.authService.isLoggedIn) {
        this.subEstudiantes.unsubscribe();
        this.subEstudiantes = this.appService.getEstudiantesFiltroCi(this.authService.usuario, auxCi)
        .subscribe(estudiantes => this.estudiantes = estudiantes);
      }
    }
  }

  buscarpornombres() {
    if (this.formBuscarFiltro.value.buscar) {
      if (this.authService.isLoggedIn) {
        this.subEstudiantes.unsubscribe();
        this.subEstudiantes = this.appService.getEstudiantesFiltroNombres(this.authService.usuario, this.formBuscarFiltro.value.buscar)
        .subscribe(estudiantes => this.estudiantes = estudiantes);
      }
    }
  }

  buscarporapellidos() {
    if (this.formBuscarFiltro.value.buscar) {
      if (this.authService.isLoggedIn) {
        this.subEstudiantes.unsubscribe();
        this.subEstudiantes = this.appService.getEstudiantesFiltroApellidos(this.authService.usuario, this.formBuscarFiltro.value.buscar)
        .subscribe(estudiantes => this.estudiantes = estudiantes);
      }
    }
  }

  limpiardetalleEstudiante() {
    this.detallesestudiante = null;
    this.estudiante = null;
    this.crearComponenteDetalleEstuadiante();
  }

  limpiarTest() {
    this.test = null;
  }

  setUpdEstudiante(estudiante: any) {
    this.detallesestudiante = estudiante;
    this.formDetalleEstudiante = this.fbDetalleEstudiante.group({
      ci: [this.detallesestudiante.ci, Validators.required],
      nombres: [this.detallesestudiante.nombres, Validators.required],
      apellidos: [this.detallesestudiante.apellidos, Validators.required],
      fechanacimiento: [this.detallesestudiante.fecha_nacimiento, Validators.required]
    });
  }

  setDelEstudiante(estudiante: any) {
    this.detallesestudiante = estudiante;
    this.mensaje = 'Borrar Persona ' + this.detallesestudiante.ci;
    this.btnBorrarEstudiante.nativeElement.click();
  }

  setEvalEstudiante(estudiante: any) {
    this.detallesestudiante = estudiante;
  }

  setTestEstudiante(test: any) {
    this.test = test;
    this.numeropreguntas = test.numeropreguntas;
    this.numero_pregunta = 0;
    this.puntajetotal = 0;
    this.puntajeerror = 0;
  }

  updateEstudiante() {
    this.estudiante = new Estudiante(
      this.detallesestudiante.$key,
      null,
      this.formDetalleEstudiante.value.ci,
      this.formDetalleEstudiante.value.nombres,
      this.formDetalleEstudiante.value.apellidos,
      this.formDetalleEstudiante.value.fechanacimiento,
      true
    );
    this.appService.updateEstudiante(this.estudiante);
    this.btncerrardetalleestudiante.nativeElement.click();
  }

  deleteEstudiante() {
    this.appService.deleteEstudiante(this.detallesestudiante.$key);
    this.btnCerrarEliminarEstudianta.nativeElement.click();
  }

  sigPregunta() {
    this.numero_pregunta = this.numero_pregunta + 1;
    this.stop();

    if (this.subPregunta) {
      this.subPregunta.unsubscribe();
    }

    if (this.numero_pregunta < this.numeropreguntas) {
      this.subPregunta = this.appService.getPregunta(this.test, this.numero_pregunta)
      .subscribe(pregunta => this.pregunta = pregunta);
      console.log(this.formRespuestaPregunta.value.respuesta);
      if (this.formRespuestaPregunta.value.respuesta) {
        if (this.formRespuestaPregunta.value.respuesta === 'si') {
          this.puntajetotal = this.puntajetotal + 1;
          console.log(this.puntajetotal.toString());
        }else if ((this.formRespuestaPregunta.value.respuesta === 'no')) {
          this.puntajeerror = this.puntajeerror + 1;
          console.log(this.puntajeerror.toString());
        }

      }
      this.crearComponenteRespuestaPregunta();
    }
  }

  cancelarTest() {
    this.numero_pregunta = 0;
    this.puntajetotal = 0;
    this.puntajeerror = 0;
    this.subPregunta.unsubscribe();
    this.pregunta = null;
    this.stop();
  }

  // Cronometro funciones
  start() {
    this.segundo = 0;
    this.minuto = 0;
    this.hora = 0;
    this.decimi = 0;
    this.crearComponenteRespuestaPregunta();

    clearInterval(this.intTiempo);
    this.intTiempo = setInterval(() => {

      this.decimi += 1;

      if (this.decimi === 10) {
        this.decimi = 0;
        this.segundo += 1;
        if (this.segundo === 60) {
          this.segundo = 0;
          this.minuto += 1;

          if (this.minuto === 60) {
            this.minuto = 0;
            this.hora += 1;
            if (this.hora === 24) {
              this.hora = 0;
            }
          }
        }
      }
    }, 100);
  }

  wait() {
    clearInterval(this.intTiempo);
    this.intTiempo = null;
  }

  stop() {
    clearInterval(this.intTiempo);
    this.intTiempo = null;
    this.segundo = 0;
    this.minuto = 0;
    this.hora = 0;
  }
}
