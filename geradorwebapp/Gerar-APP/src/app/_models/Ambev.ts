import { Historian } from './Historian';
export interface Ambev {
    id: number;
    codPlanControl: string;
    nomPlaniControl: string;
    codGrupoItemPlani: string;
    nomGrupoItemPlani: string;
    codItemControle: string;
    nomeItemControle: string;
    codItemPlanilha: string;
    ccP_ICL: string;
    obrigatorio: string;
    especifiHistorico: string;
    regraColetaAutoma: string;
    comentarioAmbev: string;
    frequenciaWorkf: string;
    condBasicaWorkFlo: string;
    condEspeciWorkFlo: string;
    valorColetadoWorFlo: number;
    pProdMes: string;
    configuracaoId: number;
    umId: number;
    tipoVariavelId: number;
    //Historians: Historian[];
}
