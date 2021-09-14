using Gerador.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gerador.Repository.Config
{
    public class ConfiguracaoConfiguration : IEntityTypeConfiguration<Configuracao>
    {
        public void Configure(EntityTypeBuilder<Configuracao> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Planta).IsRequired().HasMaxLength(45);
            builder.Property(c => c.Linha).IsRequired().HasMaxLength(10);
            builder.Property(c => c.PlantaReduzida).IsRequired().HasMaxLength(4);
            builder.Property(c => c.Servidor).IsRequired().HasMaxLength(20);
            builder.Property(c => c.DescLinha).IsRequired().HasMaxLength(45);
                     
        }
    }
}