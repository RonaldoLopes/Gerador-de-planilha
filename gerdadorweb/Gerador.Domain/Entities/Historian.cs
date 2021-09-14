using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.Domain.Entities
{
    public class Historian
    {
        [Required(ErrorMessage = "ID é obrigatório")]
        public int Id { get; set; }

        [Required(ErrorMessage = "NivelInstru é obrigatório")]
        [MaxLength(55, ErrorMessage = "Tamanho deve ser no máximo de 55 caracteres")]
        public string NivelInstru { get; set; }

        [Required(ErrorMessage = "LInstalacao é obrigatório")]
        [MaxLength(100, ErrorMessage = "Tamanho deve ser no máximo de 100 caracteres")]
        public string LInstalacao { get; set; }

        [MaxLength(45, ErrorMessage = "Tamanho deve ser no máximo de 45 caracteres")]
        public string Local23NivelSAP { get; set; }

        [Required(ErrorMessage = "Iniciativa é obrigatório")]
        [MaxLength(10, ErrorMessage = "Tamanho deve ser no máximo de 10 caracteres")]
        public string Iniciativa { get; set; }

        [MaxLength(150, ErrorMessage = "Tamanho deve ser no máximo de 150 caracteres")]
        public string TagHistorian { get; set; }

        [Required(ErrorMessage = "Descricao é obrigatório")]
        [MaxLength(150, ErrorMessage = "Tamanho deve ser no máximo de 150 caracteres")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "ComentarioHistoria é obrigatório")]
        [MaxLength(255, ErrorMessage = "Tamanho deve ser no máximo de 255 caracteres")]
        public string ComentarioHistoria { get; set; }

        [MaxLength(100, ErrorMessage = "Tamanho deve ser no máximo de 100 caracteres")]
        public string ValidTagHistorian { get; set; }

        [MaxLength(100, ErrorMessage = "Tamanho deve ser no máximo de 100 caracteres")]
        public string Evidencia { get; set; }

        [Required(ErrorMessage = "ComentaFinal é obrigatório")]
        [MaxLength(100, ErrorMessage = "Tamanho deve ser no máximo de 100 caracteres")]
        public string ComentaFinal { get; set; }

        [Required(ErrorMessage = "CollectionType é obrigatório")]
        [MaxLength(150, ErrorMessage = "Tamanho deve ser no máximo de 150 caracteres")]
        public string CollectionType { get; set; }

        [Required(ErrorMessage = "CollectionType é obrigatório")]
        public int CollectionInterval { get; set; }

        [Required(ErrorMessage = "CollectorCompression é obrigatório")]
        public bool CollectorCompression { get; set; }

        [Required(ErrorMessage = "CollectorCompressorTimeOut é obrigatório")]
        public int CollectorCompressorTimeOut { get; set; }

        [Required(ErrorMessage = "CollectDeadPercenRange é obrigatório")]
        public int CollectDeadPercenRange { get; set; }

        [Required(ErrorMessage = "AbrevMaquina é obrigatório")]
        [MaxLength(5, ErrorMessage = "Tamanho deve ser no máximo de 5 caracteres")]
        public string AbrevMaquina { get; set; }

        [Required(ErrorMessage = "NumMaquina é obrigatório")]
        [MaxLength(10, ErrorMessage = "Tamanho deve ser no máximo de 10 caracteres")]
        public string NumMaquina { get; set; }

        [Required(ErrorMessage = "ID é obrigatório")]
        public int PlcId { get; set; }
        public virtual Plc Plc { get; set; }

        [Required(ErrorMessage = "ID é obrigatório")]
        public int ConfiguracaoId { get; set; }
        public virtual Configuracao Configuracao { get; set; }

        [Required(ErrorMessage = "ID é obrigatório")]
        public int AmbevId { get; set; }
        public virtual Ambev Ambev { get; set; }

        [Required(ErrorMessage = "ID é obrigatório")]
        public int UmId { get; set; }
        public virtual UM UM { get; set; }

        [Required(ErrorMessage = "ID é obrigatório")]
        public int TipoVariavelId { get; set; }
        public virtual TipoVariavel TipoVariavel { get; set; }

        public string PProdMes { get; set; }

        public string CollectorName { get; set; }
        public string HiScale { get; set; }
    }
}
