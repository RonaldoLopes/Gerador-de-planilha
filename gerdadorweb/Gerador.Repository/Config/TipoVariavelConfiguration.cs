using Gerador.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gerador.Repository.Config
{
    public class TipoVariavelConfiguration : IEntityTypeConfiguration<TipoVariavel>
    {
        public void Configure(EntityTypeBuilder<TipoVariavel> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Descricao).IsRequired().HasMaxLength(40);
            builder.HasMany(t => t.Ambevs).WithOne(a => a.TipoVariavel);//um pra muitos
            builder.HasMany(t => t.Historians).WithOne(h => h.TipoVariavel);

            //dados iniciais add-migration
            builder.HasData(
                //Tipo variável PLC
                new TipoVariavel() { Id = 1, Descricao = "Boolean"},
                new TipoVariavel() { Id = 2, Descricao = "SingleInteger" },
                new TipoVariavel() { Id = 3, Descricao = "Integer" },
                new TipoVariavel() { Id = 4, Descricao = "DoubleInteger" },
                new TipoVariavel() { Id = 5, Descricao = "DINT" },
                new TipoVariavel() { Id = 6, Descricao = "SingleFloat" },
                new TipoVariavel() { Id = 7, Descricao = "Float" },
                new TipoVariavel() { Id = 8, Descricao = "Double" },
                //Variável Historian
                new TipoVariavel() { Id = 9, Descricao = "_A" },
                new TipoVariavel() { Id = 10, Descricao = "_L" },
                new TipoVariavel() { Id = 11, Descricao = "_AVO" },
                new TipoVariavel() { Id = 12, Descricao = "_CIK_C" },
                new TipoVariavel() { Id = 13, Descricao = "_CIK" },
                new TipoVariavel() { Id = 14, Descricao = "_CIK_L" },
                new TipoVariavel() { Id = 15, Descricao = "_CIK_Q" },
                new TipoVariavel() { Id = 16, Descricao = "_COD_FORMATO" },
                new TipoVariavel() { Id = 17, Descricao = "_KT" },
                new TipoVariavel() { Id = 18, Descricao = "_OA" },
                new TipoVariavel() { Id = 19, Descricao = "_Q" },
                new TipoVariavel() { Id = 20, Descricao = "_S" },
                new TipoVariavel() { Id = 21, Descricao = "_SP_T1" },
                new TipoVariavel() { Id = 22, Descricao = "_SP_T2" },
                new TipoVariavel() { Id = 23, Descricao = "_SP_T3" },
                new TipoVariavel() { Id = 24, Descricao = "_SP_T4" },
                new TipoVariavel() { Id = 25, Descricao = "_Status" },
                new TipoVariavel() { Id = 26, Descricao = "_T" },
                new TipoVariavel() { Id = 27, Descricao = "_UP" },
                new TipoVariavel() { Id = 28, Descricao = "_ZA_CIK_TAL" },
                new TipoVariavel() { Id = 29, Descricao = "_ZP_CIK_TAL" },
                new TipoVariavel() { Id = 30, Descricao = "_P" },
                new TipoVariavel() { Id = 31, Descricao = "-" },
                new TipoVariavel() { Id = 32, Descricao = "" },
                new TipoVariavel() { Id = 33, Descricao = "Boolean ou Float" },
                new TipoVariavel() { Id = 34, Descricao = "Word"}
                );
        }
    }
}

