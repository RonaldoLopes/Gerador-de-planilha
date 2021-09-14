import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ToastrService } from 'ngx-toastr';
import { IGS } from 'src/app/_models/IGS';
import { IGSService } from 'src/app/_services/IGS.service';
@Component({
  selector: 'app-igs-view',
  templateUrl: './igs-view.component.html',
  styleUrls: ['./igs-view.component.css']
})
export class IgsViewComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = [
    'id', 'tagName', 'address', 'scanRate',
    'tipoVariavelId', 'plcId', 'formTag', 'clientAccess',
    'respDataType', 'configuracaoId', 'opcoes'
  ];

  dataSource =  new MatTableDataSource();

  IGSs: IGS[];
  igss: IGS;
  bodyDeletarIGS = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private igsService: IGSService
  ) { }

  ngOnInit() {
    this.getIGS();
  }

  getIGS() {
    this.igsService.getAllIGS().subscribe(
      (_IG: IGS[]) => {
        this.IGSs = _IG;
        this.dataSource = new MatTableDataSource(this.IGSs);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }
  excluirData(ig: IGS, template: any) {
    this.openModal(template);
    this.igss = ig;
    this.bodyDeletarIGS = `Tem certeza que deseja excluir:  Código: ${ig.id}`;
  }
  openModal(template: any) {
    template.show();
  }
  confirmeDelete(template: any) {
    this.igsService.deleteIGS(this.igss.id).subscribe(
      () => {
        template.hide();
        this.getIGS();
        this.toastr.success('Excluído com sucesso', 'Gerador');
      }, error => {
        this.toastr.error('Erro ao excluir', 'Gerador');
      }
    );
  }
}
