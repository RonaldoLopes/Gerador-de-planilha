using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.WebAPI.Dto
{
    public class HistorianDto
    {
        public int Id { get; set; }

        //[Required(ErrorMessage = "Nível instrumentação obrigatório")]
        //[Range(1, 55, ErrorMessage = "Tamanho deve estar entre 1 e 55 caracteres")]
        public string NivelInstru { get; set; }

        //[Required(ErrorMessage = "Local da instalação é obrigatório")]
        //[Range(1, 100, ErrorMessage = "Tamanho deve estar entre 1 e 100 caracteres")]
        public string LInstalacao { get; set; }

        //[Required(ErrorMessage = "Nível 23 SAP é obrigatório")]
        //[Range(1, 45, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        public string Local23NivelSAP { get; set; }

        //[Required(ErrorMessage = "Iniciativa é obrigatório")]
        //[Range(1, 10, ErrorMessage = "Tamanho deve estar entre 1 e 10 caracteres")]
        public string Iniciativa { get; set; }

        //[Required(ErrorMessage = "Tag Historian é obrigatório")]
        //[Range(1, 150, ErrorMessage = "Tamanho deve estar entre 1 e 150 caracteres")]
        public string TagHistorian { get; set; }

        //[Required(ErrorMessage = "Descrição é obrigatório")]
        //[Range(1, 100, ErrorMessage = "Tamanho deve estar entre 1 e 100 caracteres")]
        public string Descricao { get; set; }

        //[Required(ErrorMessage = "Comentário é obrigatório")]
        //[Range(1, 255, ErrorMessage = "Tamanho deve estar entre 1 e 255 caracteres")]
        public string ComentarioHistoria { get; set; }

        //[MaxLength(100, ErrorMessage = "Máximo de 100 caracteres")]
        public string ValidTagHistorian { get; set; }

        //[MaxLength(100, ErrorMessage = "Máximo de 100 caracteres")]
        public string Evidencia { get; set; }

        //[MaxLength(100, ErrorMessage = "Máximo de 150 caracteres")]
        public string ComentaFinal { get; set; }

        //[Required(ErrorMessage = "Tipo de coleta é obrigatório")]
        //[Range(1, 11, ErrorMessage = "Tamanho deve estar entre 1 e 11 caracteres")]
        public string CollectionType { get; set; }

        ///[Required(ErrorMessage = "Intervalo de coleta é obrigatório")]
        //[RegularExpression("([0-9]+)", ErrorMessage = "Somente números")]
        public int CollectionInterval { get; set; }

        //[Required(ErrorMessage = "Tipo de coleta é obrigatório")]
        //[Range(typeof(bool), "true", "false", ErrorMessage = "Somente valores booleanos")]
        public bool CollectorCompression { get; set; }

        //[Required(ErrorMessage = "Time Out de compressão é obrigatório")]
        //[RegularExpression("([0-9]+)", ErrorMessage = "Somente números")]
        public int CollectorCompressorTimeOut { get; set; }

        //[Required(ErrorMessage = "Dead Band é obrigatório")]
        //[RegularExpression("([0-9]+)", ErrorMessage = "Somente números")]
        public int CollectDeadPercenRange { get; set; }

        //[Required(ErrorMessage = "Abreviação da máquina é obrigatório")]
        //[Range(1, 5, ErrorMessage = "Tamanho deve estar entre 1 e 5 caracteres")]
        public string AbrevMaquina { get; set; }

       //// [Required(ErrorMessage = "Número da máquina é obrigatório")]
       // [Range(1, 10, ErrorMessage = "Tamanho deve estar entre 1 e 10 caracteres")]
        public string NumMaquina { get; set; }

       // [Required(ErrorMessage = "Id do PLC é obrigatório")]
        public virtual PlcDto Plc { get; set; }

        //[Required(ErrorMessage = "Id da configuração é obrigatório")]
        public virtual ConfiguracaoDto Configuracao { get; set; }

       // [Required(ErrorMessage = "Id Ambev é obrigatório")]
        public virtual AmbevDto Ambev { get; set; }

        //[Required(ErrorMessage = "ID UM é obrigatório")]
        public virtual UmDto UM { get; set; }

       // [Required(ErrorMessage = "Id variável é obrigatório")]
        public virtual TipoVariavelDto TipoVariavel { get; set; }
    }
}
