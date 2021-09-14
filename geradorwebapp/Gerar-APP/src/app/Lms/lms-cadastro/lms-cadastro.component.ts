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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lms-cadastro',
  templateUrl: './lms-cadastro.component.html',
  styleUrls: ['./lms-cadastro.component.css']
})
export class LmsCadastroComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'planta', 'linha', 'plantaReduzida', 'opcoes'
  ];


  registerForm: FormGroup;
  modoSalvar = 'post';

  dataSource = new MatTableDataSource();

  tipoVariaveis: TipoVariavel[];

  configuracoes: Configuracao[];
  configuracoesFiltradas: Configuracao[];

  lms: LMS;
  lmSs: LMS;

  templateConfig: any;

  tagLMSs = {
    abrevPlanta: '',
    linhas: '',
    abrevMaq: '',
    nMaq: '',
    sufiTAG: ''
  };
  tagOPC = {
    formTag: ''
  };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tvService: TVariaveisService,
    private configuracaoService: ConfiguracoesService,
    private lmsService: LMSsService,
    private route: Router,
    private router: ActivatedRoute
  ) { this.route = route; }

  ngOnInit() {

    const idLms = +this.router.snapshot.paramMap.get('id');

    if (idLms === 0) {
      this.modoSalvar = 'post';
    } else {
      this.carregarLMS(idLms);
      this.modoSalvar = 'put';
    }
    this.validation();
    this.getTV();
    this.getConfiguracao();
  }

  carregarLMS(id: number) {
    this.lmsService.getLMSById(id).subscribe(
      (_lms: LMS) => {
        this.lmSs = _lms;
       this.registerForm.patchValue(_lms);
       this.getConfiguracaoById(_lms.configuracaoId);
      }
    );
  }
  getConfiguracaoById(id: number) {
    this.configuracaoService.getConfiguracaoById(id).subscribe(
      (_cfgs: Configuracao) => {
        this.registerForm.get('planta').setValue(_cfgs.planta);
        this.registerForm.get('linha').setValue(_cfgs.linha);
        this.registerForm.get('sigla').setValue(_cfgs.plantaReduzida);
      },
      error => {
        console.log(error);
      }
    );

  }

  getConfiguracao() {
    this.configuracaoService.getAllConfiguracao().subscribe(
      (_configuracoes: Configuracao[]) => {
        this.configuracoes = _configuracoes;
        this.configuracoesFiltradas = this.configuracoes;
        this.dataSource = new MatTableDataSource(this.configuracoesFiltradas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
  }
  getTV() {
    this.tvService.getAllTV().subscribe(
      (_TVS: TipoVariavel[]) => {
        this.tipoVariaveis = _TVS;
      }
    );
  }
  novoLMS(template) {
    this.openModal(template);
  }
  openModal(template: any) {
    this.registerForm.reset();
    this.templateConfig = template;
    template.show();
  }
  openModalCFG(template: any) {
    //this.registerForm.reset();
    this.templateConfig = template;
    template.show();
  }
  dadosSelecionadoConf(itemSelecionado: Configuracao) {
    this.registerForm.get('configuracaoId').setValue(itemSelecionado.id);
    this.registerForm.get('planta').setValue(itemSelecionado.planta);
    this.registerForm.get('linha').setValue(itemSelecionado.linha);
    this.registerForm.get('sigla').setValue(itemSelecionado.plantaReduzida);
    this.templateConfig.hide();
  }
  salvarAlteracao() {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.lms = Object.assign({}, this.registerForm.value);
        this.lmsService.postLMS(this.lms).subscribe(
          (novoLMS: LMS) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novoLMS);
          }, error => {
            this.toastr.error('Erro ao excluir', 'Gerador');
          }
        );
      } else {
        this.lms = Object.assign({id: this.lmSs.id}, this.registerForm.value);
        this.lmsService.putLMS(this.lms).subscribe(
          (novoLMS: LMS) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novoLMS);
          }, error => {
            this.toastr.error('Erro ao efetuar operação', 'Gerador');
          }
        );
      }
    }
  }
  openDialog(lms: LMS) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '550px',
      data: {
        message: 'Deseja aproveitar os dados para um novo lançamento?',
        buttonText: {
          new: 'Sim',
          edit: 'Não'
        }
      }
    });

    const snack = this.snackBar.open('Sim: Aproveita os dados e salva como um novo. Não: Volta para tela de consulta');
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'new') {
        snack.dismiss();
        this.snackBar.open('Editar salvando como novo', 'Fechar', {
          duration: 2000,
        });
        this.modoSalvar = 'post';
        this.lms = lms;
        this.registerForm.patchValue(lms);
      } else if (result === 'edit') {
        this.registerForm.reset();
        snack.dismiss();
        this.snackBar.open('Voltando para consulta', 'Fechar', {
          duration: 1000,
        });
        this.route.navigate(['/', 'lmsview']);
      }
    });
  }
  validTagOPC(event: any) {

    const value = event.target.options[event.target.options.selectedIndex].text;

    this.registerForm.get('tagOP').setValue(
      'L' + this.tagLMSs.linhas + '_' + this.tagLMSs.abrevMaq + this.tagLMSs.linhas +
        '00' + this.tagLMSs.nMaq + '.' + this.tagLMSs.abrevMaq + this.tagLMSs.linhas +
        '00' + this.tagLMSs.nMaq + '.LMS.' + this.tagLMSs.abrevMaq + this.tagLMSs.linhas +
        '00' + this.tagLMSs.nMaq + '_' + value
    );
  }
  validTAGLMS() {

    this.registerForm.get('tagLMS').setValue(
      this.tagLMSs.abrevPlanta + '.L' + this.tagLMSs.linhas + '.' +
        this.tagLMSs.abrevMaq + this.tagLMSs.nMaq + '.OPC.' + this.tagLMSs.sufiTAG
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  validation() {
    this.registerForm = this.fb.group({
      configuracaoId: ['', [Validators.required]],
      planta: ['', [Validators.required]],
      linha: ['', [Validators.required]],
      sigla: ['', [Validators.required]],
      numMaquina: [''],
      abrevMaquina: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      tagOP: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      sufixTag: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      tagLMS: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      tipoVariavelId: ['', [Validators.required]],
      tipoVariavelIdFT: ['', [Validators.required]]
    });
  }

}
