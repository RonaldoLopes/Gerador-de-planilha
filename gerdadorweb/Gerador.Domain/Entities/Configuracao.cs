using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.Domain.Entities
{
    public class Configuracao
    {
        [Required(ErrorMessage = "ID é obrigatório")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Planta é obrigatório")]
        //[Range(1, 45, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        [MaxLength(45, ErrorMessage = "Tamanho deve ser no máximo de 45 caracteres")]
        public string Planta { get; set; }

        [Required(ErrorMessage = "Linha é obrigatório")]
        [MaxLength(10, ErrorMessage = "Tamanho deve ser no máximo de 10 caracteres")]
        public string Linha { get; set; }

        [Required(ErrorMessage = "Planta reduzida é obrigatório")]
        [MaxLength(4, ErrorMessage = "Tamanho deve ser no máximo de 45 caracteres")]
        public string PlantaReduzida { get; set; }

        [Required(ErrorMessage = "Servidor é obrigatório")]
        [MaxLength(20, ErrorMessage = "Tamanho deve ser no máximo de 20 caracteres")]
        public string Servidor { get; set; }

        [Required(ErrorMessage = "Descrição da linha é obrigatório")]
        [MaxLength(45, ErrorMessage = "Tamanho deve ser no máximo de 45 caracteres")]
        public string DescLinha { get; set; }

        public virtual ICollection<Plc> Plcs { get; set; }
        public virtual ICollection<Lms> LMSs { get; set; }
        public virtual ICollection<Historian> Historians { get; set; }
        public virtual ICollection<IGS> IGSs { get; set; }


    }
}
