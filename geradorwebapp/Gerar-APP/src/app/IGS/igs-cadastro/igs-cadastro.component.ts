import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IGS } from 'src/app/_models/IGS';
import { TipoVariavel } from 'src/app/_models/TipoVariavel';
import { Configuracao } from 'src/app/_models/Configuracao';
import { PLC } from 'src/app/_models/PLC';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { IGSService } from 'src/app/_services/IGS.service';
import { TVariaveisService } from 'src/app/_services/TVariaveis.service';
import { PLCService } from 'src/app/_services/PLC.service';
import { ConfiguracoesService } from 'src/app/_services/Configuracoes.service';
import { ConfirmationDialogComponent } from 'src/app/ConfirmationDialog/ConfirmationDialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-igs-cadastro',
  templateUrl: './igs-cadastro.component.html',
  styleUrls: ['./igs-cadastro.component.css']
})
export class IgsCadastroComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator1', {static: true}) paginatorCFG: MatPaginator;
  @ViewChild('paginator2', {static: true}) paginatorPLC: MatPaginator;

  tagNameForm = {
    lmsabv: '',
    linha: '',
    abvPLC: ''
  };

  displayedColumnsCFG: string[] = [
    'id', 'planta', 'linha', 'plantaReduzida', 'opcoes'
  ];
  displayedColumnsPLC: string[] = [
    'id', 'ip', 'plcDesc', 'abrevPlc', 'opcoes'
  ];
  dataSourceCfg =  new MatTableDataSource();
  dataSourcePLC =  new MatTableDataSource();

  registerForm: FormGroup;
  numberPattern = '^(0|[1-9][0-9]*)$';
  templateSearch: any;
  modoSalvar = 'post';
  igs: IGS;
  IGSS: IGS[];
  tipoVariaveis: TipoVariavel[];
  tipoVariaveis2: TipoVariavel[];
  configuracoes: Configuracao[];
  configuracoesFiltradas: Configuracao[];
  plcs: PLC[];
  plcFiltrada: PLC[];
  configuracoes1: Configuracao;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private igsService: IGSService,
    private tvService: TVariaveisService,
    private plcService: PLCService,
    private configuracaoService: ConfiguracoesService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.route = route;
   }

  ngOnInit() {
    this.validation();

    const idIGS = +this.router.snapshot.paramMap.get('id');

    if (idIGS === 0) {
      this.modoSalvar = 'post';
    } else {
      this.modoSalvar = 'put';
      this.carregarIGS(idIGS);
    }
    this.getTV();
    this.dadosIniciais();
  }
  ngAfterViewInit() {
    this.dataSourceCfg.paginator = this.paginatorCFG;
    this.dataSourcePLC.paginator = this.paginatorPLC;
  }

  carregarIGS(id: number) {
    this.igsService.getIGSById(id).subscribe(
      (_ig: IGS) => {
        this.igs = Object.assign({}, _ig);
        this.registerForm.patchValue(_ig);
        this.getConfiguracaoById(_ig.configuracaoId);
        this.getPlcById(_ig.plcId);
      }
    );
  }

  getPlcById(id: number) {
    this.plcService.getPLCById(id).subscribe(
      (_plcs: PLC) => {
        this.registerForm.get('ip').setValue(_plcs.ip);
        this.registerForm.get('plcDesc').setValue(_plcs.plcDesc);
        this.registerForm.get('abrevPlc').setValue(_plcs.abrevPLC);
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
      },
      error => {
        console.log(error);
      }
    );

  }
  openModalSearch(template) {
    this.templateSearch = template;
    template.show();
  }
  getTV() {
    this.tvService.getAllTV().subscribe(
      (_TVS: TipoVariavel[]) => {
        this.tipoVariaveis = _TVS;
        this.tipoVariaveis2 = _TVS;
      }
    );
  }
  getCFG() {
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
  salvarAlteracao() {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.igs = Object.assign({}, this.registerForm.value);
        this.igsService.postIGS(this.igs).subscribe (
          (novoIGS: IGS) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novoIGS);
          }, error => {
            this.toastr.error('Algo não está certo: ' + error, 'Gerador');
          }
        );
      } else {
        this.igs = Object.assign({id: this.igs.id}, this.registerForm.value);
        this.igsService.putIGS(this.igs).subscribe(
          (novoIGS: IGS) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novoIGS);
          }, error => {
            this.toastr.error('Algo não está certo: ' + error, 'Gerador');
          }
        );
      }
    }
  }
  openDialog(igss: IGS) {
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
        this.igs = igss;
        this.registerForm.patchValue(igss);
      } else if (result === 'edit') {
        snack.dismiss();
        this.snackBar.open('Voltando para consulta', 'Fechar', {
          duration: 2000,
        });
        this.route.navigate(['/', 'igsview']);
      }
    });
  }
  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          this.dataSourceCfg = new MatTableDataSource(this.configuracoesFiltradas);
          // tslint:disable-next-line: no-unused-expression
          !this.dataSourceCfg.paginator ? this.dataSourceCfg.paginator = this.paginatorCFG : null;
          break;
        case 1:
          this.dataSourcePLC = new MatTableDataSource(this.plcFiltrada);
          // tslint:disable-next-line: no-unused-expression
          !this.dataSourcePLC.paginator ? this.dataSourcePLC.paginator = this.paginatorPLC : null;
          break;
      }
    });
  }
  applyFilterCFG(filterValue: string) {
    this.dataSourceCfg.filter = filterValue.trim().toLocaleLowerCase();
  }
  dadosIniciais() {
    this.registerForm.get('clientAccess').setValue('R/W');
    this.registerForm.get('respDataType').setValue(1);
  }
  applyFilterPLC(filterValue: string) {
    this.dataSourcePLC.filter = filterValue.trim().toLowerCase();
  }
  dadosSelecionadoConf(itemSelecionado: Configuracao) {
    this.registerForm.get('configuracaoId').setValue(itemSelecionado.id);
    this.registerForm.get('planta').setValue(itemSelecionado.planta);
    this.registerForm.get('linha').setValue(itemSelecionado.linha);

    let linhaFormatada = itemSelecionado.linha;
    linhaFormatada = linhaFormatada.replace('L', '');

    this.tagNameForm.linha = linhaFormatada;
    this.templateSearch.hide();
  }
  dadosSelecionadosPLC(itemSelecionado: PLC) {
    this.registerForm.get('plcId').setValue(itemSelecionado.id);
    this.registerForm.get('ip').setValue(itemSelecionado.ip);
    this.registerForm.get('plcDesc').setValue(itemSelecionado.plcDesc);
    this.registerForm.get('abrevPlc').setValue(itemSelecionado.abrevPLC);
    this.tagNameForm.abvPLC = itemSelecionado.abrevPLC;
    this.templateSearch.hide();
  }
  getPLC() {
    this.plcService.getAllPLC().subscribe(
      (_plcs: PLC[]) => {
        this.plcs = _plcs;
        this.plcFiltrada = this.plcs;
        this._setDataSource(1);
      },
      error => {
        console.log(error);
      }
    );
  }
  validTAGName(event: any) {
    let texto = event.target.options[event.target.options.selectedIndex].text;
    this.registerForm.get('tagName').setValue(
      this.tagNameForm.lmsabv + '.' + this.tagNameForm.abvPLC + this.tagNameForm.linha 
      + '*****INFORME_FALTANTE*****' + texto

    );
  }
  validation() {
    this.registerForm = this.fb.group({
      tagName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      scanRate: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      plcId: ['', [Validators.required]],
      plcDesc: [''],
      ip: [''],
      abrevPlc: [''],
      tipoVariavelId: ['', [Validators.required]],
      tipoVariavelIdFT: ['', [Validators.required]],
      respDataType: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      clientAccess: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      configuracaoId: ['', [Validators.required]],
      formTag: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      planta: ['', []],
      linha: ['', []]
    });
  }

}
