using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Gerador.Domain.Entities
{
    public class UM
    {
        [Required(ErrorMessage = "ID é obrigatório")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Descricão é obrigatório")]
        [MaxLength(45, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Sigla é obrigatório")]
        [MaxLength(5, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        public string Sigla { get; set; }
        public virtual ICollection<Ambev> Ambevs { get; set; }
        public virtual ICollection<Historian> Historians { get; set; }
    }
}
