using Gerador.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gerador.Repository.Config
{
    public class HistorianConfiguration : IEntityTypeConfiguration<Historian>
    {
        public void Configure(EntityTypeBuilder<Historian> builder)
        {
            builder.HasKey(h => h.Id);
            builder.Property(h => h.NivelInstru).IsRequired().HasMaxLength(55);

            builder.Property(h => h.LInstalacao).IsRequired().HasMaxLength(100);
            builder.Property(h => h.Local23NivelSAP).HasMaxLength(45);
            builder.Property(h => h.Iniciativa).IsRequired().HasMaxLength(10);
            builder.Property(h => h.TagHistorian).HasMaxLength(150);
            builder.Property(h => h.Descricao).IsRequired().HasMaxLength(150);
            builder.Property(h => h.ComentarioHistoria).IsRequired().HasMaxLength(255);
            builder.Property(h => h.ValidTagHistorian).IsRequired().HasMaxLength(100);
            builder.Property(h => h.Evidencia).HasMaxLength(100);
            builder.Property(h => h.ComentaFinal).IsRequired().HasMaxLength(100);
            builder.Property(h => h.CollectionType).IsRequired().HasMaxLength(150);
            builder.Property(h => h.CollectionInterval).IsRequired().HasMaxLength(11);
            builder.Property(h => h.CollectorCompression).IsRequired();
            builder.Property(h => h.CollectorCompressorTimeOut).IsRequired();
            builder.Property(h => h.CollectDeadPercenRange).IsRequired();
            builder.Property(h => h.AbrevMaquina).IsRequired().HasMaxLength(5);
            builder.Property(h => h.NumMaquina).IsRequired().HasMaxLength(10);
            builder.Property(a => a.PProdMes).HasMaxLength(10);
            builder.Property(h => h.CollectorName).IsRequired().HasMaxLength(150);
            builder.Property(h => h.HiScale).IsRequired(false).HasMaxLength(10);
            /*builder.HasOne<Plc>(h => h.Plc)
                .WithMany(p => p.Historians)
                .HasForeignKey(h => h.PlcId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<Configuracao>(h => h.Configuracao)
                .WithMany(c => c.Historians)
                .HasForeignKey(h => h.PlcId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<Ambev>(h => h.Ambev)
                .WithMany(a => a.Historians)
                .HasForeignKey(h => h.PlcId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<TipoVariavel>(h => h.TipoVariavel)
                .WithMany(t => t.Historians)
                .HasForeignKey(h => h.PlcId)
                .OnDelete(DeleteBehavior.Cascade);*/
        }
    }
}
