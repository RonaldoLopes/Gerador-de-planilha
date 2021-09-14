using System.Threading.Tasks;
using Gerador.Domain.Entities;

namespace Gerador.Repository.Repositories
{
    public interface IGeradorRepository
    {
        #region geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();
        #endregion

        //Listagens
        #region um
        Task<UM[]> GetAllUMAsync();
        Task<UM> GetAllUMAsyncById(int UmId);
        Task<UM> GetAllUMAsyncByDesc(string descricao);
        #endregion
        #region tipovariavel
        Task<TipoVariavel[]> GetAllTPAsync();
        Task<TipoVariavel> GetTPAsyncById(int TpId);
        Task<TipoVariavel> GetTPAsyncByDesc(string descricao);
        #endregion
        #region configuracoes
        Task<Configuracao[]> GetAllConfigAsync();
        Task<Configuracao> GetConfAsyncById(int TpId);
        Task<Configuracao> GetConfAsyncByPlanta(string descricao);
        #endregion
        #region ambev
        Task<Ambev[]> GetAllAmbevAsync();
        Task<Ambev> GetAmbevAsyncById(int Id);
        Task<Ambev> GetAmbevAsyncByChoose(string campo, string dado);
        #endregion
        #region plc
        Task<Plc[]> GetAllPlcAsync();
        Task<Plc> GetPlcAsyncById(int Id);
        Task<Plc> GetPlcAsyncByChoose(string campo, string dado);
        #endregion
        #region historian
        Task<Historian[]> GetAllHistAsync();
        Task<Historian> GetHistAsyncById(int Id);
        Task<Historian> GetHistAsyncByChoose(string campo, string dado);
        #endregion
    }
}