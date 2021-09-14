import { TipoVariavel } from './TipoVariavel';
import { PLC } from './PLC';
import { Configuracao } from './Configuracao';

export interface IGS {
    id: number;
    TagName: string;
    Address: string;
    ScanRate: number;
    respDataType: number;
    FormTag: string;
    ClientAccess: string;
    tipoVariavel: TipoVariavel[];
    plc: PLC[];
    configuracao: Configuracao[];
    configuracaoId: number;
    plcId: number;
}
