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

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css'],
})
export class ConfiguracaoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'planta', 'linha', 'descLinha', 'servidor', 'plantaReduzida', 'opcoes'
  ];

  tipo: string;
  registerForm: FormGroup;
  modoSalvar = 'post';
  CFGS: Configuracao[];
  cf: Configuracao;
  bodyDeletarCFG = '';
  cfgsFiltradas: any[] = [];
  dataSource = new MatTableDataSource();

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
  }

  ngOnInit() {
    this.validation();
    this.getCFG();
  }
  constructor(
    private cfgService: ConfiguracoesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  novaCFG(template) {
    this.openModal(template);
  }
  excluirCFG(cfg: Configuracao, template: any) {
    this.openModal(template);
    this.cf = cfg;
    this.bodyDeletarCFG = `Tem certeza que deseja excluir: ${cfg.planta}, Código: ${cfg.id}`;
  }

  editarCFG(cfg: Configuracao, template: any) {
    this.openDialog(cfg, template);
    //this.modoSalvar = 'put';
    //this.openModal(template);
    //this.cf = cfg;
    //this.registerForm.patchValue(cfg);
  }

  confirmeDelete(template: any) {
    this.cfgService.deleteConfiguracao(this.cf.id).subscribe(
      () => {
        template.hide();
        this.getCFG();
        this.toastr.success('Gerador', 'Excluído com sucesso');
      }, error => {
        this.toastr.error('Gerador', 'Erro ao excluir');
      }
    );
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.cf = Object.assign({}, this.registerForm.value);
        this.cfgService.postConfiguracao(this.cf).subscribe (
          (novaCFG: Configuracao) => {
            template.hide();
            this.getCFG();
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.modoSalvar = 'post';
          }, error => {
            this.toastr.error('Algo não está certo', 'Gerador');
          }
        );
      } else {
        this.cf = Object.assign({id: this.cf.id}, this.registerForm.value);
        this.cfgService.putConfiguracao(this.cf).subscribe(
          () => {
            template.hide();
            this.getCFG();
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.modoSalvar = 'post';
          }, error => {
            this.toastr.error('Algo não está certo', 'Gerador');
          }
        );
      }
    }
  }

  getCFG() {
    this.cfgService.getAllConfiguracao().subscribe (
      (_cfgs: Configuracao[]) => {
        this.CFGS = _cfgs;
        this.cfgsFiltradas = this.CFGS;
        this.dataSource = new MatTableDataSource(this.CFGS);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.toastr.error('Algo não está certo ' + error, 'Gerador');
      }
    );
  }
  validation() {
    this.registerForm = this.fb.group({
      planta: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      linha: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      plantaReduzida: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      servidor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      descLinha: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]]
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  openDialog(cfg: Configuracao, template: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '550px',
      data: {
        message: 'Escolha entre as opções abaixo',
        buttonText: {
          new: 'Novo',
          edit: 'Editar',
          cancel: 'Cancelar'
        }
      }
    });

    const snack = this.snackBar.open('Novo: Edita o item selecionado e salva como novo. Editar: Edita o item sem adionar novo');
    dialogRef.afterClosed().subscribe(result => {

      if(result === 'new') {
        snack.dismiss();
        this.snackBar.open('Editar salvando como novo', 'Fechar', {
          duration: 2000,
        });
        this.modoSalvar = 'post';
        this.openModal(template);
        this.cf = cfg;
        this.registerForm.patchValue(cfg);
      } else if(result === 'edit') {
        snack.dismiss();
        this.snackBar.open('Editar o item sem adionar novo', 'Fechar', {
          duration: 2000,
        });
        this.modoSalvar = 'put';
        this.openModal(template);
        this.cf = cfg;
        this.registerForm.patchValue(cfg);
      } else {
        snack.dismiss();
        this.snackBar.open('Operação cancelada', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }

}

