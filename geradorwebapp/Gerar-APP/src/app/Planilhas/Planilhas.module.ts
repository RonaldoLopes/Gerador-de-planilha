import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlanilhasComponent } from './Planilhas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';

import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
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
    MatTabsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule
  ],
  declarations: [PlanilhasComponent],
  exports: [PlanilhasComponent]
})
export class PlanilhasModule { }
