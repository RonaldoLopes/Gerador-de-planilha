using Gerador.Domain.Entities;
using Gerador.Repository.Context;
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
    [Route("api/igs")]
    public class IGSController : ControllerBase
    {

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<IGS>>> Get([FromServices] GeradorContext context)
        {
            try
            {
                var igs = await context.IgSs
                .Include(t => t.TipoVariavel)
                .Include(p => p.Plc)
                .AsNoTracking()
                .ToListAsync();
                return Ok(igs);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<IGS>> GetById([FromServices] GeradorContext context, int id)
        {
            try
            {

                var igs = await context.IgSs
                .Include(t => t.TipoVariavel)
                .Include(p => p.Plc)
                .AsNoTracking()
                .FirstOrDefaultAsync(i => i.Id == id);            
                
                return Ok(igs);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<IGS>> Post([FromServices] GeradorContext context, [FromBody] IGS igs)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    context.IgSs.Add(igs);
                    await context.SaveChangesAsync();
                    return Created($"/api/igs/{igs.Id}", igs);
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
        public async Task<ActionResult<IGS>> Put([FromServices] GeradorContext context, int id, [FromBody] IGS igs)
        {

            try
            {
                var igss = await context.IgSs
                    .AsNoTracking()
                  .FirstOrDefaultAsync(i => i.Id == id);

                if (igss == null) return NotFound();

                context.Update(igs);

                await context.SaveChangesAsync();

                return Created($"/api/igs/{igs.Id}", igs);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }

        }
        [HttpDelete("{id}")]
        [Route("")]
        public async Task<ActionResult<IGS>> Delete([FromServices] GeradorContext context, long id)
        {
            try
            {
                var igss = await context.IgSs
                    .AsNoTracking()
                    .FirstOrDefaultAsync(a => a.Id == id);

                if (igss == null) return NotFound();

                context.Remove(igss);

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
