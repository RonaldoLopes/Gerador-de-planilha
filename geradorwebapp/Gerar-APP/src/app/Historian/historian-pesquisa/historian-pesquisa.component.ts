import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ToastrService } from 'ngx-toastr';

import { HistoriansService } from 'src/app/_services/Historians.service';
import { Historian } from 'src/app/_models/Historian';

@Component({
  selector: 'app-historian-pesquisa',
  templateUrl: './historian-pesquisa.component.html',
  styleUrls: ['./historian-pesquisa.component.css']
})
export class HistorianPesquisaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'nivelInstru', 'lInstalacao', 'local23NivelSAP', 'iniciativa', 'tagHistorian',
    'descricao', 'comentarioHistoria', 'validTagHistorian', 'evidencia',
    'comentaFinal', 'collectionType', 'collectionInterval', 'collectorCompression', 'collectorCompressorTimeOut',
    'collectDeadPercenRange', 'abrevMaquina', 'numMaquina', 'plcId', 'configuracaoId', 'ambevId',
    'umId', 'tipoVariavelId', 'pProdMes', 'Opcoes'
  ];
  dataSource =  new MatTableDataSource();

  registerForm: FormGroup;

  HISTS: Historian[];
  hist: Historian;
  bodyDeletarHist = '';

  constructor(
    private histService: HistoriansService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getHistorian();
  }

  getHistorian() {
    this.histService.getAllHist().subscribe(
      (_HIST: Historian[]) => {
        this.HISTS = _HIST;
        this.dataSource = new MatTableDataSource(this.HISTS);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      }
    );
  }
  excluirData(hist: Historian, template: any) {
    this.openModal(template);
    this.hist = hist;
    this.bodyDeletarHist = `Tem certeza que deseja excluir:  Código: ${hist.id}`;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  openModal(template: any) {
    template.show();
  }
  confirmeDelete(template: any) {
    this.histService.deleteHist(this.hist.id).subscribe(
      () => {
        template.hide();
        this.getHistorian();
        this.toastr.success('Excluído com sucesso', 'Gerador');
      }, error => {
        this.toastr.error('Erro ao excluir', 'Gerador');
      }
    );
  }
}
