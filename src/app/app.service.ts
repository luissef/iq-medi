import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from './home/auth.service';

import { AngularFireAuth } from 'angularfire2/auth';

import { Usuario } from './modelos/usuario';
import { Estudiante } from './modelos/estudiante';

import * as firebase from 'firebase';

/**
 *
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
  mensaje: string;
  usuario: Usuario;
  estudiantes: FirebaseListObservable<any[]>;
  tests: FirebaseListObservable<any[]>;
  subtests: FirebaseListObservable<any[]>;
  pregunta: FirebaseListObservable<any[]>;
  respuesta: FirebaseListObservable<any[]>;
  material: FirebaseListObservable<any[]>;

  constructor(
    private df: AngularFireDatabase,
    private abfauth: AngularFireAuth,
    private authService: AuthService) { }

  /**
   *
   * @param {Usuario} usuario
   * @memberof AppService
   */
  setUsuario(usuario: Usuario) {
    this.df.database.ref('usuario/' + usuario.id).set({
      username: usuario.usuario,
      email: usuario.email,
      isactive: usuario.isactive
    });
  }

  /**
   *
   * @param {Estudiante} estudiante
   * @memberof AppService
   */
  setEstudiante(estudiante: Estudiante) {
    this.df.database.ref('estudiante_usuario/' + estudiante.usuario).child('estudiante').push({
      ci: estudiante.ci,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      fecha_nacimiento: estudiante.fecha_nacimiento,
      isactive: estudiante.isactive
    });
  }

  /**
   *
   * @param {Usuario} usuario
   * @returns
   * @memberof AppService
   */
  getUsuario (usuario: Usuario) {
    const resultado = this.df.database.ref('usuario').orderByChild('email').equalTo(usuario.email).once('value')
      .then(function(snapshot) {
        snapshot.forEach(function (childSnapshot) {
            const auxvalue = childSnapshot.val();
            usuario.usuario = auxvalue.username;
            usuario.isactive = auxvalue.isactive;
          }
        );
        return usuario;
      }
    )

    return resultado;
  }

  /**
   *
   * @param {Usuario} usuario
   * @returns
   * @memberof AppService
   */
  getEstudiantes(usuario: Usuario) {
    this.estudiantes = this.df.list('estudiante_usuario/' + usuario.id + '/estudiante') as FirebaseListObservable<any[]>;
    return this.estudiantes;
  }

  /**
   *
   * @param {Estudiante} estudiante
   * @returns
   * @memberof AppService
   */
  getTest(estudiante: Estudiante) {
    this.tests = this.df.list('test') as FirebaseListObservable<any[]>;
    return this.tests;
  }

  /**
   *
   * @param {*} test
   * @returns
   * @memberof AppService
   */
  getTestMateriales(test: any) {
    this.material = this.df.list('test/' + test.$key + '/material') as FirebaseListObservable<any[]>;
    return this.material;
  }

  /**
   *
   * @param {*} test
   * @returns
   * @memberof AppService
   */
  getSubTest(test: any) {
    this.subtests = this.df.list('test/' + test.$key + '/subtest', {
      query: {
        orderByChild: 'tipo'
      }
    }) as FirebaseListObservable<any[]>;
    return this.subtests;
  }

  /**
   *
   * @param {*} test
   * @param {number} numero_pregunta
   * @returns
   * @memberof AppService
   */
  getPregunta(test: any, numero_pregunta: number) {
    this.pregunta = this.df.list('test/' + test.$key + '/pregunta', {
      query: {
        orderByChild: 'numero_pregunta',
        equalTo: numero_pregunta
      }
    }) as FirebaseListObservable<any[]>;
    return this.pregunta;
  }

  /**
   *
   * @param {*} test
   * @param {number} numero_pregunta
   * @returns
   * @memberof AppService
   */
  getPreguntaRespuesta(test: any, numero_pregunta: number) {
    this.respuesta = this.df.list('test/' + test.$key + '/respuesta', {
      query: {
        orderByChild: 'numero_pregunta',
        equalTo: numero_pregunta
      }
    }) as FirebaseListObservable<any[]>;
    return this.respuesta;
  }

  /**
   *
   * @param {Usuario} usuario
   * @param {number} ci
   * @returns
   * @memberof AppService
   */
  getEstudiantesFiltroCi(usuario: Usuario, ci: number) {
    this.estudiantes = this.df.list('estudiante_usuario/' + usuario.id + '/estudiante', {
      query: {
        orderByChild: 'ci',
        equalTo: ci
      }
    }) as FirebaseListObservable<any[]>;

    return this.estudiantes;
  }

  /**
   *
   * @param {Usuario} usuario
   * @param {string} nombres
   * @returns
   * @memberof AppService
   */
  getEstudiantesFiltroNombres(usuario: Usuario, nombres: string) {
    this.estudiantes = this.df.list('estudiante_usuario/' + usuario.id + '/estudiante', {
      query: {
        orderByChild: 'nombres',
        // tslint:disable-next-line:radix
        equalTo: nombres
      }
    }) as FirebaseListObservable<any[]>;

    return this.estudiantes;
  }

  /**
   *
   * @param {Usuario} usuario
   * @param {string} apellidos
   * @returns
   * @memberof AppService
   */
  getEstudiantesFiltroApellidos(usuario: Usuario, apellidos: string) {
    this.estudiantes = this.df.list('estudiante_usuario/' + usuario.id + '/estudiante', {
      query: {
        orderByChild: 'apellidos',
        // tslint:disable-next-line:radix
        equalTo: apellidos
      }
    }) as FirebaseListObservable<any[]>;

    return this.estudiantes;
  }

  /**
   *
   * @param {Usuario} usuario
   * @memberof AppService
   */
  pushChildUltimoAcceso(usuario: Usuario) {
    // tslint:disable-next-line:prefer-const
    /*let auxFecha = new Date();
    this.df.database.ref('usuario/' + usuario.id).child('ultimoacceso').push({
      fecha: auxFecha.toString()
    });*/

    /*this.df.database.ref('/').child('test').push({
      nombre: 'WISC III',
      isactive: usuario.isactive
    });*/

    // tslint:disable-next-line:comment-format
    // tslint:disable-next-line:prefer-const
    // let auxCabecera = this.df.database.ref('test/-KqMrJZ-UEASUXSbu-n8');

    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:comment-format
    const auxCabecera = this.df.database.ref('test/-KqMrQPAJJ2H5Q1Pz01v')
  }

  /**
   *
   * @param {Estudiante} estudiante
   * @memberof AppService
   */
  updateEstudiante(estudiante: Estudiante) {
    this.estudiantes.update(estudiante.id, {
      ci: estudiante.ci,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      fecha_nacimiento: estudiante.fecha_nacimiento,
      isactive: estudiante.isactive
    });
  }

  /**
   *
   * @param {string} key
   * @memberof AppService
   */
  deleteEstudiante(key: string) {
    this.estudiantes.remove(key);
  }
}
