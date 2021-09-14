using AutoMapper;
using Gerador.Domain.Identity;
using Gerador.Repository.Context;
using Gerador.Repository.Repositories;
using Gerador.Repository.Repository;
using Gerador.WebAPI.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Text;

namespace Gerador.WebAPI
{
    public class Startup
    {
      
        public IConfiguration Configuration { get; set; }
        /// <summary>
        /// Adiciona para o configuration builder o arquivo de configuracao json
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            var builder = new ConfigurationBuilder().AddJsonFile("config.json");
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var conn = Configuration.GetConnectionString("GeradorDB");

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
           /* services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });*/

            //especifica qual projeto está o entity framework
            services.AddDbContext<GeradorContext>(options => options.UseLazyLoadingProxies()
                                                  .UseMySql(conn, m => m.MigrationsAssembly("Gerador.Repository")));

            /*configuração de segurança oauth*/
            services.AddIdentityCore<User>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;

                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.AllowedForNewUsers = true;
            })
            .AddRoles<Role>()
            .AddEntityFrameworkStores<GeradorContext>()
            .AddRoleValidator<RoleValidator<Role>>()
            .AddSignInManager<SignInManager<User>>()
            .AddDefaultTokenProviders();

            /*configuração de segurança oauth*/

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                    
                });


            services.AddScoped<IGeradorRepository, GeradorRepository>();//
            //services.AddMvcCore();

            //services.AddAutoMapper();

            services.AddMvcCore(options => {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfiles());
            });

            IMapper mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);

            services.AddControllers(); 
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                IdentityModelEventSource.ShowPII = true;
            }

            //app.UseHttpsRedirection();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
