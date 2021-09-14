using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.WebAPI.Dto
{
    public class AmbevDto
    {
        public int Id { get; set; }

       // [Required(ErrorMessage = "Código da planilha de controle é obrigatório")]
        //[Range(1, 45, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        public string CodPlanControl { get; set; }

        //[Required(ErrorMessage = "Nome da planilha de controle é obrigatório")]
       // [Range(1, 25, ErrorMessage = "Tamanho deve estar entre 1 e 25 caracteres")]
        public string NomPlaniControl { get; set; }

       /// [Required(ErrorMessage = "Código do grupo item de controle é obrigatório")]
      //  [Range(1, 15, ErrorMessage = "Tamanho deve estar entre 1 e 15 caracteres")]
        public string CodGrupoItemPlani { get; set; }

      //  [Required(ErrorMessage = "Nome do grupo item de controle é obrigatório")]
      //  [Range(1, 35, ErrorMessage = "Tamanho deve estar entre 1 e 35 caracteres")]
        public string NomGrupoItemPlani { get; set; }

       // [Required(ErrorMessage = "Código do item de controle é obrigatório")]
       // [Range(1, 10, ErrorMessage = "Tamanho deve estar entre 1 e 10 caracteres")]
        public string CodItemControle { get; set; }

       // [Required(ErrorMessage = "Nome do item de controle é obrigatório")]
      //  [Range(1, 100, ErrorMessage = "Tamanho deve estar entre 1 e 100 caracteres")]
        public string NomeItemControle { get; set; }

      //  [Required(ErrorMessage = "Código item planilha é obrigatório")]
      //  [Range(1, 10, ErrorMessage = "Tamanho deve estar entre 1 e 10 caracteres")]
        public string CodItemPlanilha { get; set; }
             
      //  [MaxLength(45, ErrorMessage = "Tamanho máximo de 45 carateres")]
        public string CCP_ICL { get; set; }

       // [Required(ErrorMessage = "Obrigatório é obrigatório")]
      //  [Range(1, 3, ErrorMessage = "Tamanho deve estar entre 1 e 3 caracteres")]
        public string Obrigatorio { get; set; }

       // [MaxLength(45, ErrorMessage = "Tamanho máximo é de 45 caracteres")]
        public string EspecifiHistorico { get; set; }

       // [Required(ErrorMessage = "Regra de coleta de automação é obrigatório")]
       // [Range(1, 120, ErrorMessage = "Tamanho deve estar entre 1 e 120 caracteres")]
        public string RegraColetaAutoma { get; set; }

      //  [MaxLength(45, ErrorMessage = "Tamanho máximo é de 120 caracteres")]
        public string ComentarioAmbev { get; set; }

       // [MaxLength(45, ErrorMessage = "Tamanho máximo é de 100 caracteres")]
        public string FrequenciaWorkf { get; set; }

       // [MaxLength(45, ErrorMessage = "Tamanho máximo é de 100 caracteres")]
        public string CondBasicaWorkFlo { get; set; }

       // [MaxLength(45, ErrorMessage = "Tamanho máximo é de 100 caracteres")]
        public string CondEspeciWorkFlo { get; set; }

       // [RegularExpression("([0-9]+)", ErrorMessage = "Somente números")]
        public Int32 ValorColetadoWorFlo { get; set; }

       // [Required(ErrorMessage = "P. prod Mes é obrigatório")]
      //  [Range(1, 10, ErrorMessage = "Tamanho deve estar entre 1 e 10 caracteres")]
        public string PProdMes { get; set; }

       // [Required(ErrorMessage = "Código da configuração é obrigatório")]
        public virtual ConfiguracaoDto Configuracao { get; set; }

       // [Required(ErrorMessage = "Código da UM é obrigatório")]
        public virtual UmDto UM { get; set; }

       // [Required(ErrorMessage = "Código da variável é obrigatório")]
        public virtual TipoVariavelDto TipoVariavel { get; set; }
        public virtual ICollection<HistorianDto> Historians { get; set; }
    }
}
