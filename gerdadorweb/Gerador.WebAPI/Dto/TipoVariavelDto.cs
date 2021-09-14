using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.WebAPI.Dto
{
    public class TipoVariavelDto
    {
        public int Id { get; set; }

        //[Required(ErrorMessage = "Descrição é obrigatório")]
        //[Range(1, 20, ErrorMessage = "Tamanho deve estar entre 1 e 20 caracteres")]
        public string Descricao { get; set; }
    }
}
