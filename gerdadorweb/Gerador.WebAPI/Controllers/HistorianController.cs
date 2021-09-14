using Gerador.Domain.Entities;
using Gerador.Repository.Context;
using Gerador.Repository.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gerador.WebAPI.Controllers
{
    
    [ApiController]
    [Route("api/hists")]
    public class HistorianController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Historian>>> Get([FromServices] GeradorContext context)
        {
            var hists = await context.Historians
                .Include(c => c.Configuracao)
                .Include(a => a.Ambev)
                .Include(p => p.Plc)
                .AsNoTracking()
                .ToListAsync();

            return Ok(hists);

        }
        [HttpGet]
        [Route("{id:int}")]//restrição de rota
        public async Task<ActionResult<Historian>> GetById([FromServices] GeradorContext context, int id)
        {
            try
            {
                var hists = await context.Historians
                    .Include(c => c.Configuracao)
                    .Include(a => a.Ambev)
                    .Include(p => p.Plc)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(h => h.Id == id);
                return Ok(hists);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Historian>> Post([FromServices] GeradorContext context, [FromBody] Historian historian)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    context.Historians.Add(historian);
                    await context.SaveChangesAsync();
                    return Created($"/api/hists/{historian.Id}", historian);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados: " + ex.ToString());
            }
            return BadRequest();
        }
        [HttpPut("{id}")]
        [Route("")]
        public async Task<ActionResult<Historian>> Put([FromServices] GeradorContext context, int id, [FromBody] Historian historian)
        {

            try
            {
                var hists = await context.Historians
                    .AsNoTracking()
                  .FirstOrDefaultAsync(h => h.Id == id);

                if (hists == null) return NotFound();

                context.Update(historian);

                await context.SaveChangesAsync();

                return Created($"/api/hists/{historian.Id}", historian);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }

        }
        [HttpDelete("{id}")]
        [Route("")]
        public async Task<ActionResult<Historian>> Delete([FromServices] GeradorContext context, long id)
        {
            try
            {
                var hists = await context.Historians
                    .AsNoTracking()
                    .FirstOrDefaultAsync(h => h.Id == id);

                if (hists == null) return NotFound();

                context.Remove(hists);

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
  private readonly IGeradorRepository _repo;//injeto o repositorio pela interface(dependency injection)
        public HistorianController(IGeradorRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllHistAsync();
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> Get(int Id)
        {
            try
            {
                var results = await _repo.GetHistAsyncById(Id);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpGet("getByChoose/{campo}/{dado}")]
        public async Task<IActionResult> Get(string campo, string dado)
        {
            try
            {
                var results = await _repo.GetHistAsyncByChoose(campo, dado);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(Ambev model)
        {
            try
            {
                _repo.Add(model);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/historian/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados: " + ex.ToString());
            }
            return BadRequest();
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int Id, Ambev model)
        {
            try
            {
                var abv = await _repo.GetHistAsyncById(Id);
                if (abv == null) return NotFound();
                _repo.Update(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/historian/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
            return BadRequest();
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                var abv = await _repo.GetHistAsyncById(Id);
                if (abv == null) return NotFound();

                _repo.Delete(abv);
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
