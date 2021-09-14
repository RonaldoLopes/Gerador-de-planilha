using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Gerador.WebAPI.Dto
{
    public class PlcDto
    {
        public int Id { get; set; }

        //[Required(ErrorMessage = "Descrição do PLC é obrigatório")]
        //[Range(1, 45, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        public string PlcDesc { get; set; }
        //
        //[Required(ErrorMessage = "Endereço de IP é obrigatório")]
        //[Range(1, 15, ErrorMessage = "Tamanho deve estar entre 1 e 15 caracteres")]
        public string IP { get; set; }

        //[Required(ErrorMessage = "Endereço do PLC é obrigatório")]
        //[Range(1, 65, ErrorMessage = "Tamanho deve estar entre 1 e 65 caracteres")]
        public string EnderecoPLC { get; set; }

        //[Required(ErrorMessage = "Canal IGS é obrigatório")]
        //[Range(1, 55, ErrorMessage = "Tamanho deve estar entre 1 e 55 caracteres")]
        public string CanalIGS { get; set; }

        //[Required(ErrorMessage = "Device IGS é obrigatório")]
        //[Range(1, 45, ErrorMessage = "Tamanho deve estar entre 1 e 45 caracteres")]
        public string DeviceIGS { get; set; }

        //[Required(ErrorMessage = "Pasta é obrigatório")]
        //[Range(1, 5, ErrorMessage = "Tamanho deve estar entre 1 e 5 caracteres")]
        public string Pasta { get; set; }

        //[Required(ErrorMessage = "Tag IGS é obrigatório")]
        //[Range(1, 55, ErrorMessage = "Tamanho deve estar entre 1 e 55 caracteres")]
        public string TagIGS { get; set; }

        //[Required(ErrorMessage = "Endereço OPC completo é obrigatório")]
        //[Range(1, 200, ErrorMessage = "Tamanho deve estar entre 1 e 200 caracteres")]
        public string EnderecoOPCFull { get; set; }

        //[Required(ErrorMessage = "ID da configuração é obrigatório")]
        public ICollection<ConfiguracaoDto> Configuracoes { get; set; }

        //[Required(ErrorMessage = "ID da variável é obrigatório")]
        //public virtual TipoVariavelDto TipoVariavel { get; set; }
       // public virtual ICollection<HistorianDto> Historians { get; set; }
    }
}
