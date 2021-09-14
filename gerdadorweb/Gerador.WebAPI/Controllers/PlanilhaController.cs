using Gerador.Domain.Entities;
using Gerador.Repository.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Gerador.WebAPI.Controllers
{
    [ApiController]
    [Route("api/planilhas")]
    public class PlanilhaController : Controller
    {
        /// <summary>
        /// Selectiona os dados LMS pelo ID da configuração
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("lms/{id:int}")]
        public async Task<ActionResult<Lms>> GetByLmsId([FromServices] GeradorContext context, int id)
        {
            string sql = "";
            sql += "SELECT * from lmss WHERE ConfiguracaoId = {0} ";

            try
            {
                var configs = await context.Lmss
                    .FromSqlRaw(sql, id)
                        .Include(tp => tp.TipoVariavel)
                        .Include(c => c.Configuracao)
                    .AsNoTracking()
                    .ToListAsync();
                return Ok(configs);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());

            }
        }
        /// <summary>
        /// Seleciona os dados do plc pela id da configuracao
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("plc/{id:int}")]
        public async Task<ActionResult<Configuracao>> GetByPlId([FromServices] GeradorContext context, int id)
        {
            string sql = "";
            sql += "SELECT * from configuracoes WHERE Id = {0} ";

            try
            {
                var configs = await context.Configuracoes
                    .FromSqlRaw(sql, id)
                    .Include(p => p.Plcs).ThenInclude(p => p.TipoVariavel)
                    .AsNoTracking()
                    .ToListAsync();
                return Ok(configs);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());

            }
        }
        /// <summary>
        /// Seleciona os dados do historico pelo id da configuracao
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("hist/{id:int}")]
        public async Task<ActionResult<Historian>> GetByHistId([FromServices] GeradorContext context, int id)
        {
            string sql = "";
            sql += "SELECT * from historians WHERE ConfiguracaoId = {0} ";

            try
            {
                var configs = await context.Historians
                    .FromSqlRaw(sql, id)
                        .Include(tp => tp.TipoVariavel)
                        .Include(u => u.UM)
                        .Include(c => c.Configuracao)
                    .AsNoTracking()
                    .ToListAsync();
                return Ok(configs);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
        /// <summary>
        /// Seleciona os dados do historian planilha pelo id da configuracao
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("histpl/{id:int}")]
        public async Task<ActionResult<Historian>> GetByHistPlaId([FromServices] GeradorContext context, int id)
        {
            string sql = "";
            sql += "SELECT * from historians WHERE ConfiguracaoId = {0} ";

            try
            {
                var configs = await context.Historians
                    .FromSqlRaw(sql, id)
                        .Include(tp => tp.TipoVariavel)
                        .Include(u => u.UM)
                        .Include(c => c.Configuracao)
                        .Include(p => p.Plc)
                    .AsNoTracking()
                    .ToListAsync();
                return Ok(configs);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }


        /// <summary>
        /// Seleciona os dados do historico pelo id da configuracao
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("igs/{id:int}")]
        public async Task<ActionResult<Historian>> GetByIGSId([FromServices] GeradorContext context, int id)
        {
            string sql = "";
            sql += "SELECT * from igss WHERE ConfiguracaoId = {0} ";

            try
            {
                var igss = await context.IgSs
                    .FromSqlRaw(sql, id)
                        .Include(tp => tp.TipoVariavel)
                        .Include(p => p.Plc)
                    .AsNoTracking()
                    .ToListAsync();
                return Ok(igss);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
    }
}