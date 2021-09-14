using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.Domain.Entities
{
    public class Plc
    {
        [Required(ErrorMessage = "ID é obrigatório")]
        public int Id { get; set; }
        [Required(ErrorMessage = "Descrição do PLC é obrigatório")]
        [MaxLength(45, ErrorMessage = "Tamanho deve ser no máximo de 45 caracteres")]
        public string PlcDesc { get; set; }

        [Required(ErrorMessage = "Endereço de IP é obrigatório")]
        [MaxLength(15, ErrorMessage = "Tamanho deve ser no máximo de 15 caracteres")]
        public string IP { get; set; }

        [MaxLength(65, ErrorMessage = "Tamanho deve ser no máximo de 65 caracteres")]
        public string EnderecoPLC { get; set; }

        [Required(ErrorMessage = "Canal IGS é obrigatório")]
        [MaxLength(55, ErrorMessage = "Tamanho deve ser no máximo de 55 caracteres")]
        public string CanalIGS { get; set; }

        [Required(ErrorMessage = "Device IGS é obrigatório")]
        [MaxLength(45, ErrorMessage = "Tamanho deve ser no máximo de 45 caracteres")]
        public string DeviceIGS { get; set; }

        [Required(ErrorMessage = "Pasta é obrigatório")]
        [MaxLength(5, ErrorMessage = "Tamanho deve ser no máximo de 5 caracteres")]
        public string Pasta { get; set; }

        [MaxLength(55, ErrorMessage = "Tamanho deve ser no máximo de 55 caracteres")]
        public string TagIGS { get; set; }

        [Required(ErrorMessage = "Endereço OPC completo é obrigatório")]
        [MaxLength(200, ErrorMessage = "Tamanho deve ser no máximo de 200 caracteres")]
        public string EnderecoOPCFull { get; set; }

        [Required(ErrorMessage = "Validação Smart TAG é obrigatório")]
        [MaxLength(40, ErrorMessage = "Tamanho deve ser no máximo de 40 caracteres")]
        public string ValidSmartTag { get; set; }

        [MaxLength(5, ErrorMessage = "Tamanho deve ser no máximo de 5 caracteres")]
        public string AbrevPLC { get; set; }

        [Required(ErrorMessage = "ID da configuração é obrigatório")]
        public int ConfiguracaoId { get; set; }
        public virtual Configuracao Configuracao { get; set; }

        [Required(ErrorMessage = "ID da variável é obrigatório")]
        public int TipoVariavelId { get; set; }
        public virtual TipoVariavel TipoVariavel { get; set; }

        public virtual ICollection<IGS> IGSs { get; set; }
    }
}
