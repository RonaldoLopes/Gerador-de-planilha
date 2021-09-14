using Gerador.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gerador.Repository.Config
{
    public class UMConfiguration : IEntityTypeConfiguration<UM>
    {
        public void Configure(EntityTypeBuilder<UM> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Descricao).IsRequired().HasMaxLength(45);
            builder.Property(u => u.Sigla).IsRequired().HasMaxLength(30);

            //dados iniciais add-migration
            builder.HasData(
                new UM() { Id = 1, Descricao = "Metro Cúbico", Sigla = "m³" },
                new UM() { Id = 2, Descricao = "Quilograma", Sigla = "kg" },
                new UM() { Id = 3, Descricao = "Percentual", Sigla = "%" },
                new UM() { Id = 4, Descricao = "Grau Celsius", Sigla = "ºC" },
                new UM() { Id = 5, Descricao = "-", Sigla = "uS" },
                new UM() { Id = 6, Descricao = "Potencial Hidrogeniônico", Sigla = "pH" },
                new UM() { Id = 7, Descricao = "BAR", Sigla = "bar" },
                new UM() { Id = 8, Descricao = "-", Sigla = "ºBx" },
                new UM() { Id = 9, Descricao = "Ampère", Sigla = "A" },
                new UM() { Id = 10, Descricao = "Centímetro", Sigla = "cm" },
                new UM() { Id = 11, Descricao = "Centímetro quadrado", Sigla = "cm²" },
                new UM() { Id = 12, Descricao = "Centímetro cubico", Sigla = "cm³" },
                new UM() { Id = 13, Descricao = "Fahrenheit", Sigla = "°F" },
                new UM() { Id = 14, Descricao = "Hectograma", Sigla = "hg" },
                new UM() { Id = 15, Descricao = "Hectolitro", Sigla = "hL" },
                new UM() { Id = 16, Descricao = "Joule", Sigla = "J" },
                new UM() { Id = 17, Descricao = "Quilo-hertz", Sigla = "kHz" },
                new UM() { Id = 18, Descricao = "Minuto", Sigla = "min" },
                new UM() { Id = 19, Descricao = "Militro", Sigla = "mL" },
                new UM() { Id = 20, Descricao = "Milimetro", Sigla = "mm" },
                new UM() { Id = 21, Descricao = "Milimetro quadrado", Sigla = "mm²" },
                new UM() { Id = 22, Descricao = "Milimetro Cúbico", Sigla = "mm³" },
                new UM() { Id = 23, Descricao = "grama", Sigla = "g" },
                new UM() { Id = 24, Descricao = "Hora", Sigla = "h" },
                new UM() { Id = 25, Descricao = "Centigrama", Sigla = "cg" },
                new UM() { Id = 26, Descricao = "Centilitro", Sigla = "cL" },
                new UM() { Id = 27, Descricao = "Decigrama", Sigla = "dg" },
                new UM() { Id = 28, Descricao = "Decilitro", Sigla = "dL" },
                new UM() { Id = 29, Descricao = "Decímetro", Sigla = "dm" },
                new UM() { Id = 30, Descricao = "Garrafa/Hora", Sigla = "grf/h" },
                new UM() { Id = 31, Descricao = "Garrafa", Sigla = "grf" },
                new UM() { Id = 32, Descricao = "1 / 0", Sigla = "1 / 0" },
                new UM() { Id = 33, Descricao = "seg", Sigla = "seg" },
                new UM() { Id = 34, Descricao = "lt/h", Sigla = "lt/h" },
                new UM() { Id = 35, Descricao = "lt", Sigla = "lt" },
                new UM() { Id = 36, Descricao = "-", Sigla = "-" },
                new UM() { Id = 37, Descricao = "1 / 0 ou %", Sigla = "1 / 0 ou %" },
                new UM() { Id = 38, Descricao = "1 / 0 ou kgf/cm2", Sigla = "1 / 0 ou kgf/cm2" },
                new UM() { Id = 39, Descricao = "kgf/cm2", Sigla = "kgf/cm2" },
                new UM() { Id = 40, Descricao = "Kilograma Forca por cm2", Sigla = "Kilograma Forca por cm2" },
                new UM() { Id = 41, Descricao = "Kilowhat Hora", Sigla = "kwh" },
                new UM() { Id = 42, Descricao = "MICRO SIEMENS/CM", Sigla = "MICRO SIEMENS/CM" },
                new UM() { Id = 43, Descricao = "Oximetro", Sigla = "Oximetro" },
                new UM() { Id = 44, Descricao = "Partes por bilhão", Sigla = "PPB" },
                new UM() { Id = 45, Descricao = "Segundos", Sigla = "s" },
                new UM() { Id = 46, Descricao = "Unidade de Pasteurização", Sigla = "Unidade de Pasteurização" },
                new UM() { Id = 47, Descricao = "Lata", Sigla = "Lata" },
                new UM() { Id = 48, Descricao = "Lata por hora", Sigla = "Lata por hora" },
                new UM() { Id = 49, Descricao = "OK/NOK", Sigla = "OK/NOK" },
                new UM() { Id = 50, Descricao = "UP", Sigla = "UP" },
                new UM() { Id = 51, Descricao = "?", Sigla = "?" }
                );
        }
    }
}