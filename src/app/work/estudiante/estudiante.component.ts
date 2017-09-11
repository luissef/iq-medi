import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';

import { AppService } from '../../app.service';
import { AuthService } from '../../home/auth.service';

import { Estudiante } from '../../modelos/estudiante';
import { Puntajecuestionario } from '../../modelos/puntajecuestionario';
import { Cuestionarioevaluado } from '../../modelos/cuestionarioevaluado';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html'
})
export class EstudianteComponent implements OnInit {

  private subEstudiantes: any;
  private subTests: any;
  private subTipoSubTests: any;
  private subPregunta: any;
  private subRespuesta: any;
  private subMaterial: any;

  private resultadopregunta: Cuestionarioevaluado[] = [];
  private resultadocuestionario: Puntajecuestionario[] = [];

  imageIqMedi: string;

  mensaje: string;

  formDetalleEstudiante: FormGroup;
  formBuscarFiltro: FormGroup;
  formRespuestaPregunta: FormGroup;
  formDatosTest: FormGroup;

  estudiantes: any[];
  tests: any[];
  tipoSubTests: any[];
  pregunta: any[];
  respuesta: any[];
  detallesestudiante: any;
  test: any;
  material: any[];
  estudiante: Estudiante;
  nropreguntas: any[] = [];

  // Cuestionario run
  edadminima: number;
  numeropreguntas: number;
  numero_pregunta: number;
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
    private fbDatosTest: FormBuilder,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.crearComponenteDetalleEstuadiante();
    this.crearComponenteBuscar();
    this.crearComponenteRespuestaPregunta();
    this.crearComponenteDatosTest();
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
      tipopregunta: '',
      respuesta: ['', Validators.required],
      nropregunta: this.numero_pregunta
    });
  }

  crearComponenteDatosTest() {
    this.formDatosTest = this.fbDatosTest.group({
      fechanacimiento: '',
      fechatest: '',
      edadmeses: ''
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.subEstudiantes) {
      this.subEstudiantes.unsubscribe();
    }

    if (this.subTests) {
      this.subTests.unsubscribe();
    }

    if (this.subTipoSubTests) {
      this.subTipoSubTests.unsubscribe();
    }

    if (this.subPregunta) {
      this.subPregunta.unsubscribe();
    }

    if (this.subRespuesta) {
      this.subRespuesta.unsubscribe();
    }

    if (this.subMaterial) {
      this.subMaterial.unsubscribe();
    }
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
    this.resultadocuestionario = [];
    this.resultadopregunta = [];
    this.edadminima = 0;
    this.nropreguntas = [];
    this.numero_pregunta = 0;
    this.puntajeerror = 0;
    this.test = null;

    if (this.subMaterial) {
      this.subMaterial.unsubscribe();
      this.material = null;
    }
  }

  limpiarsubTest() {

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
    this.edadminima = test.edadminima;

    if (this.numeropreguntas > 0) {
      for (let i = 0; i < this.numeropreguntas; i++) {
        this.nropreguntas.push({'nropre': i + 1});
      }
    }

    this.numero_pregunta = 0;
    this.puntajeerror = 0;

    // tslint:disable-next-line:prefer-const
    let fechanacimiento = new Date(this.detallesestudiante.fecha_nacimiento.replace('-', '/').replace('-', '/'));
    // tslint:disable-next-line:prefer-const
    let fechatest = new Date();

    // tslint:disable-next-line:prefer-const
    let meses = (fechatest.getFullYear() - fechanacimiento.getFullYear()) * 12;

    meses -= fechanacimiento.getMonth() + 1;
    meses += fechatest.getMonth() + 1;

    this.formDatosTest = this.fbDatosTest.group({
      // tslint:disable-next-line:max-line-length
      fechanacimiento: fechanacimiento.getDate() + '/' + (fechanacimiento.getMonth() + 1) + '/' + fechanacimiento.getFullYear(),
      fechatest: fechatest.getDate() + '/' + (fechatest.getMonth() + 1) + '/' + fechatest.getFullYear(),
      edadmeses: meses
    });

    if (this.subMaterial) {
      this.subMaterial.unsubscribe();
      this.material = null;
    }

    this.subMaterial = this.appService.getTestMateriales(this.test)
    .subscribe(material => this.material = material);
  }

  ismayor() {
    if (this.formDatosTest.value.edadmeses >= this.edadminima) {
      return true;
    }else {
      return false;
    }
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

  irPregunta() {
    console.log("aqui");
  }

  sigPregunta() {



    if (this.numero_pregunta > 0) {
      // tslint:disable-next-line:prefer-const
      let ingresar = true;

      for (let i = 0; i < this.resultadopregunta.length; i++) {
        if (this.resultadopregunta[i].numeropregunta === this.numero_pregunta) {
          this.resultadopregunta[i].puntaje = this.formRespuestaPregunta.value.respuesta;
          ingresar = false;
        }
      }

      if (ingresar) {
        this.resultadopregunta.push(new Cuestionarioevaluado(
          this.numero_pregunta,
          this.formRespuestaPregunta.value.tipopregunta,
          (((this.hora * 60) * 60) + (this.minuto * 60) + (this.segundo)),
          this.formRespuestaPregunta.value.respuesta));
      }

      console.log(this.resultadopregunta);
    }

    this.numero_pregunta = this.numero_pregunta + 1;
    this.stop();

    if (this.subPregunta) {
      this.subPregunta.unsubscribe();
      this.subRespuesta.unsubscribe();
    }

    if (this.numero_pregunta < this.numeropreguntas) {
      this.subPregunta = this.appService.getPregunta(this.test, this.numero_pregunta)
      .subscribe(pregunta => this.pregunta = pregunta);

      this.subRespuesta = this.appService.getPreguntaRespuesta(this.test, this.numero_pregunta)
      .subscribe(respuesta => this.respuesta = respuesta);

      this.crearComponenteRespuestaPregunta();
    }
  }

  cancelarTest() {
    this.resultadocuestionario = [];
    this.resultadopregunta = [];
    this.nropreguntas = [];
    this.numero_pregunta = 0;
    this.puntajeerror = 0;

    if (this.subPregunta) {
      this.subPregunta.unsubscribe();
    }

    if (this.subRespuesta) {
      this.subRespuesta.unsubscribe();
    }

    this.pregunta = null;
    this.stop();
  }

  // Cronometro funciones
  start() {
    this.segundo = 0;
    this.minuto = 0;
    this.hora = 0;
    this.decimi = 0;

    if (this.subPregunta) {
      this.subPregunta.unsubscribe();
      this.subRespuesta.unsubscribe();
    }

    if (this.numero_pregunta < this.numeropreguntas) {
      this.subPregunta = this.appService.getPregunta(this.test, this.numero_pregunta)
      .subscribe(pregunta => this.pregunta = pregunta);

      this.subRespuesta = this.appService.getPreguntaRespuesta(this.test, this.numero_pregunta)
      .subscribe(respuesta => this.respuesta = respuesta);

      this.crearComponenteRespuestaPregunta();
    }

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
