import { Component, OnInit, ViewChild, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfiguracoesService } from 'src/app/_services/Configuracoes.service';
import { Configuracao } from 'src/app/_models/Configuracao';
import { ToastrService } from 'ngx-toastr';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TVariaveisService } from 'src/app/_services/TVariaveis.service';
import { TipoVariavel } from 'src/app/_models/TipoVariavel';
import { PLC } from 'src/app/_models/PLC';
import { PLCService } from 'src/app/_services/PLC.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/ConfirmationDialog/ConfirmationDialog.component';
import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Ambev } from 'src/app/_models/Ambev';
import { AmbevsService } from 'src/app/_services/Ambevs.service';
import { UM } from 'src/app/_models/UM';
import { UMsService } from 'src/app/_services/UMs.service';
import { Historian } from 'src/app/_models/Historian';
import { HistoriansService } from 'src/app/_services/Historians.service';

@Component({
  selector: 'app-historian-cadastro',
  templateUrl: './historian-cadastro.component.html',
  styleUrls: ['./historian-cadastro.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class HistorianCadastroComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator', {static: true}) paginatorCFG: MatPaginator;
  @ViewChild('paginator2', {static: true}) paginatorABV: MatPaginator;
  @ViewChild('paginator3', {static: true}) paginatorPLC: MatPaginator;

  displayedColumnsCFG: string[] = [
    'id', 'planta', 'linha', 'plantaReduzida', 'opcoes'
  ];
  displayedColumnsABV: string[] = [
    'id', 'pProdMes', 'nomPlaniControl', 'codItemPlanilha', 'nomeItemControle' , 'opcoes'
  ];
  displayedColumnsPLC: string[] = [
    'id', 'ip', 'plcDesc', 'enderecoOPCFull', 'opcoes'
  ];

  dataSourceCfg =  new MatTableDataSource();
  dataSourceABV =  new MatTableDataSource();
  dataSourcePLC =  new MatTableDataSource();

  comprimeColetor = true;

  localInstalSAP = {
    siglas: '',
    linha: '',
    plcDes: '',
    local23: ''
  };
  tagHistorian = {
    servidor: '',
    local23: '',
    variavel: ''
  };
  descricaoHist = {
    cdItemPla: '',
    pprMes: '',
    inic: ''
  };
  comenHist = {
    linstalsap: '',
    nitemcontrol: ''
  };

  registerForm: FormGroup;
  numberPattern = '^(0|[1-9][0-9]*)$';
  templateSearch: any;
  templateSearch2: any;
  modoSalvar = 'post';

  configuracoes: Configuracao[];
  configuracoes1: Configuracao;
  configuracoesFiltradas: Configuracao[];
  configuracoesFiltradas1: Configuracao[];

  ambevs: Ambev[];
  ambevFiltrada: Ambev[];

  plcs: PLC[];
  plcFiltrada: PLC[];

  historian: Historian;
  historians: Historian;

  tipoVariaveis: TipoVariavel[];

  ums: UM[];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router,
    private configuracaoService: ConfiguracoesService,
    private ambevService: AmbevsService,
    private plcService: PLCService,
    private tvService: TVariaveisService,
    private umService: UMsService,
    private historianService: HistoriansService
  ) {
    this.route = route;
  }

  ngOnInit() {
    this.validation();

    const idHist = +this.router.snapshot.paramMap.get('id');
    if (idHist === 0) {
      this.modoSalvar = 'post';
    } else {
      this.modoSalvar = 'put';
      this.carregarHIST(idHist);
    }
    this.getTV();
    this.getUMS();
  }
  ngAfterViewInit() {
    this.dataSourceCfg.paginator = this.paginatorCFG;
    this.dataSourceABV.paginator = this.paginatorABV;
  }
  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          this.dataSourceCfg = new MatTableDataSource(this.configuracoesFiltradas);
          !this.dataSourceCfg.paginator ? this.dataSourceCfg.paginator = this.paginatorCFG : null;
          break;
        case 1:
          this.dataSourceABV = new MatTableDataSource(this.ambevFiltrada);
          !this.dataSourceABV.paginator ? this.dataSourceABV.paginator = this.paginatorABV : null;
          break;
        case 2:
          this.dataSourcePLC = new MatTableDataSource(this.plcFiltrada);
          !this.dataSourcePLC.paginator ? this.dataSourcePLC.paginator = this.paginatorPLC : null;
          break;
      }
    });
  }

  carregarHIST(id: number) {
    this.historianService.getHistById(id).subscribe(
      (_hst: Historian) => {
        this.historians = Object.assign({}, _hst);
        this.registerForm.patchValue(_hst);
        this.getConfiguracaoById(_hst.configuracaoId);
        this.getPlcById(_hst.plcId);
        this.getAmbevById(_hst.ambevId);
      },
      error => {
        console.log(error);
      }
    );
  }
  getAmbevById(id: number) {
    this.ambevService.getAmbevById(id).subscribe(
      (_abvs: Ambev) => {
        //this.registerForm.get('pProdMes').setValue(_abvs.pProdMes);
        this.registerForm.get('nItemControle').setValue(_abvs.nomeItemControle);
        this.registerForm.get('codItemPlanilha').setValue(_abvs.codItemPlanilha);
      },
      error => {
        console.log(error);
      }
    );
  }
  getPlcById(id: number) {
    this.plcService.getPLCById(id).subscribe(
      (_plcs: PLC) => {
        this.registerForm.get('ip').setValue(_plcs.ip);
        this.registerForm.get('plcDesc').setValue(_plcs.plcDesc);
        this.registerForm.get('enderecoOPCFull').setValue(_plcs.enderecoOPCFull);
      },
      error => {
        console.log(error);
      }
    );
  }
  getConfiguracaoById(id: number) {
    this.configuracaoService.getConfiguracaoById(id).subscribe(
      (_cfgs: Configuracao) => {
        this.configuracoes1 = _cfgs;
        this.registerForm.get('planta').setValue(this.configuracoes1.planta);
        this.registerForm.get('linha').setValue(this.configuracoes1.linha);
        this.registerForm.get('sigla').setValue(this.configuracoes1.plantaReduzida);
        this.registerForm.get('servidor').setValue(this.configuracoes1.servidor);
      },
      error => {
        console.log(error);
      }
    );

  }

  dadosSelecionadoAbv(itemSelecionado: Ambev) {
    this.registerForm.get('ambevId').setValue(itemSelecionado.id);
    this.registerForm.get('nomPlaniControl').setValue(itemSelecionado.nomPlaniControl);
    this.registerForm.get('nItemControle').setValue(itemSelecionado.nomeItemControle);
    this.registerForm.get('codItemPlanilha').setValue(itemSelecionado.codItemPlanilha);
    this.templateSearch.hide();
  }
  dadosSelecionadoConf(itemSelecionado: Configuracao) {
    this.registerForm.get('configuracaoId').setValue(itemSelecionado.id);
    this.registerForm.get('planta').setValue(itemSelecionado.planta);
    this.registerForm.get('linha').setValue(itemSelecionado.linha);
    this.registerForm.get('sigla').setValue(itemSelecionado.plantaReduzida);
    this.registerForm.get('servidor').setValue(itemSelecionado.servidor);
    this.templateSearch.hide();
    this.validCollecName();
  }
  dadosSelecionadosPLC(itemSelecionado: PLC) {
    this.registerForm.get('plcId').setValue(itemSelecionado.id);
    this.registerForm.get('ip').setValue(itemSelecionado.ip);
    this.registerForm.get('plcDesc').setValue(itemSelecionado.plcDesc);
    this.registerForm.get('enderecoOPCFull').setValue(itemSelecionado.enderecoOPCFull);
    this.templateSearch.hide();
  }

  validComentHist() {
    this.registerForm.get('comentarioHistoria').setValue(
      this.comenHist.linstalsap + '-' + this.comenHist.nitemcontrol
    );
  }

  validLInstalSAP() {
    this.registerForm.get('lInstalacao').setValue(
      this.localInstalSAP.siglas +  '-0' + this.localInstalSAP.linha + '0-' +
        this.localInstalSAP.plcDes + '              -' + this.localInstalSAP.local23
    );
  }
  validDesc() {
    this.registerForm.get('descricao').setValue(
      '-' + this.localInstalSAP.plcDes + '   -;I' + this.descricaoHist.cdItemPla + '_P' +
        this.descricaoHist.pprMes + ';' + this.descricaoHist.inic
    );
  }
  validTagHistorian() {
    var select = document.querySelector('select');
    var option = select.children[select.selectedIndex];
    var texto = option.textContent;

    this.registerForm.get('tagHistorian').setValue(
      this.localInstalSAP.siglas + this.tagHistorian.servidor + '.' + this.localInstalSAP.local23 + texto
    );
  }

  validCollecName() {
    this.registerForm.get('collectorName').setValue(
      this.localInstalSAP.siglas + this.tagHistorian.servidor + '_OPC_Intellution_IntellutionGatewayOPCServer'
    );
  }
  getUMS() {
    this.umService.getAllUM().subscribe(
      (_UMS: UM[]) => {
        this.ums = _UMS;
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
  getPLC() {
    this.plcService.getAllPLC().subscribe(
      (_plcs: PLC[]) => {
        this.plcs = _plcs;
        this.plcFiltrada = this.plcs;
        this._setDataSource(2);
      },
      error => {
        console.log(error);
      }
    );
  }
  getAmbev() {
    this.ambevService.getAllAmbev().subscribe(
      (_ambevs: Ambev[]) => {
        this.ambevs = _ambevs;
        this.ambevFiltrada = this.ambevs;
        this._setDataSource(1);
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
        this._setDataSource(0);
      },
      error => {
        console.log(error);
      }
    );
  }
  openModal(template) {
    this.templateSearch = template;
    template.show();
  }

  salvarAlteracao() {
    if (this.registerForm.valid) {
      if(this.modoSalvar === 'post') {
        this.historian = Object.assign({}, this.registerForm.value);
        this.historianService.postHist(this.historian).subscribe(
          (novoHist: Historian) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novoHist);
          }, error => {
            this.toastr.error('Erro ao excluir', 'Gerador');
          }
        );
      } else {
        this.historian = Object.assign({id: this.historians.id}, this.registerForm.value);
        this.historianService.putHist(this.historian).subscribe(
          (novoHist: Historian) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novoHist);
          }, error => {
            this.toastr.error('Erro ao efetuar operação', 'Gerador');
          }
        );
      }
    }
  }

  openDialog(hist: Historian) {
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
        this.historian = hist;
        this.registerForm.patchValue(hist);
      } else if (result === 'edit') {
        snack.dismiss();
        this.snackBar.open('Voltando para consulta', 'Fechar', {
          duration: 2000,
        });
        this.route.navigate(['/', 'histview']);
      }
    });
  }
  applyFilterCFG(filterValue: string) {
   this.dataSourceCfg.filter = filterValue.trim().toLocaleLowerCase();
  }
  applyFilterABV(filterValue: string) {
    this.dataSourceABV.filter = filterValue.trim().toLocaleLowerCase();
  }
  applyFilterPLC(filterValue: string) {
    this.dataSourcePLC.filter = filterValue.trim().toLocaleLowerCase();
  }
  validation() {
    this.registerForm = this.fb.group({
      nivelInstru: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(55)]],
      lInstalacao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      local23NivelSAP: ['', [Validators.maxLength(45)]],
      iniciativa: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      tagHistorian: ['', [ Validators.maxLength(150)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      comentarioHistoria: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      validTagHistorian: ['', [Validators.maxLength(45)]],
      evidencia: ['', [Validators.maxLength(100)]],
      comentaFinal: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      collectionType: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      collectionInterval: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      collectorCompression: ['', [Validators.required]],
      collectorCompressorTimeOut: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      collectDeadPercenRange: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      abrevMaquina: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      numMaquina: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      collectorName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      hiScale: [''],
      plcId: ['', [Validators.required]],
      ip: ['', [Validators.required]],
      plcDesc: ['', [Validators.required]],
      configuracaoId: ['', [Validators.required]],
      ambevId: ['', [Validators.required]],
      umId: ['', [Validators.required]],
      tipoVariavelId: ['', [Validators.required]],
      planta: ['', []],
      linha: ['', []],
      servidor: ['', []],
      sigla: ['', []],
      pProdMes: ['', [Validators.maxLength(10)]],
      nomPlaniControl: ['', []],
      nItemControle: ['', []],
      codItemPlanilha: ['', []],
      enderecoOPCFull: ['']
    });
  }

}
