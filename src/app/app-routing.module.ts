import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'master', loadChildren: './pages/tabs/master/master.module#MasterPageModule', canActivate: [AuthGuard]},
  { path: 'classroom', loadChildren: './pages/classroom/classroom.module#ClassroomPageModule' },
  { path: 'classroom/:id', loadChildren: './pages/classroom/classroom.module#ClassroomPageModule' },
  { path: 'alunos', loadChildren: './pages/alunos/alunos.module#AlunosPageModule' }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }