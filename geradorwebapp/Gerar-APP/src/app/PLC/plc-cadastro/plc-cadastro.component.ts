import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plc-cadastro',
  templateUrl: './plc-cadastro.component.html',
  styleUrls: ['./plc-cadastro.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class PlcCadastroComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'planta', 'linha', 'plantaReduzida', 'opcoes'
  ];

  dataSource =  new MatTableDataSource();

  deviceIGS = {
    abvPlc: '',
    linha: ''
  };

  tipoVariaveis: TipoVariavel[];
  registerForm: FormGroup;
  configuracoes: Configuracao[];
  configuracoes1: Configuracao;
  configuracoesFiltradas: Configuracao[];
  configuracoesFiltradas1: Configuracao[];
  plcs: PLC;
  plc: PLC;
  templateConfig: any;
  ipPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
  modoSalvar = 'post';

    constructor(
    private fb: FormBuilder,
    private configuracaoService: ConfiguracoesService,
    private plcService: PLCService,
    private toastr: ToastrService,
    private tvService: TVariaveisService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router
    )
    {
      this.route = route;
    }

  ngOnInit() {
    this.validation();

    const idPlc = +this.router.snapshot.paramMap.get('id');

    if (idPlc === 0) {
      this.modoSalvar = 'post';
    } else {
      this.modoSalvar = 'put';
      this.carregarPlc(idPlc);
    }
    this.getConfiguracao();
    this.getTV();
  }

  carregarPlc(id: number) {
    this.plcService.getPLCById(id).subscribe(
      (_plc: PLC) => {
        this.plcs = Object.assign({}, _plc);
        this.registerForm.patchValue(_plc);
        //console.log(_plc);
        this.getConfiguracaoById(_plc.configuracaoId);
      }
    );
  }
  _formatado: string;
  get formatado(): string {
    return this. _formatado;
  }

  openModal(templante) {
    this.templateConfig = templante;
    templante.show();
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
  getConfiguracaoById(id: number) {
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

  }
  validation() {
    this.registerForm = this.fb.group({
      plcDesc: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      abrevPLC: ['', [Validators.required, Validators.maxLength(5)]],
      // tslint:disable-next-line: max-line-length
      ip: ['', [Validators.required, Validators.pattern(this.ipPattern)]],
      enderecoPLC: ['', [ Validators.maxLength(65)]],
      canalIGS: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(55)]],
      deviceIGS: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      pasta: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      tagIGS: ['', [Validators.maxLength(55)]],
      enderecoOPCFull: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      configuracaoId: ['', [Validators.required]],
      tipoVariavelId: ['', [Validators.required]],
      flagTAGIGS: [''],
      validSmartTag: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      planta: ['', [Validators.required]],
      linha: ['', [Validators.required]],
      sigla: ['', [Validators.required]]
    });
  }

  dadosSelecionadoConf(itemSelecionado: Configuracao) {
    this.registerForm.get('configuracaoId').setValue(itemSelecionado.id);
    this.registerForm.get('planta').setValue(itemSelecionado.planta);
    this.registerForm.get('linha').setValue(itemSelecionado.linha);
    this.registerForm.get('sigla').setValue(itemSelecionado.plantaReduzida);
    this.registerForm.get('canalIGS').setValue( itemSelecionado.linha + '_');
    this.templateConfig.hide();
  }

  formataCanalIGS() {
    this.registerForm.get('canalIGS').setValue('');
    this.registerForm.get('canalIGS').setValue( this.registerForm.get('linha').value + '_' + this.registerForm.get('deviceIGS').value);
  }

  formataEndOpcFull() {
    let linhaFormatada = this.registerForm.get('deviceIGS').value;
    linhaFormatada = linhaFormatada.replace('L', '');
    let linhaFormatada2 = this.registerForm.get('tagIGS').value;
    linhaFormatada2 = linhaFormatada2.replace('L', '');
    this.registerForm.get('enderecoOPCFull').setValue('');
    // tslint:disable-next-line: max-line-length
    this.registerForm.get('enderecoOPCFull').setValue(this.registerForm.get('linha').value + '_' + linhaFormatada + '.' +
    linhaFormatada + '.' + this.registerForm.get('pasta').value + '.' + linhaFormatada2);
  }

  getTV() {
    this.tvService.getAllTV().subscribe(
      (_TVS: TipoVariavel[]) => {
        this.tipoVariaveis = _TVS;
      }
    );
  }

  salvarAlteracao() {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.plc = Object.assign({}, this.registerForm.value);
        console.log(this.plc);
        this.plcService.postPLC(this.plc).subscribe(
          (novoPLC: PLC) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novoPLC);
            //this.registerForm.reset();
          }, error => {
            this.toastr.error('Erro ao excluir', 'Gerador');
            console.log(error);
          }
        );
      } else {
        this.plc = Object.assign({id: this.plcs.id}, this.registerForm.value);
        this.plcService.putPLC(this.plc).subscribe(
          (novoPLC: PLC) => {
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
            this.openDialog(novoPLC);
          }, error => {
            this.toastr.error('Erro ao efetuar operação', 'Gerador');
          }
        );
      }
    }
  }
  openDialog(plc: PLC) {
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
        this.plc = plc;
        this.registerForm.patchValue(plc);
      } else if (result === 'edit') {
        snack.dismiss();
        this.snackBar.open('Voltando para consulta', 'Fechar', {
          duration: 2000,
        });
        this.route.navigate(['/', 'plcview']);
      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  validIGS() {
    this.registerForm.get('deviceIGS').setValue(
      this.deviceIGS.abvPlc + this.deviceIGS.linha
    );
  }
  validTAGIGS(event: any) {

    let texto = event.target.options[event.target.options.selectedIndex].text;
    let linhaFormatada = this.deviceIGS.linha;
    linhaFormatada = linhaFormatada.replace('L', '');
    this.registerForm.get('tagIGS').setValue(
      this.deviceIGS.abvPlc + linhaFormatada + '********INFORMEFALTANTE******' +  texto
    );
  }

}