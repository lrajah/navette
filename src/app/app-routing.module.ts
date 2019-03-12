import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTasksByProjectComponent } from './components/my-tasks-by-project/my-tasks-by-project.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './_guards/auth.service';
import { RegisterComponent } from './register/register/register.component';

const routes: Routes = [
  {
    path: 'mytasks',
    component: HomeComponent,
    canActivate: [AuthGuard] ,
    data: { title: 'Mes tâches' }
  },
  {
    path: 'myprojects',
    component: MyTasksByProjectComponent,
    canActivate: [AuthGuard] ,
    data: { title: 'Mes Projets' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Login' }
  },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
  // {
  //   path: 'resas',
  //   component: MyResaComponent,
  //   data: { title: 'Mes réservations' }
  // },
  // { path: '',
  //   redirectTo: '/mytasks',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
