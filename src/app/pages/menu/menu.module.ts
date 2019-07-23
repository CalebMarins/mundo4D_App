import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'classroom',
        loadChildren: '../classroom/classroom.module#ClassroomPageModule'
      },
      { 
        path: 'alunos', 
        loadChildren: '../alunos/alunos.module#AlunosPageModule' 
      },
      {
        path: 'perfil', 
        loadChildren: '../perfil/perfil.module#PerfilPageModule' 
      },
    ]
  },
  { path: '', loadChildren: '../perfil/perfil.module#PerfilPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
