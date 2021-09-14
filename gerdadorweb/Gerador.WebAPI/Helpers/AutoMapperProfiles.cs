using AutoMapper;
using Gerador.Domain.Entities;
using Gerador.Domain.Identity;
using Gerador.WebAPI.Dto;

namespace Gerador.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            /*CreateMap<Configuracao, ConfiguracaoDto>();
            CreateMap<ConfiguracaoDto, Configuracao>();

            CreateMap<UM, UmDto>();
            CreateMap<UmDto, UM>();

            CreateMap<Ambev, AmbevDto>();
            CreateMap<AmbevDto, Ambev>();

            CreateMap<Historian, HistorianDto>();
            CreateMap<HistorianDto, Historian>();

            CreateMap<Lms, LmsDto>();
            CreateMap<LmsDto, Lms>();*/

           // CreateMap<LmsTipoVariavel, LmsTipoVariavelDto>();
          // CreateMap<LmsTipoVariavelDto, LmsTipoVariavel>();

           /* CreateMap<Plc, PlcDto>();
            CreateMap<PlcDto, Plc>();

            CreateMap<TipoVariavel, TipoVariavelDto>();


            CreateMap<TipoVariavelDto, TipoVariavel>();*/

            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<User, UserLoginDto>().ReverseMap();

            
        }
    }
}
