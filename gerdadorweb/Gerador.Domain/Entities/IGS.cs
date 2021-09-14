
namespace Gerador.Domain.Entities
{
   public class IGS
    {
        public int Id { get; set; }
        public string TagName { get; set; }

        public string Address { get; set; }

        public int ScanRate { get; set; }

        public int RespDataType { get; set; }

        public string FormTag { get; set; }

        public string ClientAccess { get; set; }
        public int TipoVariavelId { get; set; }
        public virtual TipoVariavel TipoVariavel { get; set; }

        public int TipoVariavelIdFT { get; set; }
        public virtual TipoVariavel TipoVariavelFT { get; set; }

        public int PLCId { get; set; }
        public virtual Plc Plc { get; set; }

        public int ConfiguracaoId { get; set; }
        public virtual Configuracao Configuracao { get; set; }

    }
}
