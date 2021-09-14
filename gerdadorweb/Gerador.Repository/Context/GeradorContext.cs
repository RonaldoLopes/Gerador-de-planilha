using Gerador.Domain.Entities;
using Gerador.Domain.Identity;
using Gerador.Repository.Config;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Gerador.Repository.Context
{
    public class GeradorContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>,
                                                    UserRole, IdentityUserLogin<int>,
                                                    IdentityRoleClaim<int>,
                                                    IdentityUserToken<int>>
    /*
     public class GeradorContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>,
                                                UserRole, IdentityUserLogin<int>,
                                                IdentityRoleClaim<int>,
                                                IdentityUserToken<int>>*/
    {
        public GeradorContext(DbContextOptions<GeradorContext> options) : base(options)
        { }
        public DbSet<Configuracao> Configuracoes { get; set; }
        public DbSet<Lms> Lmss { get; set; }
        public DbSet<Plc> Plcs { get; set; }
        public DbSet<TipoVariavel> TipoVariaveis { get; set; }
        public DbSet<Ambev> Ambevs { get; set; }
        //public DbSet<LmsTipoVariavel> LmsTipoVariaveis  { get; set; }
        public DbSet<UM> UMs { get; set; }
        public DbSet<Historian> Historians { get; set; }

        public DbSet<IGS> IgSs { get; set; }

        public DbSet<User> Users { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            modelBuilder.ApplyConfiguration(new ConfiguracaoConfiguration());
            modelBuilder.ApplyConfiguration(new LmsConfiguration());
            modelBuilder.ApplyConfiguration(new PlcConfiguration());
            modelBuilder.ApplyConfiguration(new TipoVariavelConfiguration());
            modelBuilder.ApplyConfiguration(new AmbevConfiguration());
            //modelBuilder.ApplyConfiguration(new LmsTipoVariavelConfiguration());
            modelBuilder.ApplyConfiguration(new UMConfiguration());
            modelBuilder.ApplyConfiguration(new HistorianConfiguration());
            modelBuilder.ApplyConfiguration(new IGSConfiguration());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies()
                .ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.DetachedLazyLoadingWarning));//desativa aviso sobre ASNoTracking
        }
    }
}
