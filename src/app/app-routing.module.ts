import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'master', loadChildren: './pages/tabs/master/master.module#MasterPageModule', canActivate: [AuthGuard]},
  { path: 'classroom', loadChildren: './pages/classroom/classroom.module#ClassroomPageModule', canActivate: [AuthGuard] },
  { path: 'classroom/:id', loadChildren: './pages/classroom/classroom.module#ClassroomPageModule', canActivate: [AuthGuard]},
  { path: 'alunos', loadChildren: './pages/alunos/alunos.module#AlunosPageModule', canActivate: [AuthGuard]},
  { path: 'novo-aluno', loadChildren: './pages/novo-aluno/novo-aluno.module#NovoAlunoPageModule', canActivate: [AuthGuard] },
  { path: 'novo-aluno/:id', loadChildren: './pages/novo-aluno/novo-aluno.module#NovoAlunoPageModule', canActivate: [AuthGuard] },
  {path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule', canActivate: [AuthGuard] },
  { path: 'edit-perfil', loadChildren: './pages/edit-perfil/edit-perfil.module#EditPerfilPageModule' }



  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }