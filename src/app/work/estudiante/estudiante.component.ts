import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';

import { AppService } from '../../app.service';
import { AuthService } from '../../home/auth.service';

import { Estudiante } from '../../modelos/estudiante';
import { Puntajecuestionario } from '../../modelos/puntajecuestionario';
import { Cuestionarioevaluado } from '../../modelos/cuestionarioevaluado';

/**
 *
 * @export
 * @class EstudianteComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html'
})

export class EstudianteComponent implements OnInit {

  private subEstudiantes: any;
  private subTests: any;
  private subTestEvaluado: any;
  private subTipoSubTests: any;
  private subPregunta: any;
  private subRespuesta: any;
  private subMaterial: any;
  private subResultadoCategoria: any;
  private subTestCalificado: any;

  private resultadopregunta: Cuestionarioevaluado[] = [];
  private resultadocuest: Puntajecuestionario[] = [];
  private resultadocuestcat: Puntajecuestionario[] = [];

  imageIqMedi: string;
  preguntazazzo4: string;
  preguntazazzo8: string;
  preguntazazzo12: string;
  preguntazazzo14: string;
  preguntazazzo23: string;
  preguntazazzo37: string;
  preguntazazzo38: string;
  preguntazazzo42: string;
  preguntazazzo43: string;
  preguntazazzo46: string;
  idtestEvaluado: string;

  mensaje: string;

  formDetalleEstudiante: FormGroup;
  formBuscarFiltro: FormGroup;
  formRespuestaPregunta: FormGroup;
  formDatosTest: FormGroup;

  estudiantes: any[];
  tests: any[];
  testEvaluado: any[];
  tipoSubTests: any[];
  pregunta: any[];
  respuesta: any[];
  detallesestudiante: any;
  test: any;
  material: any[];
  estudiante: Estudiante;
  nropreguntas: any[] = [];
  resultadoCategoria: any[];
  testCalificado: any[];

  // Cuestionario run
  edadminima: number;
  edadmaxima: number;
  numeropreguntas: number;
  numero_pregunta: number;
  puntajeerror: number;

  // Cronometro run
  hora: number;
  minuto: number;
  segundo: number;
  decimi: number;
  intTiempo: any;

  calificar: boolean;
  testcompleto = false;
  preguntaopcional = false;
  resutadofinal = false;

  @ViewChild('btncerrardetalleestudiante') btncerrardetalleestudiante: ElementRef;
  @ViewChild('btnBorrarEstudiante') btnBorrarEstudiante: ElementRef;
  @ViewChild('btnCerrarEliminarEstudianta') btnCerrarEliminarEstudianta: ElementRef;
  @ViewChild('btnmostrarloadingest') btnmostrarloadingest: ElementRef;
  @ViewChild('btncerrarloadingest') btncerrarloadingest: ElementRef;
  @ViewChild('btnguardarrespuesta') btnguardarrespuesta: ElementRef;

  /**
   * Creates an instance of EstudianteComponent.
   * @param {FormBuilder} fbDetalleEstudiante
   * @param {FormBuilder} fbBuscarFiltro
   * @param {FormBuilder} fbRespuestaPregunta
   * @param {FormBuilder} fbDatosTest
   * @param {AppService} appService
   * @param {AuthService} authService
   * @memberof EstudianteComponent
   */
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
    this.crearComponenteRespuestaPregunta('');
    this.crearComponenteDatosTest();
    this.imageIqMedi = '/assets/resources/iq-medi.png';
    this.preguntazazzo4 = '/assets/resources/zazzo4.png';
    this.preguntazazzo8 = '/assets/resources/zazzo8.png';
    this.preguntazazzo12 = '/assets/resources/zazzo12.png';
    this.preguntazazzo14 = '/assets/resources/zazzo14.png';
    this.preguntazazzo23 = '/assets/resources/zazzo23.png';
    this.preguntazazzo37 = '/assets/resources/zazzo37.png';
    this.preguntazazzo38 = '/assets/resources/zazzo38.png';
    this.preguntazazzo42 = '/assets/resources/zazzo42.png';
    this.preguntazazzo43 = '/assets/resources/zazzo43.png';
    this.preguntazazzo46 = '/assets/resources/zazzo46.png';
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  ngOnInit() {
    this.btnmostrarloadingest.nativeElement.click();
    if (this.authService.isLoggedIn) {
      this.subEstudiantes = this.appService.getEstudiantes(this.authService.usuario)
      .subscribe(estudiantes => this.estudiantes = estudiantes);

      this.subTests = this.appService.getTest()
      .subscribe(tests => this.tests = tests);
      this.cerrarloading();
    }else {
      this.cerrarloading();
    }
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  crearComponenteDetalleEstuadiante() {
    this.formDetalleEstudiante = this.fbDetalleEstudiante.group({
      ci: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      fechanacimiento: ['', Validators.required]
    });
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  crearComponenteBuscar() {
    this.formBuscarFiltro = this.fbBuscarFiltro.group({
      buscar: ''
    });
  }

  /**
   *
   * @param {String} respu
   * @memberof EstudianteComponent
   */
  crearComponenteRespuestaPregunta(respu: String) {
    this.formRespuestaPregunta = this.fbRespuestaPregunta.group({
      tipopregunta: '',
      respuesta: [ respu, Validators.required],
      nropregunta: this.numero_pregunta,
      errores: '',
      siguiente: '',
      categoria: '',
      opcional: false,
      sigopcional: false
    });
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  crearComponenteDatosTest() {
    this.formDatosTest = this.fbDatosTest.group({
      fechanacimiento: '',
      fechatest: '',
      edad: '',
      edadmeses: ''
    });
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.subEstudiantes) {
      this.subEstudiantes.unsubscribe();
      this.estudiantes = null;
    }

    if (this.subTests) {
      this.subTests.unsubscribe();
      this.tests = null;
    }

    if (this.subTestEvaluado) {
      this.subTestEvaluado.unsubscribe();
      this.testEvaluado = null;
    }

    if (this.subTipoSubTests) {
      this.subTipoSubTests.unsubscribe();
      this.tipoSubTests = null;
    }

    if (this.subPregunta) {
      this.subPregunta.unsubscribe();
      this.pregunta = null;
    }

    if (this.subRespuesta) {
      this.subRespuesta.unsubscribe();
      this.respuesta = null;
    }

    if (this.subMaterial) {
      this.subMaterial.unsubscribe();
      this.material = null;
    }

    if (this.subResultadoCategoria) {
      this.subResultadoCategoria.unsubscribe();
      this.resultadoCategoria = null;
    }
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  buscar() {
    this.btnmostrarloadingest.nativeElement.click();
    if (this.authService.isLoggedIn) {
      this.subEstudiantes.unsubscribe();
      this.estudiantes = null;
      this.subEstudiantes = this.appService.getEstudiantes(this.authService.usuario)
      .subscribe(estudiantes => this.estudiantes = estudiantes);
      this.crearComponenteBuscar();
      this.cerrarloading();
    }else {
      this.cerrarloading();
    }
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  buscarporci() {
    this.btnmostrarloadingest.nativeElement.click();
    let auxCi = this.formBuscarFiltro.value.buscar;

    try {
      // tslint:disable-next-line:radix
      auxCi = parseInt(auxCi);
    } catch (error) {
      auxCi = null;
    }

    if (auxCi) {
      if (this.authService.isLoggedIn) {
        this.subEstudiantes.unsubscribe();
        this.estudiantes = null;
        this.subEstudiantes = this.appService.getEstudiantesFiltroCi(this.authService.usuario, auxCi)
        .subscribe(estudiantes => this.estudiantes = estudiantes);
        this.cerrarloading();
      }else {
        this.cerrarloading();
      }
    }else {
      this.cerrarloading();
    }
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  buscarpornombres() {
    this.btnmostrarloadingest.nativeElement.click();
    if (this.formBuscarFiltro.value.buscar) {
      if (this.authService.isLoggedIn) {
        this.subEstudiantes.unsubscribe();
        this.estudiantes = null;
        this.subEstudiantes = this.appService.getEstudiantesFiltroNombres(this.authService.usuario, this.formBuscarFiltro.value.buscar)
        .subscribe(estudiantes => this.estudiantes = estudiantes);
        this.cerrarloading();
      }else {
        this.cerrarloading();
      }
    }else {
      this.cerrarloading();
    }
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  buscarporapellidos() {
    this.btnmostrarloadingest.nativeElement.click();
    if (this.formBuscarFiltro.value.buscar) {
      if (this.authService.isLoggedIn) {
        this.subEstudiantes.unsubscribe();
        this.estudiantes = null;
        this.subEstudiantes = this.appService.getEstudiantesFiltroApellidos(this.authService.usuario, this.formBuscarFiltro.value.buscar)
        .subscribe(estudiantes => this.estudiantes = estudiantes);
        this.cerrarloading();
      }else {
        this.cerrarloading();
      }
    }else {
      this.cerrarloading();
    }
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  limpiardetalleEstudiante() {
    this.detallesestudiante = null;
    this.estudiante = null;

    if (this.subMaterial) {
      this.subMaterial.unsubscribe();
      this.material = null;
    }

    if (this.subTestEvaluado) {
      this.subTestEvaluado.unsubscribe();
      this.testEvaluado = null;
    }

    this.crearComponenteDetalleEstuadiante();
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  limpiarTest() {
    this.resultadocuest = [];
    this.resultadocuestcat = [];
    this.resultadopregunta = [];
    this.edadminima = 0;
    this.edadmaxima = 0;
    this.nropreguntas = [];
    this.numero_pregunta = 0;
    this.puntajeerror = 0;
    this.test = null;

    if (this.subResultadoCategoria) {
      this.subResultadoCategoria.unsubscribe();
      this.resultadoCategoria = null;
    }

    if (this.subPregunta) {
      this.subPregunta.unsubscribe();
      this.pregunta = null;
    }

    if (this.subRespuesta) {
      this.subRespuesta.unsubscribe();
      this.respuesta = null;
    }

    if (this.subTipoSubTests) {
      this.subTipoSubTests.unsubscribe();
      this.tipoSubTests = null;
    }

    if (this.subMaterial) {
      this.subMaterial.unsubscribe();
      this.material = null;
    }
  }

  /**
   *
   * @param {*} estudiante
   * @memberof EstudianteComponent
   */
  setUpdEstudiante(estudiante: any) {
    this.btnmostrarloadingest.nativeElement.click();
    this.detallesestudiante = estudiante;
    this.formDetalleEstudiante = this.fbDetalleEstudiante.group({
      ci: [this.detallesestudiante.ci, Validators.required],
      nombres: [this.detallesestudiante.nombres, Validators.required],
      apellidos: [this.detallesestudiante.apellidos, Validators.required],
      sexo: [this.detallesestudiante.sexo, Validators.required],
      fechanacimiento: [this.detallesestudiante.fecha_nacimiento, Validators.required]
    });
    this.cerrarloading();
  }

  /**
   *
   * @param {*} estudiante
   * @memberof EstudianteComponent
   */
  setDelEstudiante(estudiante: any) {
    this.btnmostrarloadingest.nativeElement.click();
    this.detallesestudiante = estudiante;
    this.mensaje = 'Borrar Persona ' + this.detallesestudiante.ci;
    this.cerrarloading();
    this.btnBorrarEstudiante.nativeElement.click();
  }

  /**
   *
   * @param {*} estudiante
   * @memberof EstudianteComponent
   */
  setEvalEstudiante(estudiante: any) {
    this.btnmostrarloadingest.nativeElement.click();
    this.detallesestudiante = estudiante;
    this.subTestEvaluado = this.appService.getTestEvaluado(
      this.authService.usuario,
      this.detallesestudiante)
    .subscribe(testevaluado => this.testEvaluado = testevaluado);
    this.cerrarloading();
  }

  /**
   *
   * @param {*} test
   * @memberof EstudianteComponent
   */
  setTestEstudiante(test: any) {
    this.btnmostrarloadingest.nativeElement.click();
    this.test = test;

    this.numeropreguntas = test.numeropreguntas;
    this.edadminima = test.edadminima;
    this.edadmaxima = test.edadmaxima;

    if (this.numeropreguntas > 0) {
      this.nropreguntas.push({'nropre': 0});
      for (let i = 0; i < this.numeropreguntas; i++) {
        this.nropreguntas.push({'nropre': i + 1});
      }
    }

    this.numero_pregunta = 0;
    this.puntajeerror = 0;
    this.calificar =  false;
    this.testcompleto = false;
    this.preguntaopcional = false;

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
      edad: this.mesesanios(meses),
      edadmeses: meses
    });

    if (this.subMaterial) {
      this.subMaterial.unsubscribe();
      this.material = null;
    }

    this.subMaterial = this.appService.getTestMateriales(this.test)
    .subscribe(material => this.material = material);
    this.cerrarloading();
  }

  /**
   *
   * @returns
   * @memberof EstudianteComponent
   */
  ismayor() {
    if (this.edadmaxima === 0) {
      if (this.formDatosTest.value.edadmeses >= this.edadminima ) {
        return true;
      }else {
        return false;
      }
    } else if (this.formDatosTest.value.edadmeses <= this.edadmaxima) {
      if (this.formDatosTest.value.edadmeses >= this.edadminima ) {
        return true;
      }else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   *
   * @returns
   * @memberof EstudianteComponent
   */
  isRespuesta() {
    // tslint:disable-next-line:prefer-const
    let auxPuntaje = '';

    for (let i = 0; i < this.resultadopregunta.length; i++) {
      if (this.resultadopregunta[i].numeropregunta === this.numero_pregunta) {
        auxPuntaje = this.resultadopregunta[i].puntaje.toString();
      }
    }

    return auxPuntaje;
  }

  /**
   *
   * @param {number} meses
   * @returns
   * @memberof EstudianteComponent
   */
  mesesanios(meses: number) {
    // tslint:disable-next-line:prefer-const
    let anios = Math.floor(meses / 12);
    // tslint:disable-next-line:prefer-const
    let mes = meses % 12;

    return (anios + ' Años, ' + mes + ' Meses');
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  updateEstudiante() {
    this.btnmostrarloadingest.nativeElement.click();
    this.estudiante = new Estudiante(
      this.detallesestudiante.$key,
      null,
      this.formDetalleEstudiante.value.ci,
      this.formDetalleEstudiante.value.nombres,
      this.formDetalleEstudiante.value.apellidos,
      this.formDetalleEstudiante.value.sexo,
      this.formDetalleEstudiante.value.fechanacimiento,
      true
    );
    this.appService.updateEstudiante(this.estudiante);
    this.btncerrardetalleestudiante.nativeElement.click();
    this.cerrarloading();
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  deleteEstudiante() {
    this.btnmostrarloadingest.nativeElement.click();
    this.appService.deleteEstudiante(this.detallesestudiante.$key);
    this.btnCerrarEliminarEstudianta.nativeElement.click();
    this.cerrarloading();
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  selPregunta() {
    // tslint:disable-next-line:radix
    this.numero_pregunta = parseInt(this.formRespuestaPregunta.value.nropregunta);
    this.irPregunta();
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  antes() {
    // tslint:disable-next-line:radix
    this.numero_pregunta = parseInt(this.formRespuestaPregunta.value.nropregunta) - 1;
    this.irPregunta();
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  siguiente() {
    // tslint:disable-next-line:radix
    this.numero_pregunta = parseInt(this.formRespuestaPregunta.value.nropregunta) + 1;
    this.irPregunta();
  }

  /**
   *
   * @param {number} numero
   * @memberof EstudianteComponent
   */

  preguntaSub(numero: number) {
    this.numero_pregunta = numero;
    this.irPregunta();
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  irPregunta() {
    this.stop();

    if (this.numero_pregunta !== 0) {
      this.calificar = false;
    }

    if (this.subPregunta) {
      this.subPregunta.unsubscribe();
      this.pregunta = null;
    }

    if (this.subRespuesta) {
      this.subRespuesta.unsubscribe();
      this.respuesta = null;
    }

    if (this.subTipoSubTests) {
      this.subTipoSubTests.unsubscribe();
    }

    if (this.numero_pregunta <= this.numeropreguntas && this.numero_pregunta > 0) {
      this.subPregunta = this.appService.getPregunta(this.test, this.numero_pregunta)
      .subscribe(pregunta => this.pregunta = pregunta);

      this.subRespuesta = this.appService.getPreguntaRespuesta(this.test, this.numero_pregunta)
      .subscribe(respuesta => this.respuesta = respuesta);

      this.subTipoSubTests = this.appService.getSubTest(this.test)
      .subscribe(subtests => this.tipoSubTests = subtests);

      this.crearComponenteRespuestaPregunta(this.isRespuesta());
    }
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  sigPregunta() {
    if (this.numero_pregunta > 0 && this.numero_pregunta <= this.numeropreguntas) {
      // tslint:disable-next-line:prefer-const
      let ingresar = true;
      // tslint:disable-next-line:prefer-const
      let auxerrores = 0;

      for (let i = 0; i < this.resultadopregunta.length; i++) {
        if (this.resultadopregunta[i].numeropregunta === this.numero_pregunta) {
          // tslint:disable-next-line:radix
          if (this.resultadopregunta[i].puntaje !== parseInt(this.formRespuestaPregunta.value.respuesta)) {
            // tslint:disable-next-line:radix
            this.resultadopregunta[i].puntaje = parseInt(this.formRespuestaPregunta.value.respuesta);
            this.resultadopregunta[i].tiempo = (((this.hora * 60) * 60) + (this.minuto * 60) + (this.segundo));
          }
          ingresar = false;
        }
      }

      if (ingresar) {
        this.resultadopregunta.push(new Cuestionarioevaluado(
          this.numero_pregunta,
          this.formRespuestaPregunta.value.tipopregunta,
          (((this.hora * 60) * 60) + (this.minuto * 60) + (this.segundo)),
          // tslint:disable-next-line:radix
          parseInt(this.formRespuestaPregunta.value.respuesta),
          // tslint:disable-next-line:radix
          parseInt(this.formRespuestaPregunta.value.categoria),
          this.formRespuestaPregunta.value.opcional
        ));
      }

      for (let i = 0; i < this.resultadopregunta.length; i++) {
        if (this.formRespuestaPregunta.value.tipopregunta === this.resultadopregunta[i].tipopregunta) {
          if (this.resultadopregunta[i].puntaje === 0) {
            auxerrores = auxerrores + 1;
          }
        }
      }

      // tslint:disable-next-line:radix
      if (parseInt(this.formRespuestaPregunta.value.errores) <= auxerrores) {

        // tslint:disable-next-line:radix
        let auxCom = parseInt(this.formRespuestaPregunta.value.siguiente);
        if (auxCom === 0) {
          auxCom = this.numeropreguntas + 1;
        }

        for (let i = (this.numero_pregunta + 1); i < auxCom; i++) {
          // tslint:disable-next-line:prefer-const
          let auxingresar = true;

          for (let j = 0; j < this.resultadopregunta.length; j++) {
            if (this.resultadopregunta[j].numeropregunta === i) {
              ingresar = false;
            }
          }

          if (auxingresar) {
            this.numero_pregunta = i;
            this.resultadopregunta.push(new Cuestionarioevaluado(
              i,
              this.formRespuestaPregunta.value.tipopregunta,
              0,
              // tslint:disable-next-line:radix
              0,
              // tslint:disable-next-line:radix
              parseInt(this.formRespuestaPregunta.value.categoria),
              this.formRespuestaPregunta.value.opcional
            ));
          }
        }

        // tslint:disable-next-line:radix
        this.numero_pregunta = parseInt(this.formRespuestaPregunta.value.siguiente) - 1;
      }

      if (this.formRespuestaPregunta.value.sigopcional) {
        // tslint:disable-next-line:radix
        if ((this.numero_pregunta + 1) ===  parseInt(this.formRespuestaPregunta.value.siguiente)) {
          this.preguntaopcional = true;
        }
      }
    }

    this.numero_pregunta = this.numero_pregunta + 1;

    if (this.numero_pregunta === 0 || this.numero_pregunta > this.numeropreguntas) {
      this.calificar =  true;
      this.testcompleto = true;
      this.numero_pregunta = 0;
    }

    this.resultadopregunta.sort(function (a, b) {
      return a.numeropregunta - b.numeropregunta;
    });

    if (this.numero_pregunta === 0) {
      this.irresumen();
    } else {
      this.irPregunta();
    }
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  irresumen() {
    this.calificar =  true;
    this.numero_pregunta = 0;
    this.irPregunta();
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  calificarTest() {
    for (let i = 0; i < this.resultadopregunta.length; i++) {
      // tslint:disable-next-line:prefer-const
      let auxIngresar = true;

      for (let j = 0; j < this.resultadocuest.length; j++) {
        if (this.resultadocuest[j].tipopregunta === this.resultadopregunta[i].tipopregunta) {
          auxIngresar = false;
          this.resultadocuest[j].puntaje = this.resultadocuest[j].puntaje + this.resultadopregunta[i].puntaje;
        }
      }

      if (auxIngresar) {
        this.resultadocuest.push(new Puntajecuestionario(
          this.resultadopregunta[i].tipopregunta,
          this.resultadopregunta[i].puntaje,
          0,
          this.resultadopregunta[i].categoria,
          this.resultadopregunta[i].opcional));
      }
    }

    for (let i = 0; i < this.resultadocuest.length; i++) {
      if (this.test.$key === '-KqMrJZ-UEASUXSbu-n8') {
        this.resultadocuest[i].puntosequivalentes = this.resultadocuest[i].puntaje;
      }else if (this.test.$key === '-KqMrQPAJJ2H5Q1Pz01v') {

        this.appService.getPuntosEquivalentes(
          this.resultadocuest[i].tipopregunta,
          this.formDatosTest.value.edadmeses,
          this.resultadocuest[i].puntaje,
          this.test
        ).then(pequi => {
          this.resultadocuest[i].puntosequivalentes = pequi;
        });
      }
    }

    setTimeout(() => {
      // tslint:disable-next-line:prefer-const
      let auxTotalPuntaje = 0;

      for (let i = 0; i < this.resultadocuest.length; i++) {
        // tslint:disable-next-line:prefer-const
        let auxIngresar = true;

        for (let j = 0; j < this.resultadocuestcat.length; j++) {
          if (this.resultadocuestcat[j].categoria === this.resultadocuest[i].categoria) {
            auxIngresar = false;

            if (!this.resultadocuest[i].opcional) {
              if (this.resultadocuest[i].puntosequivalentes > 0) {
                this.resultadocuestcat[j].puntosequivalentes =
                  this.resultadocuestcat[j].puntosequivalentes +
                  this.resultadocuest[i].puntosequivalentes;
              } else {
                for (let k = i + 1; k < this.resultadocuest.length; k++) {
                  if (this.resultadocuest[k].opcional && this.resultadocuestcat[i].categoria === this.resultadocuest[k].categoria) {
                    this.resultadocuest[k].opcional = false;
                    break;
                  }
                }
              }
            }
          }
        }

        if (auxIngresar) {
          this.resultadocuestcat.push(new Puntajecuestionario(
            'General',
            0,
            this.resultadocuest[i].puntosequivalentes,
            this.resultadocuest[i].categoria,
            false));

          if (!this.resultadocuest[i].opcional) {
            if (this.resultadocuest[i].puntosequivalentes === 0) {
              for (let k = i + 1; k < this.resultadocuest.length; k++) {
                if (this.resultadocuest[k].opcional && this.resultadocuestcat[i].categoria === this.resultadocuest[k].categoria) {
                  this.resultadocuest[k].opcional = false;
                  break;
                }
              }
            }
          }
        }
      }


      for (let i = 0; i < this.resultadocuestcat.length; i++) {
        this.resultadocuestcat[i].puntaje = this.resultadocuestcat[i].puntosequivalentes;
        auxTotalPuntaje = auxTotalPuntaje + this.resultadocuestcat[i].puntosequivalentes;
      }

      // tslint:disable-next-line:prefer-const
      let auxidtest = '';

      if (this.test.$key === '-KqMrJZ-UEASUXSbu-n8') {
        this.appService.calificarTestZazzo(
          this.formDatosTest.value.edadmeses,
          auxTotalPuntaje,
          this.resultadopregunta,
          this.resultadocuest,
          this.resultadocuestcat,
          this.test,
          this.detallesestudiante,
          this.authService.usuario,
          this.formDatosTest.value.fechatest
        ).then(idTest => {
          auxidtest = idTest;
          this.idtestEvaluado = auxidtest;
        });

        setTimeout(() => {
          this.subTestCalificado = this.appService.getTestCalificado(this.authService.usuario, this.detallesestudiante, auxidtest)
          .subscribe(testCalificado => this.testCalificado = testCalificado);

          this.subResultadoCategoria = this.appService.getResultadoCategoria(this.authService.usuario, this.detallesestudiante, auxidtest)
          .subscribe(puntajeCategoria => this.resultadoCategoria = puntajeCategoria);
          this.resutadofinal = true;
        }, 500);
      }else if (this.test.$key === '-KqMrQPAJJ2H5Q1Pz01v') {
        this.appService.calificarTestWisc(
          this.formDatosTest.value.edadmeses,
          auxTotalPuntaje,
          this.resultadopregunta,
          this.resultadocuest,
          this.resultadocuestcat,
          this.test,
          this.detallesestudiante,
          this.authService.usuario,
          this.formDatosTest.value.fechatest
        ).then(idTest => {
          auxidtest = idTest;
          this.idtestEvaluado = auxidtest;
        });

        setTimeout(() => {
          this.subTestCalificado = this.appService.getTestCalificado(this.authService.usuario, this.detallesestudiante, auxidtest)
          .subscribe(testCalificado => this.testCalificado = testCalificado);

          this.subResultadoCategoria = this.appService.getResultadoCategoria(this.authService.usuario, this.detallesestudiante, auxidtest)
          .subscribe(puntajeCategoria => this.resultadoCategoria = puntajeCategoria);
          this.resutadofinal = true;
        }, 500);
      }
    }, 500);
  }

  /**
   * @memberof EstudianteComponent
   */
  exportar() {
    this.appService.export(this.authService.usuario, this.detallesestudiante, this.idtestEvaluado);
  }

  exportarResultado(testeval: any) {
    this.appService.export(this.authService.usuario, this.detallesestudiante, testeval.$key);
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  cancelarTest() {
    this.crearComponenteRespuestaPregunta('');
    this.btnmostrarloadingest.nativeElement.click();
    this.resultadocuest = [];
    this.resultadocuestcat = [];
    this.resultadopregunta = [];
    this.numero_pregunta = 0;
    this.puntajeerror = 0;
    this.calificar = false;
    this.testcompleto = false;
    this.preguntaopcional = false;
    this.resutadofinal = false;
    this.idtestEvaluado = null;

    if (this.subResultadoCategoria) {
      this.subResultadoCategoria.unsubscribe();
      this.resultadoCategoria = null;
    }

    if (this.subPregunta) {
      this.subPregunta.unsubscribe();
      this.pregunta = null;
    }

    if (this.subRespuesta) {
      this.subRespuesta.unsubscribe();
      this.respuesta = null;
    }

    if (this.subTipoSubTests) {
      this.subTipoSubTests.unsubscribe();
      this.tipoSubTests = null;
    }

    this.pregunta = null;
    this.stop();
    this.cerrarloading();
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  start() {
    this.segundo = 0;
    this.minuto = 0;
    this.hora = 0;
    this.decimi = 0;

    if (this.subRespuesta) {
      this.subRespuesta.unsubscribe();
      this.respuesta = null;
    }

    if (this.numero_pregunta <= this.numeropreguntas) {
      this.subPregunta = this.appService.getPregunta(this.test, this.numero_pregunta)
      .subscribe(pregunta => this.pregunta = pregunta);

      this.subRespuesta = this.appService.getPreguntaRespuesta(this.test, this.numero_pregunta)
      .subscribe(respuesta => this.respuesta = respuesta);

      this.subTipoSubTests = this.appService.getSubTest(this.test)
      .subscribe(subtests => this.tipoSubTests = subtests);

      this.crearComponenteRespuestaPregunta('');
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

  /**
   *
   * @memberof EstudianteComponent
   */
  wait() {
    clearInterval(this.intTiempo);
    this.intTiempo = null;
    this.btnguardarrespuesta.nativeElement.focus();
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  stop() {
    clearInterval(this.intTiempo);
    this.intTiempo = null;
    this.segundo = 0;
    this.minuto = 0;
    this.hora = 0;
  }

  /**
   *
   * @memberof EstudianteComponent
   */
  cerrarloading() {
    setTimeout(() => this.btncerrarloadingest.nativeElement.click(), 500);
  }
}
