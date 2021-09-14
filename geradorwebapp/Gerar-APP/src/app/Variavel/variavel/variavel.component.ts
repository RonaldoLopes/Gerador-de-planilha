import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { TipoVariavel } from 'src/app/_models/TipoVariavel';
import { TVariaveisService } from 'src/app/_services/TVariaveis.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-variavel',
  templateUrl: './variavel.component.html',
  styleUrls: ['./variavel.component.css']
})
export class VariavelComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'descricao', 'opcoes'
  ];

  registerForm: FormGroup;
  modoSalvar = 'post';

  tvs: TipoVariavel[];
  tv: TipoVariavel;

  bodyDeletarTV = '';
  dataSource =  new MatTableDataSource();

  constructor(
    private tvService: TVariaveisService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.validation();
    this.getTV();
  }

  confirmarDelete(template: any) {
    this.tvService.deleteTV(this.tv.id).subscribe(
      () => {
        template.hide();
        this.getTV();
        this.toastr.success('Gerador', 'Excluído com sucesso');
      }, error => {
        this.toastr.error('Gerador', 'Erro ao excluir');
        console.log(error);
      }
    );
  }
  confirmeDelete(template: any) {
    this.tvService.deleteTV(this.tv.id).subscribe(
      () => {
        template.hide();
        this.getTV();
        this.toastr.success('Gerador', 'Excluído com sucesso');
      }, error => {
        this.toastr.error('Gerador', 'Erro ao excluir');
        console.log(error);
      }
      );
  }
  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if(this.modoSalvar === 'post'){
        this.tv = Object.assign({}, this.registerForm.value);
        this.tvService.postTV(this.tv).subscribe(
          (novaTV: TipoVariavel) => {
            template.hide();
            this.getTV();
            this.toastr.success('Operação efetuada com sucesso', 'Gerador');
          }, error => {
            this.toastr.error('Algo não está certo', 'Gerador');
          }
        );
      } else {
        this.tv = Object.assign({id: this.tv.id}, this.registerForm.value);
        this.tvService.putTV(this.tv).subscribe(
          (novaTV: TipoVariavel) => {
            template.hide();
            this.getTV();
            this.toastr.success('Operação efetuada com sucesso', 'Gerador')
          }, error => {
            this.toastr.error('Algo não está certo', 'Gerador');
          }
          );
        }
        this.modoSalvar = 'post';
    }
  }
  excluirTV(tv: TipoVariavel, template: any) {
    this.openModal(template);
    this.tv = tv;
    this.bodyDeletarTV = `Tem certeza que deseja excluir: ${tv.descricao}, Código: ${tv.id}`;
  }
  editarTV(tv: TipoVariavel, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.tv = tv;
    this.registerForm.patchValue(tv);
  }
  novaTV(template) {
    this.openModal(template);
    this.registerForm.reset();
  }

  getTV() {
    this.tvService.getAllTV().subscribe(
      (_TVS: TipoVariavel[]) => {
        this.dataSource = new MatTableDataSource(_TVS);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
      }
    );
  }
  openModal(template: any) {
    //this.registerForm.reset();
    template.show();
  }
  validation() {
    this.registerForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    });
  }
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
