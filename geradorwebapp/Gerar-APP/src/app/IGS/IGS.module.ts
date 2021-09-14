import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatSnackBarModule } from '@angular/material';
import { IgsCadastroComponent } from './igs-cadastro/igs-cadastro.component';
import { IgsViewComponent } from './igs-view/igs-view.component';
import { RouterModule } from '@angular/router';


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
    MatTabsModule,
    RouterModule
  ],
  declarations: [IgsViewComponent, IgsCadastroComponent],
  exports: [IgsViewComponent, IgsCadastroComponent],
  entryComponents: [
 ]

})
export class IGSModule { }
