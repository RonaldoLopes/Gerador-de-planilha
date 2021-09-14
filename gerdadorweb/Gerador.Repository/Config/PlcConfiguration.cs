using Gerador.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gerador.Repository.Config
{
    public class PlcConfiguration : IEntityTypeConfiguration<Plc>
    {
        public void Configure(EntityTypeBuilder<Plc> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.PlcDesc).IsRequired().HasMaxLength(45);
            builder.Property(p => p.IP).IsRequired().HasMaxLength(15);
            builder.Property(p => p.EnderecoPLC).HasMaxLength(65);
            builder.Property(p => p.CanalIGS).IsRequired().HasMaxLength(55);
            builder.Property(p => p.DeviceIGS).IsRequired().HasMaxLength(45);
            builder.Property(p => p.Pasta).IsRequired().HasMaxLength(5);
            builder.Property(p => p.TagIGS).HasMaxLength(55);
            builder.Property(p => p.EnderecoOPCFull).IsRequired().HasMaxLength(200);
            builder.Property(p => p.ValidSmartTag).IsRequired().HasMaxLength(40);
            builder.Property(p => p.AbrevPLC).HasMaxLength(5);
            /*builder.HasOne<Configuracao>(p => p.Configuracao)
                .WithMany(c => c.Plcs)
                .HasForeignKey(p => p.ConfiguracaoId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<TipoVariavel>(p => p.TipoVariavel)
                .WithMany(t => t.Plcs)
                .HasForeignKey(p => p.TipoVariavelId)
                .OnDelete(DeleteBehavior.Cascade);*/
        }
    }
}
