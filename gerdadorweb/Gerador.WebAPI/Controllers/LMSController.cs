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
    [Route("api/lms")]
    public class LMSController : ControllerBase
    {

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Lms>>> Get([FromServices] GeradorContext context)
        {
            try
            {
                var lmss = await context.Lmss
               .Include(c => c.Configuracao)
               .Include(t => t.TipoVariavel)
               .Include(tp => tp.TipoVariavelFT)
               .AsNoTracking()
               .ToListAsync();

                return Ok(lmss);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
        [HttpGet]
        [Route("{id:int}")]//restrição de rota
        public async Task<ActionResult<Lms>> GetById([FromServices] GeradorContext context, int id)
        {
            try
            {
                var lmss = await context.Lmss
                    .Include(c => c.Configuracao)
                    .Include(t => t.TipoVariavel)
                    .Include(tp => tp.TipoVariavelFT)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(l => l.Id == id);

                return Ok(lmss);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Lms>> Post([FromServices] GeradorContext context, [FromBody] Lms lms)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    context.Lmss.Add(lms);
                    await context.SaveChangesAsync();
                    return Created($"/api/lms/{lms.Id}", lms);
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
        public async Task<ActionResult<Lms>> Put([FromServices] GeradorContext context, int id, [FromBody] Lms lms)
        {

            try
            {
                var lmss = await context.Lmss
                    .AsNoTracking()
                  .FirstOrDefaultAsync(l => l.Id == id);

                if (lmss == null) return NotFound();

                context.Update(lms);

                await context.SaveChangesAsync();

                return Created($"/api/lms/{lms.Id}", lms);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }

        }
        [HttpDelete("{id}")]
        [Route("")]
        public async Task<ActionResult<Lms>> Delete([FromServices] GeradorContext context, long id)
        {
            try
            {
                var lmss = await context.Lmss
                    .AsNoTracking()
                    .FirstOrDefaultAsync(l => l.Id == id);

                if (lmss == null) return NotFound();

                context.Remove(lmss);

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
