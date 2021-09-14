using Gerador.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gerador.Repository.Config
{
    class AmbevConfiguration : IEntityTypeConfiguration<Ambev>
    {
        public void Configure(EntityTypeBuilder<Ambev> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.CodPlanControl).HasMaxLength(5);
            builder.Property(a => a.NomPlaniControl).HasMaxLength(50);
            builder.Property(a => a.CodGrupoItemPlani).HasMaxLength(50);

            builder.Property(a => a.NomGrupoItemPlani).HasMaxLength(50);
            builder.Property(a => a.CodItemControle).HasMaxLength(50);
            builder.Property(a => a.NomeItemControle).HasMaxLength(300);


            builder.Property(a => a.CodItemPlanilha).HasMaxLength(50);
            builder.Property(a => a.CCP_ICL).HasMaxLength(50);

            builder.Property(a => a.Obrigatorio).HasMaxLength(4);
            builder.Property(a => a.EspecifiHistorico).HasMaxLength(250);
            builder.Property(a => a.RegraColetaAutoma).HasMaxLength(150);

            builder.Property(a => a.ComentarioAmbev).HasMaxLength(400);
            builder.Property(a => a.FrequenciaWorkf).HasMaxLength(350);
            builder.Property(a => a.CondBasicaWorkFlo).HasMaxLength(100);
            builder.Property(a => a.ValorColetadoWorFlo).HasMaxLength(10);
            builder.Property(a => a.CondEspeciWorkFlo).HasMaxLength(150);
            builder.Property(a => a.PProdMES).HasMaxLength(20);
            

            //builder.Property(a => a.TipoLinha).IsRequired().HasMaxLength(50);

            /*builder.HasOne<Configuracao>(a => a.Configuracao)
                 .WithMany(c => c.Ambevs)
                 .HasForeignKey(a => a.ConfiguracaoId)
                 .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<UM>(u => u.UM)
                 .WithMany(u => u.Ambevs)
                 .HasForeignKey(a => a.UmId)
                 .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<TipoVariavel>(a => a.TipoVariavel)
                 .WithMany(t => t.Ambevs)
                 .HasForeignKey(a => a.TipoVariavelId)
                 .OnDelete(DeleteBehavior.Cascade);*/

        }
    }
}