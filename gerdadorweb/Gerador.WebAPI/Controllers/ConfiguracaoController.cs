using Gerador.Domain.Entities;
using Gerador.Repository.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Gerador.WebAPI.Controllers
{
    [ApiController]
    [Route("api/configs")]    
    public class ConfiguracaoController : ControllerBase
    {
        
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Configuracao>>> Get([FromServices] GeradorContext context)
        {
            var configs = await context.Configuracoes
                .AsNoTracking()
                .ToListAsync();
            return Ok(configs);
        }
        //[EnableCors("CorsPolicy")]
        [HttpGet]
        [Route("{id:int}")]//restrição de rota
        public async Task<ActionResult<Configuracao>> GetById([FromServices] GeradorContext context, int id)
        {
            try
            {
                var configs = await context.Configuracoes
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);
                return Ok(configs);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
        //[EnableCors("CorsPolicy")]
        [HttpGet]
        [Route("ambevByPlId/{id:int}")]
        public async Task<ActionResult<Configuracao>> GetByAbvId([FromServices] GeradorContext context, int id)
        {
            string sql = "";
            sql += "SELECT * from configuracoes WHERE Id = {0} ";

            try
            {
                var configs = await context.Configuracoes
                    .FromSqlRaw(sql, id)
                    .AsNoTracking()
                    .ToListAsync();
                return Ok(configs);

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());

            }
        }
        //[EnableCors("CorsPolicy")]
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Configuracao>> Post([FromServices] GeradorContext context, [FromBody] Configuracao configuracao)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    context.Configuracoes.Add(configuracao);
                    await context.SaveChangesAsync();
                    return Created($"/api/configs/{configuracao.Id}", configuracao);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados: " + ex.ToString());
            }
            return BadRequest();
        }
        [HttpPut("{Id}")]
        public async Task<ActionResult<Configuracao>> Put([FromServices] GeradorContext context, int id, [FromBody] Configuracao configuracao)
        {

            try
            {
                var configs = await context.Configuracoes
                    .AsNoTracking()
                  .FirstOrDefaultAsync(c => c.Id == id);

                if (configs == null) return NotFound();

                context.Update(configuracao);

                await context.SaveChangesAsync();

                return Created($"/api/configs/{configuracao.Id}", configuracao);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }

        }
        //[EnableCors("CorsPolicy")]
        [HttpDelete("{id}")]
        [Route("")]
        public async Task<ActionResult<Configuracao>> Delete([FromServices] GeradorContext context, long id)
        {
            try
            {
                var cfgs = await context.Configuracoes
                    .AsNoTracking()
                  .FirstOrDefaultAsync(c => c.Id == id);

                if (cfgs == null) return NotFound();

                context.Remove(cfgs);


                await context.SaveChangesAsync();
                return Ok();

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }

        }


    }
}
/*
 public async Task<IActionResult> Get()
        {

           try
            {
                var configuracoes = await _repo.GetAllConfigAsync();
                var results = _mapper.Map<IEnumerable<ConfiguracaoDto>>(configuracoes);
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados {ex.Message}");
            }
        }
     [HttpGet("{CfId}")]
        public async Task<IActionResult> Get(int CfId)
        {
            try
            {
                var configuracoes = await _repo.GetConfAsyncById(CfId);
                var results = _mapper.Map<IEnumerable<ConfiguracaoDto>>(configuracoes);
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados {ex.Message}");
            }
        }
        [HttpGet("getByPlanta/{planta}")]
        public async Task<IActionResult> Get(string planta)
        {
            try
            {
                var configuracoes = await _repo.GetConfAsyncByPlanta(planta);
                var results = _mapper.Map<IEnumerable<ConfiguracaoDto>>(configuracoes);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpPost()]
        public async Task<IActionResult> Post(ConfiguracaoDto model)
        {
            try
            { 
                var configuracao = _mapper.Map<Configuracao>(model);

                _repo.Add(configuracao);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/configuracao/{model.Id}", _mapper.Map<ConfiguracaoDto>(configuracao));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados {ex.Message}");
            }
            return BadRequest();
        }
        [HttpPut("{CfId}")]
        public async Task<IActionResult> Put(int CfId, ConfiguracaoDto model)
        {
            try
            {
                var configuracao = await _repo.GetConfAsyncById(CfId);

                if (configuracao == null) return NotFound();

                _mapper.Map(model, configuracao, typeof(ConfiguracaoDto), typeof(Configuracao));

                _repo.Update(configuracao);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/configuracao/{model.Id}", _mapper.Map<ConfiguracaoDto>(configuracao));
                }

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
            return BadRequest();
        }
        [HttpDelete("{CfId}")]
        public async Task<IActionResult> Delete(int CfId)
        {
            try
            {
                var cf = await _repo.GetConfAsyncById(CfId);

                if (cf == null) return NotFound();

                _repo.Delete(cf);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
            return BadRequest();
        }
     */
