using Gerador.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gerador.Repository.Config
{
    class IGSConfiguration : IEntityTypeConfiguration<IGS>
    {
        public void Configure(EntityTypeBuilder<IGS> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.TagName).IsRequired().HasMaxLength(50);
            builder.Property(i => i.Address).IsRequired().HasMaxLength(20);
            builder.Property(i => i.ScanRate).IsRequired();
            builder.Property(i => i.RespDataType).IsRequired();
            builder.Property(i => i.ClientAccess).IsRequired().HasMaxLength(20);
            builder.Property(i => i.FormTag).IsRequired().HasMaxLength(10);
            builder.HasOne<Configuracao>(cf => cf.Configuracao)
                .WithMany(cf => cf.IGSs)
                .HasForeignKey(i => i.ConfiguracaoId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<TipoVariavel>(l => l.TipoVariavel)
               .WithMany(c => c.IGSs)
               .HasForeignKey(l => l.TipoVariavelId)
               .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<TipoVariavel>(l => l.TipoVariavelFT)
                .WithMany(c => c.IGSsFT)
                .HasForeignKey(l => l.TipoVariavelIdFT)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
