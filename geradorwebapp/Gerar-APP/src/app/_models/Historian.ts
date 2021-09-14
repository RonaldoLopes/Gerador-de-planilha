export interface Historian {
    id: number;
    nivelInstru: string;
    lInstalacao: string;
    local23NivelSAP: string;
    iniciativa: string;
    tagHistorian: string;
    descricao: string;
    comentarioHistoria: string;
    validTagHistorian: string;
    evidencia: string;
    comentaFinal: string;
    collectionType: string;
    collectionInterval: number;
    collectorCompression: boolean ;
    collectorCompressorTimeOut: number;
    collectDeadPercenRange: number;
    abrevMaquina: string;
    numMaquina: string;
    plcId: number;
    configuracaoId: number;
    ambevId: number;
    umId: number;
    tipoVariavelId: number;
    hiScale: string;
    collectorName: string;
}
