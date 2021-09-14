import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfiguracoesService } from '../_services/Configuracoes.service';
import { Configuracao } from '../_models/Configuracao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from '../_services/Excel.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PlanilhaService } from '../_services/Planilha.service';

@Component({
  selector: 'app-Planilhas',
  templateUrl: './Planilhas.component.html',
  styleUrls: ['./Planilhas.component.css']
})

export class PlanilhasComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'planta', 'linha', 'plantaReduzida', 'opcoes'
  ];

  dataSource =  new MatTableDataSource();

  templateSearch: any;
  configuracoes: Configuracao[];
  configuracoesFiltradas: Configuracao[];
  registerForm: FormGroup;

  ambev = [];
  plc = [];
  historian = [];
  lms = [];
  igs = [];
  iDConfig: number;

  constructor(
    private configuracaoService: ConfiguracoesService,
    private planilhaService: PlanilhaService,
    private fb: FormBuilder,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.validation();
    this.getConfiguracao();
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

  openModal(template) {
    this.templateSearch = template;
    template.show();
  }
  dadosSelecionadoConf(itemSelecionado: Configuracao) {
    this.registerForm.get('configuracaoId').setValue(itemSelecionado.id);
    this.registerForm.get('planta').setValue(itemSelecionado.planta);
    this.templateSearch.hide();
  }
  validation() {
    this.registerForm = this.fb.group({
      configuracaoId: ['', [Validators.required]],
      planta: ['', [Validators.required]]
    });
  }

  exportLMS(): void {
    this.planilhaService.getLmsIdPlanilha(this.iDConfig).subscribe(data => {
      data.forEach(row => {
        this.lms.push(row);
      });
      this.excelService.exportSelectData(this.lms, 'LMS');
      this.lms.length = 0;
    });
  }

  exportHistorian(): void {
    this.planilhaService.getHistIdPlanilha(this.iDConfig).subscribe(data => {
      data.forEach(row => {
        this.historian.push(row);
      });
      this.excelService.exportSelectData(this.historian, 'HISTORIAN');
      this.historian.length = 0;
    });
  }

  exportHistorianImp(): void {
    this.planilhaService.getHistPLIdPlanilha(this.iDConfig).subscribe(data => {
      data.forEach(row => {
        this.historian.push(row);
      });
      this.excelService.exportSelectData(this.historian, 'HISTORIANIMP');
      this.historian.length = 0;
    });
  }

  exportPlc(): void {
    this.planilhaService.getPlcIdPlanilha(this.iDConfig).subscribe(data => {
      data.forEach(row => {
        this.plc.push(row);
      });
      this.excelService.exportSelectData(this.plc, 'PLC');
      this.plc.length = 0;
    });
  }

  exportAmbev(): void {
    this.planilhaService.getAmbevIdPlanilha(this.iDConfig).subscribe(data => {
      data.forEach(row => {
        this.ambev.push(row);
      });
      this.excelService.exportSelectData(this.ambev, 'AMBEV');
      this.ambev.length = 0;
    });
  }

  exportarIGS(): void {
    this.planilhaService.getIGSIdPlanilha(this.iDConfig).subscribe(data => {
      data.forEach(row => {
        this.igs.push(row);
      });
      this.excelService.exportSelectData(this.igs, 'IGS');
      this.igs.length = 0;
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
