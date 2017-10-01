import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { WorkComponent } from './work.component';
import { WorkRoutingModule } from './work.roter-module';
import { Authguard } from '../home/auth.guard';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { SaludoComponent } from './saludo/saludo.component';

/**
 *
 * @export
 * @class WorkModule
 */
@NgModule({
  declarations: [
    WorkComponent,
    EstudianteComponent,
    SaludoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    WorkRoutingModule
  ],
  exports: [
    WorkComponent
  ],
  providers: [Authguard]
})

export class WorkModule { }
