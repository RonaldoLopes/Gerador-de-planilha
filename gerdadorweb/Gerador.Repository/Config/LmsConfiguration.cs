using Gerador.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gerador.Repository.Config
{
    public class LmsConfiguration : IEntityTypeConfiguration<Lms>
    {
        public void Configure(EntityTypeBuilder<Lms> builder)
        {
            builder.HasKey(l => l.Id);
            builder.Property(l => l.AbrevMaquina).IsRequired().HasMaxLength(5);
            builder.Property(l => l.NumMaquina).IsRequired(false).HasMaxLength(10);
            builder.Property(l => l.TagOP).IsRequired().HasMaxLength(255);
            builder.Property(l => l.SufixTag).IsRequired().HasMaxLength(50);
            builder.Property(l => l.TagLMS).IsRequired().HasMaxLength(255);
            builder.HasOne<TipoVariavel>(l => l.TipoVariavel)
                .WithMany(c => c.LMSs)
                .HasForeignKey(l => l.TipoVariavelId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<TipoVariavel>(l => l.TipoVariavelFT)
                .WithMany(c => c.LMSsFT)
                .HasForeignKey(l => l.TipoVariavelIdFT)
                .OnDelete(DeleteBehavior.Cascade);
            /*builder.HasOne<Configuracao>(l => l.Configuracao)
                .WithMany(c => c.LMSs)
                .HasForeignKey(l => l.ConfiguracaoId)
                .OnDelete(DeleteBehavior.Cascade);*/
        }
    }
}
