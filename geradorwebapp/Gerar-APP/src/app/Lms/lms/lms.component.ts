import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ToastrService } from 'ngx-toastr';
import { Configuracao } from 'src/app/_models/Configuracao';
import { ConfiguracoesService } from 'src/app/_services/Configuracoes.service';

import { ConfirmationDialogComponent } from 'src/app/ConfirmationDialog/ConfirmationDialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TipoVariavel } from 'src/app/_models/TipoVariavel';
import { TVariaveisService } from 'src/app/_services/TVariaveis.service';
import { LMS } from 'src/app/_models/LMS';
import { LMSsService } from 'src/app/_services/LMSs.service';

@Component({
  selector: 'app-lms',
  templateUrl: './lms.component.html',
  styleUrls: ['./lms.component.css']
})
export class LmsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'abrevMaquina', 'numMaquina', 'tagOP', 'sufixTag', 'tagLMS',
    'configuracaoId',  'tipoVariavelId',
    'tipoVariavelIdFT', 'opcoes'
  ];

  registerForm: FormGroup;
  LmSs: LMS[];
  lms: LMS;
  bodyDeletarLMS = '';
  dataSource = new MatTableDataSource();

  constructor(
    private lmsService: LMSsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getLMS();
  }
  getLMS() {
    this.lmsService.getAllLMS().subscribe(
      (_LMS: LMS[]) => {
        //this.LmSs = 
        this.dataSource = new MatTableDataSource(_LMS);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      }
    );
  }
  excluirData(lms: LMS, template: any) {
    this.openModal(template);
    this.lms = lms;
    this.bodyDeletarLMS = `Tem certeza que deseja excluir: Código: ${this.lms.id}`;
  }
  confirmDelete(template: any) {
    this.lmsService.deleteLMS(this.lms.id).subscribe(
      () => {
        template.hide();
        this.getLMS();
        this.toastr.success('Gerador', 'Excluído com sucesso');
      }, error => {
        this.toastr.error('Gerador', 'Erro ao excluir');
        console.log(error);
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openModal(template: any) {
    template.show();
  }
}
