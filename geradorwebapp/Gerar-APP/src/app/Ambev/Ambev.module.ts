import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
import {MatTabsModule} from '@angular/material/tabs';

import { AmbevCadastroComponent } from './ambev-cadastro/ambev-cadastro.component';
import { AmbevPesquisaComponent } from './ambev-pesquisa/ambev-pesquisa.component';


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
    MatIconModule,
    MatTabsModule
  ],
  declarations: [AmbevCadastroComponent, AmbevPesquisaComponent],
  exports: [AmbevCadastroComponent, AmbevPesquisaComponent]
})
export class AmbevModule { }
