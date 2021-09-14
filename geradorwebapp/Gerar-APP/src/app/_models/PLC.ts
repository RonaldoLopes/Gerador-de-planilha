import { Historian } from './Historian';
import { Configuracao } from './Configuracao';
export interface PLC {
    id: number;
    plcDesc: string;
    ip: string;
    enderecoPLC: string;
    canalIGS: string;
    deviceIGS: string;
    pasta: string;
    tagIGS: string;
    endFullOPC: string;
    configuracaoId: number;
    plantaReduzida: string;
    validSmartTag: string;
    abrevPLC: string;
    tipoVariavelId: number;
    enderecoOPCFull: string;
    //Historians: Historian[];
    configuracoes: Configuracao[];
}
