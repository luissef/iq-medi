import { Component, OnInit, OnDestroy} from '@angular/core';

import { AppService } from '../../app.service';
import { AuthService } from '../../home/auth.service';

import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html'
})
export class EstudianteComponent implements OnInit {
  estudiantes: any[];
  subEstudiantes: any;

  constructor(
    private appService: AppService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.subEstudiantes = this.appService.getEstudiantes(this.authService.usuario)
      .subscribe(estudiantes => this.estudiantes = estudiantes);
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subEstudiantes.unsubscribe();
  }
}
