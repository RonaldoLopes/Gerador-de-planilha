using Gerador.Domain.Entities;
using Gerador.Repository.Context;
using Gerador.Repository.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Gerador.WebAPI.Dto;

namespace Gerador.WebAPI.Controllers
{
    
    [ApiController]
    [Route("api/plcs")]
    public class PlcController : ControllerBase
    {
        //private readonly IGeradorRepository _repo;//injeto o repositorio pela interface(dependency injection)

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Plc>>> Get([FromServices] GeradorContext context)
        {
            try
            {
                var plcs = await context.Plcs
                  .Include(c => c.Configuracao)
                  .Include(t => t.TipoVariavel)
                  .AsNoTracking()
                  .ToListAsync();
                return Ok(plcs);
            }
            catch (System.Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            /* */

        }
        [HttpGet]
        [Route("{id:int}")]//restrição de rota
        public async Task<ActionResult<Plc>> GetById([FromServices] GeradorContext context, int id)
        {
            try
            {
                var plcs = await context.Plcs
                .Include(c => c.Configuracao)
                .Include(t => t.TipoVariavel)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
                return Ok(plcs);
               
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Plc>> Post([FromServices] GeradorContext context, [FromBody] Plc plc)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    context.Plcs.Add(plc);
                    await context.SaveChangesAsync();
                    return Created($"/api/plcs/{plc.Id}", plc);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados: " + ex.ToString());
            }
            return BadRequest();
        }//public async Task<ActionResult<List<Plc>>> Get([FromServices] GeradorContext context)
        
        [HttpPut("{Id}")]
        [Route("")]
        public async Task<ActionResult<Plc>> Put([FromServices] GeradorContext context,int id, [FromBody] Plc plc)
        {
           
            try
            {
                var plcs = await context.Plcs
                    .AsNoTracking()
                  .FirstOrDefaultAsync(p => p.Id == id);

                if (plcs == null) return NotFound();

                context.Update(plc);

                await context.SaveChangesAsync();

                return Created($"/api/plcs/{plc.Id}", plc);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
           
        }
        [HttpDelete("{id}")]
        [Route("")]
        public async Task<ActionResult<Plc>> Delete([FromServices] GeradorContext context, long id)
        {
            try
            {
                var plcs = await context.Plcs
                    .AsNoTracking()
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (plcs == null) return NotFound();

                context.Remove(plcs);

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
 [HttpGet]
        [Route("categories/{id:int}")]//restrição de rota
        public async Task<ActionResult<List<Product>>> GetByCategory([FromServices] DataContext context, int id)
        {
            var prodduts = await context.Produtcs
                .Include(x => x.Category)
                .AsNoTracking()
                .Where(x => x.CategoryId == id)
                .ToListAsync();
            return prodduts;
        }*/