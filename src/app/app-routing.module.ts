import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { NormalGuard } from './guards/normal..guard';
import { AdminGuard } from './guards/Admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ViewCategoriasComponent } from './pages/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './pages/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './pages/view-examenes/view-examenes.component';
import { AddExameneComponent } from './pages/add-examene/add-examene.component';
import { ActualizarExamenComponent } from './pages/actualizar-examen/actualizar-examen.component';
import { ViewExamenPreguntasComponent } from './pages/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './pages/add-pregunta/add-pregunta.component';
import { ActualizarPreguntaComponent } from './pages/actualizar-pregunta/actualizar-pregunta.component';
import { LoadExamenComponent } from './pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'categorias',
        component: ViewCategoriasComponent,
      },
      {
        path: 'add-categoria',
        component: AddCategoriaComponent,
      },
      {
        path: 'examenes',
        component: ViewExamenesComponent,
      },
      {
        path: 'add-examene',
        component: AddExameneComponent,
      },
      {
        path: 'examen/:exameneId',
        component: ActualizarExamenComponent,
      },
      {
        path: 'ver-preguntas/:exameneId/:titulo',
        component: ViewExamenPreguntasComponent,
      },
      {
        path: 'add-pregunta/:exameneId/:titulo',
        component: AddPreguntaComponent,
      },
      {
        path: 'actualizar-pregunta/:preguntaId',
        component: ActualizarPreguntaComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: ':catId',
        component: LoadExamenComponent,
      },
      {
        path: 'instrucciones/:exameneId',
        component: InstruccionesComponent,
      },
    ],
  },
  {
    path: 'start/:exameneId',
    component: StartComponent,
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
