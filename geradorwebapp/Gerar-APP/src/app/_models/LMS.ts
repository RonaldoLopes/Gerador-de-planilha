import { LmsTipoVariavel } from './LmsTipoVariavel';
export interface LMS {
     id: number;
     abrevMaquina: string;
     numMaquina: string;
     tagOP: string;
     sufixTag: string;
     tagLMS: string;
     configuracaoId: number;
     planta: string;
     linha: string;
     sigla: string;
     tipoVariavelId: number;
     tipoVarIdDesc: string;
     tipoVariavelIdFT: number;
     tipoVarIdFTDesc: string;
}
