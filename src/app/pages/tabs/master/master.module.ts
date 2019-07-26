import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MasterPage } from './master.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MasterPage,
    children: [
      { path: 'avaliar', loadChildren: '../avaliar/avaliar.module#AvaliarPageModule' },
      { path: 'rx-aluno', loadChildren: '../rx-aluno/rx-aluno.module#RxAlunoPageModule' },
      { path: 'rx-aluno/:id', loadChildren: '../rx-aluno/rx-aluno.module#RxAlunoPageModule' },
      { path: 'recursos', loadChildren: '../recursos/recursos.module#RecursosPageModule' },
      { path: 'recursos/:id', loadChildren: '../recursos/recursos.module#RecursosPageModule' },
      { path: 'home', loadChildren: '../home/home.module#HomePageModule'},
      { path: 'home/:id', loadChildren: '../home/home.module#HomePageModule'},
      
    ]
  },{
    path:'',
    redirectTo: 'tabs/home',
    pathMatch:'full'
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MasterPage]
})
export class MasterPageModule {}
