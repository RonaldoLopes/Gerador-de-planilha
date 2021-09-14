import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { PLCService } from 'src/app/_services/PLC.service';

import { ToastrService } from 'ngx-toastr';
import { PLC } from 'src/app/_models/PLC';

@Component({
  selector: 'app-plc-pesquisa',
  templateUrl: './plc-pesquisa.component.html',
  styleUrls: ['./plc-pesquisa.component.css']
})

export class PlcPesquisaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'plcDesc', 'ip', 'enderecoPLC', 'canalIGS', 'deviceIGS',
    'pasta', 'tagIGS', 'enderecoOPCFull', 'configuracaoId',
    'planta', 'linha', 'plantaReduzida', 'tipoVariavelId', 'descricao',
    'Opcoes'
  ];

  registerForm: FormGroup;
  PLCS: PLC[];
  plc: PLC;
  bodyDeletarPlc = '';

  dataSource =  new MatTableDataSource();

  constructor(
    private plcService: PLCService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getPLC();
  }

  getPLC() {
    this.plcService.getAllPLC().subscribe(
      (_PLCS: PLC[]) => {
        this.PLCS = _PLCS;
        this.dataSource = new MatTableDataSource(this.PLCS);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  excluirData(plc: PLC, template: any) {
    this.openModal(template);
    this.plc = plc;
    this.bodyDeletarPlc = `Tem certeza que deseja excluir: ${plc.plcDesc}, Código: ${plc.id}`;
  }
  confirmeDelete(template: any) {
    this.plcService.deletePLC(this.plc.id).subscribe(
      () => {
        template.hide();
        this.getPLC();
        this.toastr.success('Gerador', 'Excluído com sucesso');
      }, error => {
        this.toastr.error('Gerador', 'Erro ao excluir');
        console.log(error);
      }
    );
  }

  openModal(template: any) {
    //this.registerForm.reset();
    template.show();
  }



}
