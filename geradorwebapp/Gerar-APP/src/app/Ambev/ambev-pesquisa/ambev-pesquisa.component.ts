import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ambev } from 'src/app/_models/Ambev';
import { AmbevsService } from 'src/app/_services/Ambevs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ambev-pesquisa',
  templateUrl: './ambev-pesquisa.component.html',
  styleUrls: ['./ambev-pesquisa.component.css']
})
export class AmbevPesquisaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'codPlanControl', 'nomPlaniControl', 'codGrupoItemPlani', 'nomGrupoItemPlani',
    'codItemControle', 'nomeItemControle', 'codItemPlanilha', 'ccP_ICL', 'obrigatorio',
    'especifiHistorico', 'regraColetaAutoma', 'umId', 'tipoVariavelId',
    'comentarioAmbev', 'frequenciaWorkf', 'condBasicaWorkFlo', 'condEspeciWorkFlo',
    'valorColetadoWorFlo', 'Opcoes'
  ];

  registerForm: FormGroup;
  Ambevs: Ambev[];
  ambev: Ambev;
  bodyDeletarAmbev = '';
  dataSource =  new MatTableDataSource();

  constructor(
    private ambevService: AmbevsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAmbev();
  }
  getAmbev() {
    this.ambevService.getAllAmbev().subscribe(
      (_ABV: Ambev[]) => {
        this.Ambevs = _ABV;
        this.dataSource = new MatTableDataSource(this.Ambevs);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }

  excluirData(abv: Ambev, template: any) {
    this.openModal(template);
    this.ambev = abv;
    this.bodyDeletarAmbev = `Tem certeza que deseja excluir: Código: ${this.ambev.id}`;
  }

  confirmDelete(template: any) {
    this.ambevService.deleteAmbev(this.ambev.id).subscribe(
      () => {
        template.hide();
        this.getAmbev();
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
