import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { LmsComponent } from './lms/lms.component';
import { LmsCadastroComponent } from './lms-cadastro/lms-cadastro.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatSnackBarModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    TooltipModule,
    BsDropdownModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule
  ],
  declarations: [LmsComponent, LmsCadastroComponent],
  exports: [
    LmsComponent,
    LmsCadastroComponent
  ]
})
export class LmsModule { }
