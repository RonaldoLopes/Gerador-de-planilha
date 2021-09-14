using System.Threading.Tasks;
using Gerador.Domain.Entities;
using Gerador.Repository.Context;
using Gerador.Repository.Repositories;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Gerador.Repository.Repository
{
    //public class GeradorRepository : IGeradorRepository
    public class GeradorRepository : IGeradorRepository
    {
        private readonly GeradorContext _context;

        public GeradorRepository(GeradorContext context)
        {
            _context = context;
        }
        #region metodos gerais
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        #endregion
        #region metodos UM
        public async Task<UM[]> GetAllUMAsync()
        {
            IQueryable<UM> query = _context.UMs
                .AsNoTracking();
            return await query.ToArrayAsync();
        }

        public async Task<UM> GetAllUMAsyncByDesc(string descricao)
        {
            IQueryable<UM> query = _context.UMs
                .AsNoTracking()
                .Where(u => u.Descricao.ToLower().Contains(descricao.ToLower()));
            return await query.FirstOrDefaultAsync();
        }

        public async Task<UM> GetAllUMAsyncById(int UmId)
        {
            IQueryable<UM> query = _context.UMs
                .AsNoTracking()
                .Where(u => u.Id == UmId);
            return await query.FirstOrDefaultAsync();
        }
        #endregion
        #region metodos tipo variavel
        public async Task<TipoVariavel[]> GetAllTPAsync()
        {
            IQueryable<TipoVariavel> query = _context.TipoVariaveis
                .AsNoTracking();
            return await query.ToArrayAsync();
        }

        public async Task<TipoVariavel> GetTPAsyncById(int TpId)
        {
            IQueryable<TipoVariavel> query = _context.TipoVariaveis
                .AsNoTracking()
                .Where(t => t.Id == TpId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<TipoVariavel> GetTPAsyncByDesc(string descricao)
        {
            IQueryable<TipoVariavel> query = _context.TipoVariaveis
                .AsNoTracking()
                .Where(t => t.Descricao.ToLower().Contains(descricao.ToLower()));
            return await query.FirstOrDefaultAsync();
        }
        #endregion
        #region metodos configuracao
        public async Task<Configuracao[]> GetAllConfigAsync()
        {
            IQueryable<Configuracao> query = _context.Configuracoes
                .AsNoTracking();
            return await query.ToArrayAsync();
        }
        public async Task<Configuracao> GetConfAsyncById(int ConfId)
        {
            IQueryable<Configuracao> query = _context.Configuracoes
                .AsNoTracking()
                .Where(c => c.Id == ConfId);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Configuracao> GetConfAsyncByPlanta(string planta)
        {
            IQueryable<Configuracao> query = _context.Configuracoes
                .AsNoTracking()
                .Where(c => c.Planta.ToLower().Contains(planta.ToLower()));
            return await query.FirstOrDefaultAsync();
        }
        #endregion
        #region metodos ambev
        public async Task<Ambev[]> GetAllAmbevAsync()
        {
            IQueryable<Ambev> query = _context.Ambevs
                .AsNoTracking();
            return await query.ToArrayAsync();
        }

        public async Task<Ambev> GetAmbevAsyncById(int Id)
        {
            IQueryable<Ambev> query = _context.Ambevs
                .AsNoTracking()
                .Where(a => a.Id == Id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Ambev> GetAmbevAsyncByChoose(string campo, string dado)
        {          
            switch (campo)
            {                
                case "cpl":
                    IQueryable<Ambev> query = _context.Ambevs
                     .AsNoTracking()
                     .Where(a => a.CodPlanControl.ToLower().Contains(dado.ToLower()));
                    return await query.FirstOrDefaultAsync();
                case "npl":
                    IQueryable<Ambev> query1 = _context.Ambevs
                        .AsNoTracking()
                       .Where(a => a.NomPlaniControl.ToLower().Contains(dado.ToLower()));
                    return await query1.FirstOrDefaultAsync();
                default:
                    break;
            }
            return null;
            
        }
        #endregion
        #region metodos plc
        public async Task<Plc[]> GetAllPlcAsync()
        {
            IQueryable<Plc> query = _context.Plcs;
                //.AsNoTracking();
            return await query.ToArrayAsync();
        }

        public async Task<Plc> GetPlcAsyncById(int Id)
        {
            IQueryable<Plc> query = _context.Plcs
                .AsNoTracking()
                .Where(p => p.Id == Id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Plc> GetPlcAsyncByChoose(string campo, string dado)
        {
            switch (campo)
            {
                case "plc":
                    IQueryable<Plc> query = _context.Plcs
                     .AsNoTracking()
                     .Where(p => p.PlcDesc.ToLower().Contains(dado.ToLower()));
                    return await query.FirstOrDefaultAsync();
                case "ip":
                    IQueryable<Plc> query1 = _context.Plcs
                        .AsNoTracking()
                       .Where(p => p.IP.ToLower().Contains(dado.ToLower()));
                    return await query1.FirstOrDefaultAsync();
                case "end":
                    IQueryable<Plc> query2 = _context.Plcs
                        .AsNoTracking()
                       .Where(p => p.EnderecoPLC.ToLower().Contains(dado.ToLower()));
                    return await query2.FirstOrDefaultAsync();
                default:
                    break;
            }
            return null;
        }
        #endregion
        #region metodos historian
        public async Task<Historian[]> GetAllHistAsync()
        {
            IQueryable<Historian> query = _context.Historians
               .AsNoTracking();
            return await query.ToArrayAsync();
        }
        public async Task<Historian> GetHistAsyncById(int Id)
        {
            IQueryable<Historian> query = _context.Historians
                .AsNoTracking()
                .Where(p => p.Id == Id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Historian> GetHistAsyncByChoose(string campo, string dado)
        {
            switch (campo)
            {
                case "localins":
                    IQueryable<Historian> query = _context.Historians
                     .AsNoTracking()
                     .Where(h => h.LInstalacao.ToLower().Contains(dado.ToLower()));
                    return await query.FirstOrDefaultAsync();
                case "taghist":
                    IQueryable<Historian> query1 = _context.Historians
                        .AsNoTracking()
                       .Where(h => h.TagHistorian.ToLower().Contains(dado.ToLower()));
                    return await query1.FirstOrDefaultAsync();
                case "desc":
                    IQueryable<Historian> query2 = _context.Historians
                        .AsNoTracking()
                       .Where(h => h.Descricao.ToLower().Contains(dado.ToLower()));
                    return await query2.FirstOrDefaultAsync();
                default:
                    break;
            }
            return null;
        }
        #endregion
    }
}