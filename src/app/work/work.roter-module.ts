import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkComponent } from './work.component';

import { Authguard } from '../home/auth.guard';

import { SaludoComponent } from './saludo/saludo.component';
import { EstudianteComponent } from './estudiante/estudiante.component';

const homeRoutes: Routes = [
  { path: 'work',
  component: WorkComponent,
  canActivate: [Authguard],
  children : [
    { path: '', redirectTo: 'saludo', pathMatch: 'full' },
    { path: 'saludo', component: SaludoComponent },
    { path: 'persona', component: EstudianteComponent },
    { path: 'saludo/persona', component: EstudianteComponent }
  ]}
]

/**
 *
 * @export
 * @class WorkRoutingModule
 */
@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class WorkRoutingModule { }
