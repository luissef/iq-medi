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
  estudiantes: any[];
  subEstudiantes: any;
  imageIqMedi: string;
  mensaje: string;
  formDetalleEstudiante: FormGroup;
  formBuscarFiltro: FormGroup;
  detallesestudiante: any;
  estudiante: Estudiante;

  @ViewChild('btncerrardetalleestudiante') btncerrardetalleestudiante: ElementRef;
  @ViewChild('btnBorrarEstudiante') btnBorrarEstudiante: ElementRef;
  @ViewChild('btnCerrarEliminarEstudianta') btnCerrarEliminarEstudianta: ElementRef;

  constructor(
    private fbDetalleEstudiante: FormBuilder,
    private fbBuscarFiltro: FormBuilder,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.crearComponenteDetalleEstuadiante();
    this.crearComponenteBuscar();
    this.imageIqMedi = '/assets/resources/iq-medi.png';
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.subEstudiantes = this.appService.getEstudiantes(this.authService.usuario)
      .subscribe(estudiantes => this.estudiantes = estudiantes);
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

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subEstudiantes.unsubscribe();
  }

  buscar() {
    if (this.authService.isLoggedIn) {
      this.subEstudiantes = this.appService.getEstudiantes(this.authService.usuario)
      .subscribe(estudiantes => this.estudiantes = estudiantes);
    }
  }

  buscarporci() {
    if (this.formBuscarFiltro.value.buscar) {
      if (this.authService.isLoggedIn) {
        this.subEstudiantes = this.appService.getEstudiantesFiltroCi(this.authService.usuario, this.formBuscarFiltro.value.buscar)
        .subscribe(estudiantes => this.estudiantes = estudiantes);
      }
    }
  }

  buscarpornombres() {
    if (this.formBuscarFiltro.value.buscar) {
      if (this.authService.isLoggedIn) {
        this.subEstudiantes = this.appService.getEstudiantesFiltroNombres(this.authService.usuario, this.formBuscarFiltro.value.buscar)
        .subscribe(estudiantes => this.estudiantes = estudiantes);
      }
    }
  }

  buscarporapellidos() {
    if (this.formBuscarFiltro.value.buscar) {
      if (this.authService.isLoggedIn) {
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
    this.mensaje = 'Borrar estudiante ' + this.detallesestudiante.ci;
    this.btnBorrarEstudiante.nativeElement.click();
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
}
