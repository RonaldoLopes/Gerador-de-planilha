using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Gerador.Domain.Entities
{
    public class Ambev
    {
        public int Id { get; set; }

        public string CodPlanControl { get; set; }

        public string NomPlaniControl { get; set; }

        public string CodGrupoItemPlani { get; set; }

        public string NomGrupoItemPlani { get; set; }

        public string CodItemControle { get; set; }

        public string NomeItemControle { get; set; }

        public string CodItemPlanilha { get; set; }

        public string CCP_ICL { get; set; }

        public string Obrigatorio { get; set; }

        public string EspecifiHistorico { get; set; }

        public string RegraColetaAutoma { get; set; }

        public string ComentarioAmbev { get; set; }

        public string FrequenciaWorkf { get; set; }

        public string CondBasicaWorkFlo { get; set; }

        public string CondEspeciWorkFlo { get; set; }

        public string ValorColetadoWorFlo { get; set; }
        public string TipoLinha { get; set; }
        public string PProdMES { get; set; }

        //public virtual ICollection<Configuracao> Configuracao { get; set; }

        public int UmId { get; set; }
        public virtual UM UM { get; set; }

        public int TipoVariavelId { get; set; }
        public virtual TipoVariavel TipoVariavel { get; set; }
        public virtual ICollection<Historian> Historians { get; set; }
    }
}
