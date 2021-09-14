using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.Domain.Entities
{
    public class TipoVariavel
    {
        [Required(ErrorMessage = "ID é obrigatório")]
        public int Id { get; set; }
        public string Descricao { get; set; }
        public virtual ICollection<Plc> Plcs { get; set; }
        public virtual ICollection<Ambev> Ambevs { get; set; }
        public virtual ICollection<Historian> Historians { get; set; }
        public virtual ICollection<Lms> LMSs { get; set; }
        public virtual ICollection<Lms> LMSsFT { get; set; }

        public virtual ICollection<IGS> IGSs { get; set; }
        public virtual ICollection<IGS> IGSsFT { get; set; }
    }

}
