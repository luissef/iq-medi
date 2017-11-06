import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from './home/auth.service';

import { AngularFireAuth } from 'angularfire2/auth';

import { Usuario } from './modelos/usuario';
import { Estudiante } from './modelos/estudiante';
import { Cuestionarioevaluado } from './modelos/cuestionarioevaluado';
import { Puntajecuestionario } from './modelos/puntajecuestionario';

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
  puntajeCategoria: FirebaseListObservable<any[]>;
  testCalificado: FirebaseListObservable<any[]>;

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
    );

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

  getResultadoCategoria(usuario: Usuario, estudiante: any, testid: String) {
    this.puntajeCategoria = this.df.list('estudiante_usuario/'
      + usuario.id + '/estudiante/'
      + estudiante.$key + '/testevaluado/'
      + testid + '/puntajecategoria') as FirebaseListObservable<any[]>;

    return this.puntajeCategoria;
  }

  getTestCalificado(usuario: Usuario, estudiante: any, testid: String) {
    this.testCalificado = this.df.list('estudiante_usuario/'
      + usuario.id + '/estudiante/'
      + estudiante.$key + '/testevaluado', {
        query: {
          limitToLast: 1
        }
      }) as FirebaseListObservable<any[]>;

    return this.testCalificado;
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
   * @param {string} tipo_pregunta
   * @param {number} meses
   * @param {number} puntaje
   * @param {*} test
   * @returns
   * @memberof AppService
   */
  getPuntosEquivalentes(tipo_pregunta: string, meses: number, puntaje: number, test: any) {
    const resultado = this.df.database.ref('test/' +
    test.$key + '/escala_equivalente/' + tipo_pregunta)
      .orderByChild('meses')
      .endAt(meses)
      .once('value')
      .then(function(snapshot) {

        // tslint:disable-next-line:prefer-const
        let pequi = 0;

        snapshot.forEach(function (childSnapshot) {
          const auxvalue = childSnapshot.val();
            if (auxvalue.puntos <= puntaje) {
              pequi = auxvalue.puntosequivalentes;
            }
          }
        );

        return pequi;
      }
    );

    return resultado;
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

    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:comment-format
    //let auxCabecera = this.df.database.ref('test/-KqMrJZ-UEASUXSbu-n8');

    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:comment-format
    //let auxCabecera = this.df.database.ref('test/-KqMrQPAJJ2H5Q1Pz01v');
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

  /**
   *
   * @param {number} mr
   * @param {number} puntaje
   * @param {Cuestionarioevaluado[]} resultadopregunta
   * @param {Puntajecuestionario[]} resultadocuest
   * @param {Puntajecuestionario[]} resultadocuestcat
   * @param {*} test
   * @param {*} estudiante
   * @param {Usuario} usuario
   * @param {String} fecha
   * @returns
   * @memberof AppService
   */
  calificarTestZazzo (
    mr: number,
    puntaje: number,
    resultadopregunta: Cuestionarioevaluado[],
    resultadocuest: Puntajecuestionario[],
    resultadocuestcat: Puntajecuestionario[],
    test: any,
    estudiante: any,
    usuario: Usuario,
    fecha: String
  ) {
    // tslint:disable-next-line:prefer-const
    let auxdf = this.df;
    let cicalculado = 0;
    let idrest = '';

    const resultado = this.df.database.ref('test/' +
      test.$key +
      '/escala')
      .orderByChild('puntos')
      .limitToLast(1)
      .equalTo(puntaje)
      .once('value')
      .then(function(snapshot) {

        snapshot.forEach(function (childSnapshot) {
            const auxvalue = childSnapshot.val();

            cicalculado = Math.round((auxvalue.meses / mr) * 100);

            auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
              .child('edadmental')
              .set(auxvalue.meses);

            auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
              .child('cicalculado')
              .set(cicalculado);

            // tslint:disable-next-line:prefer-const
            let tsest = auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
              .child('testevaluado').push({
                fecha: fecha,
                puntajetotal: puntaje
              }
            );

            tsest.child('edadmental').set(auxvalue.meses);
            tsest.child('ci').set(cicalculado);

            for (let k = 0; k < resultadopregunta.length; k++) {
              tsest.child('respuestas').push({
                numero_pregunta: resultadopregunta[k].numeropregunta,
                puntaje: resultadopregunta[k].puntaje,
                tiempo: resultadopregunta[k].tiempo
              });
            }

            for (let k = 0; k < resultadocuest.length; k++) {
              tsest.child('puntajetipopregunta').push({
                tipopregunta: resultadocuest[k].tipopregunta,
                puntaje: resultadocuest[k].puntaje
              });
            }

            for (let k = 0; k < resultadocuestcat.length; k++) {
              tsest.child('puntajecategoria').push({
                categoria: resultadocuestcat[k].categoria,
                puntaje: resultadocuestcat[k].puntaje
              });
            }

            auxdf.database.ref('nivelcoeficiente')
              .orderByChild('ci')
              .endAt(cicalculado)
              .limitToLast(1)
              .once('value')
              .then(function(auxsnapshot) {
                auxsnapshot.forEach(function (auxchildSnapshot) {
                  const auxvaluechild = auxchildSnapshot.val();

                  auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
                    .child('nivelcognitivo')
                    .set(auxvaluechild.estado);

                    tsest.child('nivelcognitivo').set(auxvaluechild.estado);
                }
                );
              }
            );
            idrest = tsest.key;
          }
        );

        return idrest;
      }
    );

    if (puntaje < 9) {
      auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
      .child('cicalculado')
      .set(cicalculado);

      // tslint:disable-next-line:prefer-const
      let tsest = this.df.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
        .child('testevaluado').push({
          fecha: fecha,
          puntajetotal: puntaje
        }
      );

      tsest.child('ci').set(0);

      for (let k = 0; k < resultadopregunta.length; k++) {
        tsest.child('respuestas').push({
          numero_pregunta: resultadopregunta[k].numeropregunta,
          puntaje: resultadopregunta[k].puntaje,
          tiempo: resultadopregunta[k].tiempo
        });
      }

      for (let k = 0; k < resultadocuest.length; k++) {
        tsest.child('puntajetipopregunta').push({
          tipopregunta: resultadocuest[k].tipopregunta,
          puntaje: resultadocuest[k].puntaje,
        });
      }

      for (let k = 0; k < resultadocuestcat.length; k++) {
        tsest.child('puntajecategoria').push({
          categoria: resultadocuestcat[k].categoria,
          puntaje: resultadocuestcat[k].puntaje
        });
      }

      idrest = tsest.key;

      this.df.database.ref('nivelcoeficiente')
        .orderByChild('ci')
        .endAt(cicalculado)
        .once('value')
        .then(function(auxsnapshot) {
          auxsnapshot.forEach(function (auxchildSnapshot) {
            const auxvaluechild = auxchildSnapshot.val();

            auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
              .child('nivelcognitivo')
              .set(auxvaluechild.estado);

            auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
              .child('edadmental')
              .set(null);

            tsest.child('nivelcognitivo').set(auxvaluechild.estado);

            return idrest;
          }
        );
      }
      );
    }

    return resultado;
  }

  /**
   *
   * @param {number} mr
   * @param {number} puntaje
   * @param {Cuestionarioevaluado[]} resultadopregunta
   * @param {Puntajecuestionario[]} resultadocuest
   * @param {Puntajecuestionario[]} resultadocuestcat
   * @param {*} test
   * @param {*} estudiante
   * @param {Usuario} usuario
   * @param {String} fecha
   * @returns
   * @memberof AppService
   */
  calificarTestWisc (
    mr: number,
    puntaje: number,
    resultadopregunta: Cuestionarioevaluado[],
    resultadocuest: Puntajecuestionario[],
    resultadocuestcat: Puntajecuestionario[],
    test: any,
    estudiante: any,
    usuario: Usuario,
    fecha: String
  ) {
    // tslint:disable-next-line:prefer-const
    let auxdf = this.df;
    let edadmental = 0;
    let idrest = '';

    const resultado = this.df.database.ref('test/'
      + test.$key
      + '/escala')
      .orderByChild('puntos')
      .equalTo(puntaje)
      .once('value')
      .then(function(snapshot) {

        snapshot.forEach(function (childSnapshot) {
            const auxvalue = childSnapshot.val();

            edadmental = Math.round((auxvalue.ci / 100) * mr);

            auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
              .child('edadmental')
              .set(edadmental);

            auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
              .child('cicalculado')
              .set(auxvalue.ci);

              // tslint:disable-next-line:prefer-const
              let tsest = auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
                .child('testevaluado').push({
                  fecha: fecha,
                  puntajetotal: puntaje
                }
              );

              tsest.child('edadmental').set(edadmental);
              tsest.child('ci').set(auxvalue.ci);

              for (let k = 0; k < resultadopregunta.length; k++) {
                tsest.child('respuestas').push({
                  numero_pregunta: resultadopregunta[k].numeropregunta,
                  puntaje: resultadopregunta[k].puntaje,
                  tiempo: resultadopregunta[k].tiempo
                });
              }

              for (let k = 0; k < resultadocuest.length; k++) {
                tsest.child('puntajetipopregunta').push({
                  tipopregunta: resultadocuest[k].tipopregunta,
                  puntaje: resultadocuest[k].puntaje,
                  puntosequivalentes: resultadocuest[k].puntosequivalentes
                });
              }

              for (let k = 0; k < resultadocuestcat.length; k++) {
                tsest.child('puntajecategoria').push({
                  categoria: resultadocuestcat[k].categoria,
                  puntaje: resultadocuestcat[k].puntaje
                });
              }

              auxdf.database.ref('nivelcoeficiente')
                .orderByChild('ci')
                .endAt(auxvalue.ci)
                .once('value')
                .then(function(auxsnapshot) {
                auxsnapshot.forEach(function (auxchildSnapshot) {
                  const auxvaluechild = auxchildSnapshot.val();

                  auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
                    .child('nivelcognitivo')
                    .set(auxvaluechild.estado);

                    tsest.child('nivelcognitivo').set(auxvaluechild.estado);
                }
                );
              }
            );
            idrest = tsest.key;
          }
        );
        return idrest;
      }
    );

    if (puntaje < 10) {
      auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
      .child('cicalculado')
      .set(puntaje);

      // tslint:disable-next-line:prefer-const
      let tsest = this.df.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
        .child('testevaluado').push({
          fecha: fecha,
          puntajetotal: puntaje
        }
      );

      tsest.child('ci').set(0);

      for (let k = 0; k < resultadopregunta.length; k++) {
        tsest.child('respuestas').push({
          numero_pregunta: resultadopregunta[k].numeropregunta,
          puntaje: resultadopregunta[k].puntaje,
          tiempo: resultadopregunta[k].tiempo
        });
      }

      for (let k = 0; k < resultadocuest.length; k++) {
        tsest.child('puntajetipopregunta').push({
          tipopregunta: resultadocuest[k].tipopregunta,
          puntaje: resultadocuest[k].puntaje,
        });
      }

      for (let k = 0; k < resultadocuestcat.length; k++) {
        tsest.child('puntajecategoria').push({
          categoria: resultadocuestcat[k].categoria,
          puntaje: resultadocuestcat[k].puntaje
        });
      }

      idrest = tsest.key;

      this.df.database.ref('nivelcoeficiente')
        .orderByChild('ci')
        .endAt(puntaje)
        .once('value')
        .then(function(auxsnapshot) {
          auxsnapshot.forEach(function (auxchildSnapshot) {
            const auxvaluechild = auxchildSnapshot.val();

            auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
              .child('nivelcognitivo')
              .set(auxvaluechild.estado);

            auxdf.database.ref('estudiante_usuario/' + usuario.id + '/estudiante/' + estudiante.$key)
              .child('edadmental')
              .set(null);

            tsest.child('nivelcognitivo').set(auxvaluechild.estado);

            return idrest;
          }
        );
      }
      );
    }

    return resultado;
  }
}
