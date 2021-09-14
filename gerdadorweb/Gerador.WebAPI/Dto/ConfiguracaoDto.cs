using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.WebAPI.Dto
{
    public class ConfiguracaoDto
    {
        public int Id { get; set; }
        //[Required(ErrorMessage = "Planta é obrigatório")]
        //[Range(1, 45, ErrorMessage ="Tamanho deve estar entre 1 e 45 caracteres")]
        public string Planta { get; set; }
        //[Required(ErrorMessage = "Linha é obrigatório")]
        //[Range(2, 45, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        public string Linha { get; set; }
        //[Required(ErrorMessage = "Planta reduzida é obrigatório")]
       // [Range(1, 4, ErrorMessage = "Tamanho deve estar entre 1 e 4 caracteres")]
        public string PlantaReduzida { get; set; }
        //[Required(ErrorMessage = "Servidor é obrigatório")]
        //[Range(1, 45, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        public string Servidor { get; set; }
       // [Required(ErrorMessage = "Descrição da linha é obrigatório")]
       //[Range(1, 45, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        public string DescLinha { get; set; }
    }
}
