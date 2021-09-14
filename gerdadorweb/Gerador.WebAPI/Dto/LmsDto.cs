using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.WebAPI.Dto
{
    public class LmsDto
    {
        public int Id { get; set; }

        //[Required(ErrorMessage = "Abreviação da máquina é obrigatório")]
        //[Range(1, 5, ErrorMessage = "Tamanho deve estar entre 1 e 5 caracteres")]
        public string AbrevMaquina { get; set; }

        //[Required(ErrorMessage = "Número da máquina é obrigatório")]
        //[Range(1, 10, ErrorMessage = "Tamanho deve estar entre 1 e 10 caracteres")]
        public string NumMaquina { get; set; }

        //[Required(ErrorMessage = "TagOP é obrigatório")]
        //[Range(1, 255, ErrorMessage = "Tamanho deve estar entre 1 e 255 caracteres")]
        public string TagOP { get; set; }

        //[Required(ErrorMessage = "Id da configuração é obrigatório")]
        public virtual ConfiguracaoDto Configuracao { get; set; }

       // public virtual IList<LmsTipoVariavelDto> LmsTipoVariavels { get; set; }
    }
}
