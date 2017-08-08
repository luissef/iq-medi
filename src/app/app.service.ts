import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from './home/auth.service';

import { AngularFireAuth } from 'angularfire2/auth';

import { Usuario } from './modelos/usuario';
import { Estudiante } from './modelos/estudiante';

import * as firebase from 'firebase';

@Injectable()
export class AppService {
  mensaje: string;
  usuario: Usuario;
  estudiantes: FirebaseListObservable<any[]>;
  tests: FirebaseListObservable<any[]>;
  pregunta: FirebaseListObservable<any[]>;

  constructor(
    private df: AngularFireDatabase,
    private abfauth: AngularFireAuth,
    private authService: AuthService) { }

  setUsuario(usuario: Usuario) {
    this.df.database.ref('usuario/' + usuario.id).set({
      username: usuario.usuario,
      email: usuario.email,
      isactive: usuario.isactive
    });
  }

  setEstudiante(estudiante: Estudiante) {
    this.df.database.ref('estudiante_usuario/' + estudiante.usuario).child('estudiante').push({
      ci: estudiante.ci,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      fecha_nacimiento: estudiante.fecha_nacimiento,
      isactive: estudiante.isactive
    });
  }

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

  getEstudiantes(usuario: Usuario) {
    this.estudiantes = this.df.list('estudiante_usuario/' + usuario.id + '/estudiante') as FirebaseListObservable<any[]>;
    return this.estudiantes;
  }

  getTest(estudiante: Estudiante) {
    this.tests = this.df.list('test') as FirebaseListObservable<any[]>;
    return this.tests;
  }

  getPregunta(test: any, numero_pregunta: number) {
    this.pregunta = this.df.list('test/' + test.$key + '/pregunta', {
      query: {
        orderByChild: 'numero_pregunta',
        equalTo: numero_pregunta
      }
    }) as FirebaseListObservable<any[]>;
    return this.pregunta;
  }

  getEstudiantesFiltroCi(usuario: Usuario, ci: number) {
    this.estudiantes = this.df.list('estudiante_usuario/' + usuario.id + '/estudiante', {
      query: {
        orderByChild: 'ci',
        equalTo: ci
      }
    }) as FirebaseListObservable<any[]>;

    return this.estudiantes;
  }

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
  }

  updateEstudiante(estudiante: Estudiante) {
    this.estudiantes.update(estudiante.id, {
      ci: estudiante.ci,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      fecha_nacimiento: estudiante.fecha_nacimiento,
      isactive: estudiante.isactive
    });
  }

  deleteEstudiante(key: string) {
    this.estudiantes.remove(key);
  }
}
