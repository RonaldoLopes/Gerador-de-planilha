using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Gerador.Domain.Entities
{
    public class Lms
    {
        [Required(ErrorMessage = "ID é obrigatório")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Abre. Maquina é obrigatório")]
        [MaxLength(5, ErrorMessage = "Tamanho deve ser no máximo de 5 caracteres")]
        public string AbrevMaquina { get; set; }

        public string NumMaquina { get; set; }

        [Required(ErrorMessage = "TAG OP é obrigatório")]
        [MaxLength(255, ErrorMessage = "Tamanho deve ser no máximo de 255 caracteres")]
        public string TagOP { get; set; }

        [Required(ErrorMessage = "Sufixo TAG é obrigatório")]
        [MaxLength(50, ErrorMessage = "Tamanho deve ser no máximo de 50 caracteres")]
        public string SufixTag { get; set; }

        [Required(ErrorMessage = "TagLMS OP é obrigatório")]
        [MaxLength(255, ErrorMessage = "Tamanho deve ser no máximo de 255 caracteres")]
        public string TagLMS { get; set; }

        [Required(ErrorMessage = "ID é obrigatório")]
        public int ConfiguracaoId { get; set; }
        public virtual Configuracao Configuracao { get; set; }

        [Required(ErrorMessage = "ID é obrigatório")]
        public int TipoVariavelId { get; set; }
        public virtual TipoVariavel TipoVariavel { get; set; }

        [Required(ErrorMessage = "ID é obrigatório")]
        public int TipoVariavelIdFT { get; set; }
        public virtual TipoVariavel TipoVariavelFT { get; set; }
    }
}
