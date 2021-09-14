import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ToastrService } from 'ngx-toastr';

import { UM } from 'src/app/_models/UM';
import { UMsService } from 'src/app/_services/UMs.service';

@Component({
  selector: 'app-um',
  templateUrl: './um.component.html',
  styleUrls: ['./um.component.css']
})
export class UmComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'descricao', 'sigla', 'opcoes'
  ];

  registerForm: FormGroup;
  modoSalvar = 'post';
  UMS: UM[];
  um: UM;
  bodyDeletarUm = '';
  umsFiltradas: any[] = [];
  dataSource =  new MatTableDataSource();

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
  }
  constructor(
    private umService: UMsService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) { }

    ngOnInit() {
      this.validation();
      this.getUM();
    }
    novaUM(template) {
      this.openModal(template);
    }
    excluirUM(um: UM, template: any) {
      this.openModal(template);
      this.um = um;
      this.bodyDeletarUm = `Tem certeza que deseja excluir: ${um.descricao}, Código: ${um.id}`;
    }
    editarUM(um: UM, template: any) {
      this.modoSalvar = 'put';
      this.openModal(template);
      this.um = um;
      this.registerForm.patchValue(um);
    }
    confirmeDelete(template: any) {
      this.umService.deleteUM(this.um).subscribe(
        () => {
          template.hide();
          this.getUM();
          this.toastr.success('Gerador', 'Excluído com sucesso');
        }, error => {
          this.toastr.error('Gerador', 'Erro ao excluir');
          console.log(error);
        }
        );
      }
      salvarAlteracao(template: any){
        if (this.registerForm.valid) {
          if (this.modoSalvar === 'post'){
            this.um = Object.assign({}, this.registerForm.value);
            this.umService.postUM(this.um).subscribe(
              (novaUM: UM) => {
                template.hide();
                this.getUM();
                this.toastr.success('Operação efetuada com sucesso', 'Gerador');
              }, error => {
                this.toastr.error('Algo não está certo', 'Gerador');
              }
              );
            } else {
              this.um = Object.assign({id: this.um.id}, this.registerForm.value);
              this.umService.putUM(this.um).subscribe(
                (novaUM: UM) => {
                  template.hide();
                  this.getUM();
                  this.toastr.success('Operação efetuada com sucesso', 'Gerador')
                }, error => {
                  this.toastr.error('Algo não está certo', 'Gerador');
                }
                );
              }
            }
          }

          openModal(template: any) {
            this.registerForm.reset();
            template.show();
          }
          getUM() {
            this.umService.getAllUM().subscribe(
              (_UMs: UM[]) =>{
                this.UMS = _UMs;
                this.umsFiltradas = this.UMS;
                this.dataSource = new MatTableDataSource(this.UMS);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
              },
              error => {
                console.log(error);
              }
              );
            }
            validation() {
              this.registerForm = this.fb.group({
                descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
                sigla: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]]
              });
            }
            applyFilter(filterValue: string){
              this.dataSource.filter = filterValue.trim().toLowerCase();
            }
}
