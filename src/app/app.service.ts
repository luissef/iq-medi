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

  pushChildUltimoAcceso (usuario: Usuario) {
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
}
