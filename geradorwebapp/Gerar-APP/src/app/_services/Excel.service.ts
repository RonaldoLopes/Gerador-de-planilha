import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  dataArray = [];
  jsonText: any;
  linhaGerada: string;

  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public exportSelectData(json: any[], tipo: string): void {

    const fileName = 'DADOS.xlsx';

    const ws = XLSX.utils.aoa_to_sheet([
      [tipo]
    ]);

    // tslint:disable-next-line: curly
    switch (tipo) {
      case 'AMBEV': {
        if (!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(XLSX.utils.decode_range('A1:R1'));
        XLSX.utils.sheet_add_json(ws, this.getDadosABV(json), {origin: 'A2'});
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.linhaGerada);
        XLSX.writeFile(wb, fileName);
        break;
      }
      case 'PLC': {
        if (!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(XLSX.utils.decode_range('A1:R1'));
        XLSX.utils.sheet_add_json(ws, this.getDadosPLC(json), {origin: 'A2'});
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.linhaGerada);
        XLSX.writeFile(wb, fileName);
        break;
      }
      case 'HISTORIAN': {
        if (!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(XLSX.utils.decode_range('A1:R1'));
        XLSX.utils.sheet_add_json(ws, this.getDadosHist(json, 'HST'), {origin: 'A2'});
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.linhaGerada);
        XLSX.writeFile(wb, fileName);
        break;
      }
      case 'LMS': {
        if (!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(XLSX.utils.decode_range('A1:R1'));
        XLSX.utils.sheet_add_json(ws, this.getDadosLMS(json), {origin: 'A2'});
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.linhaGerada);
        XLSX.writeFile(wb, fileName);
        break;
      }
      case 'IGS': {
        XLSX.utils.sheet_add_json(ws, this.getDadosIGS(json), {origin: 'A2'});
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.linhaGerada);
        XLSX.writeFile(wb, fileName);
        break;
      }
      case 'HISTORIANIMP': {
        XLSX.utils.sheet_add_json(ws, this.getDadosHist(json, 'IMP'), {origin: 'A2'});
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.linhaGerada);
        XLSX.writeFile(wb, fileName);
        break;
      }
    }

  }
  private getDadosIGS(jsonData: any[]) {
    this.dataArray.length = 0;
    for (let i in jsonData) {

      this.dataArray.push({
        'PLC NAME': jsonData[i]["plc"]["plcDesc"],
        'Tag Name': jsonData[i]["tagName"],
        'Address': jsonData[i]["address"],
        'Data Type': jsonData[i]["tipoVariavel"]['descricao'],
        'Respect Data Type': jsonData[i]["respDataType"],
        'Client Access': jsonData[i]["clientAccess"],
        'Scan Rate': jsonData[i]["scanRate"],
        'Scaling': '',
        'Raw Low': '',
        'Raw High': '',
        'Scaled Low': '',
        'Scaled High': '',
        'Scaled Data Type': '',
        'Clamp Low': '',
        'Clamp High': '',
        'Eng Units': '',
        'Description': '',
        'Negate Value':''
      });
    }

    return this.dataArray;
  }
  private getDadosLMS(jsonData: any[]) {
    this.dataArray.length = 0;
    this.linhaGerada = jsonData[0]["configuracao"]["descLinha"];
    // tslint:disable-next-line: forin
    for (let i in jsonData) {

      this.dataArray.push({
        'Tag no LMS': jsonData[i]["tagLMS"],
        'Tag no OPC': jsonData[i]["tagOP"],
        'Tipo de Variável': jsonData[i]["tipoVariavel"]["descricao"]
      });
    }

    return this.dataArray;
  }

  private getDadosHist(jsonData: any[], tipo: any) {
    this.dataArray.length = 0;
    this.linhaGerada = jsonData[0]["configuracao"]["descLinha"];
    // tslint:disable-next-line: forin
    for (let i in jsonData) {

      switch (tipo) {

        case 'HST':
          this.dataArray.push({
            'Nivel Instrumentação': jsonData[i]["nivelInstru"],
            'Variável': jsonData[i]["tipoVariavel"]["descricao"],
            'Local instalação SAP completo': jsonData[i]["lInstalacao"],
            'Local(2° ou 3° Nível SAP)': jsonData[i]["local23NivelSAP"],
            'Iniciativa': jsonData[i]["iniciativa"],
            'Nome da Tag Historian': jsonData[i]["tagHistorian"],
            'Descrição': jsonData[i]["descricao"],
            'EGU': jsonData[i]["um"]["sigla"],
            'Comentário do Historian': jsonData[i]["comentarioHistoria"],
            'Validação Tag no Historian': jsonData[i]["validTagHistorian"],
            'Evidência': jsonData[i]["evidencia"],
            'Data e Hora da Evidência': '',
            'Comentário Final': jsonData[i]["comentaFinal"]
          });
          break;
        case 'IMP':
          this.dataArray.push({
            'Tagname': jsonData[i]["tagHistorian"],
            'Description': jsonData[i]["descricao"],
            'EnumeratedSetName': '',
            'EngineeringUnits': jsonData[i]["um"]["sigla"],
            'Comment': jsonData[i]["comentarioHistoria"],
            'DataType': jsonData[i]["tipoVariavel"]["descricao"],
            'StringLength': '8',
            'TimeResolution': 'Seconds',
            'CollectorName': jsonData[i]["collectorName"],
            'CollectorType': 'OPC',
            'SourceAddress': jsonData[i]["plc"]["enderecoOPCFull"],
            'CollectionType': jsonData[i]["collectionType"],
            'CollectionInterval': jsonData[i]["collectionInterval"],
            'CollectionOffset': '0',
            'CollectionDisabled': 'Falso',
            'LoadBalancing': 'Falso',
            'SpikeLogic': 'Falso',
            'SpikeLogicOverride': 'Falso',
            'TimeStampType': 'Collector',
            'TimeZoneBias': '0',
            'HiEngineeringUnits': '100',
            'LoEngineeringUnits': '0',
            'InputScaling': 'Falso',
            'HiScale': jsonData[i]["hiScale"],
            'LoScale': '0',
            'CollectorCompression': jsonData[i]["collectorCompression"],
            'CollectorCompressionTimeout': jsonData[i]["collectorCompressorTimeOut"],
            'CollectorDeadbandPercentRange': jsonData[i]["collectDeadPercenRange"],
            'ArchiveCompression': 'Falso',
            'ArchiveCompressionTimeout': '0',
            'ArchiveDeadbandPercentRange': '0',
            'CollectorGeneral1': '',
            'CollectorGeneral2': '',
            'CollectorGeneral3': '',
            'CollectorGeneral4': '',
            'CollectorGeneral5': '',
            'ReadSecurityGroup': '',
            'WriteSecurityGroup': '',
            'AdministratorSecurityGroup': '',
            'Calculation': '',
            'CalculationDependencies': '',
            'CalculationExecutionTime': 0,
            'LastModified': '',
            'LastModifiedUser': '',
            'ArchiveAbsoluteDeadband': 0,
            'ArchiveAbsoluteDeadbanding': 'Falso',
            'InterfaceAbsoluteDeadband': 0,
            'InterfaceAbsoluteDeadbanding': '',
            'StepValue': 'Falso',
            'ConditionCollectionEnabled': 'Falso',
            'ConditionCollectionTriggerTag': '',
            'ConditionCollectionComparison': '=',
            'ConditionCollectionCompareValue': '',
            'ConditionCollectionMarkers': 'Verdadeiro',
            'DataStoreName': 'User',
            'NumberOfElements': 0,
            'UserDefinedTypeName': ''
          });
          break;
        default:
          break;
      }
    }

    return this.dataArray;
  }
  private getDadosPLC(jsonData: any[]) {

    this.dataArray.length = 0;
    this.linhaGerada = jsonData[0]["descLinha"];
    // tslint:disable-next-line: forin
    for (let i in jsonData) {

      // tslint:disable-next-line: forin
      for (let j in jsonData[i]["plcs"] ){

        jsonData[i]["plcs"][0]["tipoVariavel"]["descricao"]

        this.dataArray.push({
          'Validação Smart TAG': jsonData[0]["plcs"][j]['validSmartTag'],
          'PLC': jsonData[0]["plcs"][j]['plcDesc'],
          'IP': jsonData[0]["plcs"][j]['ip'],
          'Tipo Variável': jsonData[i]["plcs"][j]["tipoVariavel"]["descricao"],
          'Endereço PLC Confirmado': jsonData[0]["plcs"][j]['enderecoPLC'],
          'Canal no IGS': jsonData[0]["plcs"][j]['canalIGS'],
          'Device no IGS': jsonData[0]["plcs"][j]['deviceIGS'],
          'Pasta': jsonData[0]["plcs"][j]['pasta'],
          'Tag no IGS': jsonData[0]["plcs"][j]['tagIGS'],
          'Endereço OPC Completo': jsonData[0]["plcs"][j]['enderecoOPCFull'],
        });
      }
    }
    return this.dataArray;
  }

  private getDadosABV(jsonData: any[]) {

    this.dataArray.length = 0;
    this.linhaGerada = jsonData[0]["descLinha"];
    // tslint:disable-next-line: forin
    for (let i in jsonData) {
      //codPlanControl = jsonData[i]["codPlanControl"];

      // tslint:disable-next-line: forin
      for (let j in jsonData[i]['ambevs'] ){
        this.dataArray.push({
          'COD_PLANILHA_CONTROL': jsonData[i]['ambevs'][j]['codPlanControl'],
          'NOM_PLANILHA_CONTROLE': jsonData[i]['ambevs'][j]['nomPlaniControl'],
          'COD_GRUPO_ITEM_PLANILHA': jsonData[i]['ambevs'][j]['codGrupoItemPlani'],
          'NOM_GRUPO_ITEM_PLANILHA': jsonData[i]['ambevs'][j]['nomGrupoItemPlani'],
          'COD_ITEM_CONTROLE': jsonData[i]['ambevs'][j]['codItemControle'],
          'NOM_ITEM_CONTROLE': jsonData[i]['ambevs'][j]['nomeItemControle'],
          'COD_ITEM_PLANILHA': jsonData[i]['ambevs'][j]['codItemPlanilha'],
          'CCP/ICL ?': jsonData[i]['ambevs'][j]['ccP_ICL'],
          'OBRIGATÓRIO': jsonData[i]['ambevs'][j]['obrigatorio'],
          'ESPECIFICACAO / Histórico': jsonData[i]['ambevs'][j]['especifiHistorico'],
          'U.M.': jsonData[i]['ambevs'][j]['codPlanControl'],
          'Tipo Variável': jsonData[i]['ambevs'][j]['codPlanControl'],
          'Regra de Coleta Automação': jsonData[i]['ambevs'][j]['regraColetaAutoma'],
          'Comentário Ambev': jsonData[i]['ambevs'][j]['comentarioAmbev'],
          'Frequência(WorkFlow)': jsonData[i]['ambevs'][j]['frequenciaWorkf'],
          'Condições Básicas(WorkFlow)': jsonData[i]['ambevs'][j]['condBasicaWorkFlo'],
          'Condições Especiais(WorkFlow)': jsonData[i]['ambevs'][j]['condEspeciWorkFlo'],
          'Valor Coletado(WorkFlow)': jsonData[i]['ambevs'][j]['valorColetadoWorFlo'],
          'Ponto Produtivo MES': jsonData[i]['ambevs'][j]['pProdMes']
        });
      }

    }
    return this.dataArray;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

}
