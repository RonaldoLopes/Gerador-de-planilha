import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracaoComponent } from './Configuracao/configuracao/configuracao.component';
import { PlcCadastroComponent } from './PLC/plc-cadastro/plc-cadastro.component';
import { PlcPesquisaComponent } from './PLC/plc-pesquisa/plc-pesquisa.component';
import { UmComponent } from './UM/um/um.component';
import { VariavelComponent } from './Variavel/variavel/variavel.component';
import { AmbevCadastroComponent } from './Ambev/ambev-cadastro/ambev-cadastro.component';
import { AmbevPesquisaComponent } from './Ambev/ambev-pesquisa/ambev-pesquisa.component';
import { HistorianCadastroComponent } from './Historian/historian-cadastro/historian-cadastro.component';
import { HistorianPesquisaComponent } from './Historian/historian-pesquisa/historian-pesquisa.component';
import { LmsComponent } from './Lms/lms/lms.component';
import { LmsCadastroComponent } from './Lms/lms-cadastro/lms-cadastro.component';
import { PlanilhasComponent } from './Planilhas/Planilhas.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { IgsCadastroComponent } from './IGS/igs-cadastro/igs-cadastro.component';
import { IgsViewComponent } from './IGS/igs-view/igs-view.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent }
      //{ path: 'registration', component: RegistrationComponent }
    ]
  },
  { path: 'configuracoes', component: ConfiguracaoComponent, canActivate: [AuthGuard] },
  { path: 'plcnew', component: PlcCadastroComponent, canActivate: [AuthGuard] },
  { path: 'plcview', component: PlcPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'plc/:id/edit', component: PlcCadastroComponent, canActivate: [AuthGuard] },
  { path: 'abvnew', component: AmbevCadastroComponent, canActivate: [AuthGuard] },
  { path: 'abvview', component: AmbevPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'abv/:id/edit', component: AmbevCadastroComponent, canActivate: [AuthGuard] },
  { path: 'histnew', component: HistorianCadastroComponent, canActivate: [AuthGuard] },
  { path: 'histview', component: HistorianPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'hist/:id/edit', component: HistorianCadastroComponent, canActivate: [AuthGuard] },
  { path: 'um', component: UmComponent, canActivate: [AuthGuard] },
  { path: 'egu', component: VariavelComponent, canActivate: [AuthGuard] },
  { path: 'lmsview', component: LmsComponent, canActivate: [AuthGuard] },
  { path: 'lmsnew', component: LmsCadastroComponent, canActivate: [AuthGuard] },
  { path: 'lms/:id/edit', component: LmsCadastroComponent, canActivate: [AuthGuard] },
  { path: 'plan', component: PlanilhasComponent, canActivate: [AuthGuard] },
  { path: 'igsview', component: IgsViewComponent, canActivate: [AuthGuard]},
  { path: 'igsnew', component: IgsCadastroComponent, canActivate: [AuthGuard]},
  { path: 'igs/:id/edit', component: IgsCadastroComponent, canActivate: [AuthGuard] },
  { path: 'userRegistration', component: RegistrationComponent, canActivate: [AuthGuard] }
  //{ path: '', redirectTo: '/user/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
