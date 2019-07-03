import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RxAlunoPage } from './rx-aluno.page';

const routes: Routes = [
  {
    path: '',
    component: RxAlunoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RxAlunoPage]
})
export class RxAlunoPageModule {}
