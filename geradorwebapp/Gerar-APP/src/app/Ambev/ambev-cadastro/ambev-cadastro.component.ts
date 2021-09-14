import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracoesService } from 'src/app/_services/Configuracoes.service';
import { Configuracao } from 'src/app/_models/Configuracao';
import { ToastrService } from 'ngx-toastr';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TVariaveisService } from 'src/app/_services/TVariaveis.service';
import { TipoVariavel } from 'src/app/_models/TipoVariavel';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/ConfirmationDialog/ConfirmationDialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UM } from 'src/app/_models/UM';
import { UMsService } from 'src/app/_services/UMs.service';
import { Ambev } from 'src/app/_models/Ambev';
import { AmbevsService } from 'src/app/_services/Ambevs.service';

@Component({
  selector: 'app-ambev-cadastro',
  templateUrl: './ambev-cadastro.component.html',
  styleUrls: ['./ambev-cadastro.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AmbevCadastroComponent implements OnInit  {

  tipoVariaveis: TipoVariavel[];
  ums: UM[];
  registerForm: FormGroup;
  configuracoes: Configuracao[];
  configuracoes1: Configuracao;
  configuracoesFiltradas: Configuracao[];
  configuracoesFiltradas1: Configuracao[];
  ambev: Ambev;
  ambevs: Ambev;
  templateConfig: any;
  modoSalvar = 'post';
  numberPattern = '^(0|[1-9][0-9]*)$';

  constructor(
    private fb: FormBuilder,
    private configuracaoService: ConfiguracoesService,
    private toastr: ToastrService,
    private tvService: TVariaveisService,
    private umService: UMsService,
    private ambevService: AmbevsService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router
  ) { this.route = route; }

  ngOnInit() {

    const idAmbev = +this.router.snapshot.paramMap.get('id');

    if (idAmbev === 0) {
      this.modoSalvar = 'post';
    } else {
      this.carregarAmbev(idAmbev);
      this.modoSalvar = 'put';
    }
    this.validation();
    //this.getConfiguracao();
    this.getTV();
    this.getUM();
  }
  carregarAmbev(id: number) {
    this.ambevService.getAmbevById(id).subscribe(
      (_abv: Ambev) => {
        this.ambevs = Object.assign({}, _abv);
        this.registerForm.patchValue(this.ambevs);
        //this.getConfiguracaoById(_abv.configuracaoId);
      }
    );
  }

  /*getConfiguracaoById(id: number) {
    this.configuracaoService.getConfiguracaoById(id).subscribe(
      (_cfgs: Configuracao) => {
        this.configuracoes1 = _cfgs;
        this.registerForm.get('planta').setValue(this.configuracoes1.planta);
        this.registerForm.get('linha').setValue(this.configuracoes1.linha);
        this.registerForm.get('sigla').setValue(this.configuracoes1.plantaReduzida);
      },
      error => {
        console.log(error);
      }
    );

  }*/

  salvarAlteracao() {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.ambev = Object.assign({}, this.registerForm.value);
        console.log(this.ambev)
        this.ambevService.postAmbev(this.ambev).subscribe(
          (novaAmbev: Ambev) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novaAmbev);
          }, error => {
            this.toastr.error('Erro ao salvar', 'Gerador');
            console.log(error);
          }
        );
      } else {
        this.ambev = Object.assign({id: this.ambevs.id}, this.registerForm.value);
        this.ambevService.putAmbev(this.ambev).subscribe(
          (novaAmbev: Ambev) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novaAmbev);
          }, error => {
            this.toastr.error('Erro ao efetuar operação', 'Gerador');
          }
        );
      }
    }
  }

  openDialog(ambev: Ambev) {
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
      if(result === 'new') {
        snack.dismiss();
        this.snackBar.open('Editar salvando como novo', 'Fechar', {
          duration: 2000,
        });
        this.modoSalvar = 'post';
        this.ambev = ambev;
        this.registerForm.patchValue(ambev);
      } else if (result === 'edit') {
        snack.dismiss();
        this.snackBar.open('Voltando para consulta', 'Fechar', {
          duration: 2000,
        });
        this.route.navigate(['/', 'abvview']);
      }
    });
  }

  openModal(template) {
    this.templateConfig = template;
    template.show();
  }

  getUM() {
    this.umService.getAllUM().subscribe(
      (_UMS: UM[]) => {
        this.ums = _UMS;
      }
    )
  }

  getTV() {
    this.tvService.getAllTV().subscribe(
      (_TVS: TipoVariavel[]) => {
        this.tipoVariaveis = _TVS;
      }
    );
  }
  getConfiguracao() {
    this.configuracaoService.getAllConfiguracao().subscribe(
      (_configuracoes: Configuracao[]) => {
        this.configuracoes = _configuracoes;
        this.configuracoesFiltradas = this.configuracoes;
      },
      error => {
        console.log(error);
      }
    );
  }

  dadosSelecionadoConf(itemSelecionado: Configuracao) {
    this.registerForm.get('configuracaoId').setValue(itemSelecionado.id);
    this.registerForm.get('planta').setValue(itemSelecionado.planta);
    this.registerForm.get('linha').setValue(itemSelecionado.linha);
    this.registerForm.get('sigla').setValue(itemSelecionado.plantaReduzida);
    this.templateConfig.hide();
  }
  validation() {
    this.registerForm = this.fb.group({
      codPlanControl: ['', [Validators.maxLength(5)]],
      nomPlaniControl: ['', [Validators.maxLength(50)]],
      codGrupoItemPlani: ['', [Validators.maxLength(50)]],
      nomGrupoItemPlani: ['', [Validators.maxLength(50)]],
      codItemControle: ['', [Validators.maxLength(50)]],
      nomeItemControle: ['', [Validators.maxLength(300)]],
      codItemPlanilha: ['', [Validators.maxLength(50)]],
      ccP_ICL: ['', [Validators.maxLength(50)]],
      especifiHistorico: ['', [Validators.maxLength(250)]],
      regraColetaAutoma: ['', [Validators.maxLength(150)]],
      umId: ['', [Validators.required]],
      tipoVariavelId: ['', [Validators.required]],
      comentarioAmbev: ['', [Validators.maxLength(400)]],
      frequenciaWorkf: ['', [Validators.maxLength(350)]],
      condBasicaWorkFlo: ['', [Validators.maxLength(100)]],
      condEspeciWorkFlo: ['', [Validators.maxLength(150)]],
      valorColetadoWorFlo: ['', [Validators.maxLength(10)]],
      obrigatorio: ['']
    });
  }

  /*validation() {
    this.registerForm = this.fb.group({
      codPlanControl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      nomPlaniControl: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      codGrupoItemPlani: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      nomGrupoItemPlani: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(35)]],
      codItemControle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      nomeItemControle: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      codItemPlanilha: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      ccP_ICL: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      obrigatorio: ['', [Validators.required]],
      especifiHistorico: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
      regraColetaAutoma: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(120)]],
      umId: ['', [Validators.required]],
      tipoVariavelId: ['', [Validators.required]],
      comentarioAmbev: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      frequenciaWorkf: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      condBasicaWorkFlo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      condEspeciWorkFlo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      valorColetadoWorFlo: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      pProdMes: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    });
  }*/

}
