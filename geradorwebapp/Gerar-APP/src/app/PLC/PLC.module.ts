import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

import { PlcCadastroComponent } from './plc-cadastro/plc-cadastro.component';
import { PlcPesquisaComponent } from './plc-pesquisa/plc-pesquisa.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    RouterModule,

    ReactiveFormsModule,
    ModalModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatInputModule,
    MatIconModule

  ],
  declarations: [
    PlcCadastroComponent,
    PlcPesquisaComponent
  ],
  exports: [
    PlcCadastroComponent,
    PlcPesquisaComponent
  ]
})
export class PLCModule { }
