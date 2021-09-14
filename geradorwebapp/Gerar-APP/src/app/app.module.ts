import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ConfiguracaoModule } from './Configuracao/Configuracao.module';
import { UMModule } from './UM/UM.module';
import { VariavelModule } from './Variavel/Variavel.module';
import { PLCModule } from './PLC/PLC.module';
import { AmbevModule } from './Ambev/Ambev.module';
import { HistorianModule } from './Historian/Historian.module';
import { LmsModule } from './Lms/Lms.module';
import { PlanilhasModule } from './Planilhas/Planilhas.module';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmbevsService } from './_services/Ambevs.service';
import { ConfiguracoesService } from './_services/Configuracoes.service';
import { ExcelService } from './_services/Excel.service';
import { HistoriansService } from './_services/Historians.service';
import { LMSsService } from './_services/LMSs.service';
import { PLCService } from './_services/PLC.service';
import { TVariaveisService } from './_services/TVariaveis.service';
import { UMsService } from './_services/UMs.service';
import { VisitorsServiceService } from './_services/visitorsService.service';

import { AuthInterceptor } from './auth/auth.interceptor';
import {  MatProgressSpinnerModule } from '@angular/material';
import { IGSModule } from './IGS/IGS.module';
import { RegistrationModule } from './user/registration/registration.module';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      UserComponent,
      LoginComponent,
      DashboardComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      ConfiguracaoModule,
      UMModule,
      VariavelModule,
      PLCModule,
      AmbevModule,
      HistorianModule,
      LmsModule,
      PlanilhasModule,
      RegistrationModule,
      IGSModule,
      TooltipModule.forRoot(),
      ToastrModule.forRoot({
         timeOut: 5000,
         preventDuplicates: true
      })
   ],
   providers: [
      AmbevsService,
      ConfiguracoesService,
      ExcelService,
      HistoriansService,
      LMSsService,
      PLCService,
      TVariaveisService,
      VisitorsServiceService,
      UMsService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
