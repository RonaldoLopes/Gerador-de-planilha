import { PLC } from './PLC';
import { Ambev } from './Ambev';
import { Historian } from './Historian';
import { LmsTipoVariavel } from './LmsTipoVariavel';

export interface TipoVariavel {
      id: number;
      descricao: string;
      plcs: PLC[];
      ambev: Ambev[];
      historians: Historian[];
      lmsTipoVariavels: LmsTipoVariavel[];
}
