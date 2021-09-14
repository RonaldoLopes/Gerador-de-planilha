using Gerador.Domain.Entities;
using Gerador.Repository.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gerador.WebAPI.Controllers
{
    [ApiController]
    [Route("api/ambevs")]
    public class AmbevController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Ambev>>> Get([FromServices] GeradorContext context)
        {
            var abvs = await context.Ambevs
                  .Include(t => t.TipoVariavel)
                  .Include(u => u.UM)
                  .AsNoTracking()
                  .ToListAsync();
            return Ok(abvs);
        }
        [HttpGet]
        [Route("{id:int}")]//restrição de rota
        public async Task<ActionResult<Ambev>> GetById([FromServices] GeradorContext context, int id)
        {
            try
            {
                var abvs = await context.Ambevs
                .Include(t => t.TipoVariavel)
                .Include(u => u.UM)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);
                return Ok(abvs);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
        
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Ambev>> Post([FromServices] GeradorContext context, [FromBody] Ambev ambev)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    context.Ambevs.Add(ambev);
                    await context.SaveChangesAsync();
                    return Created($"/api/ambevs/{ambev.Id}", ambev);
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
        public async Task<ActionResult<Ambev>> Put([FromServices] GeradorContext context, int id, [FromBody] Ambev ambev)
        {

            try
            {
                var ambevs = await context.Ambevs
                    .AsNoTracking()
                  .FirstOrDefaultAsync(a => a.Id == id);

                if (ambevs == null) return NotFound();

                context.Update(ambev);

                await context.SaveChangesAsync();

                return Created($"/api/ambevs/{ambev.Id}", ambev);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }

        }
        [HttpDelete("{id}")]
        [Route("")]
        public async Task<ActionResult<Ambev>> Delete([FromServices] GeradorContext context, long id)
        {
            try
            {
                var ambevs = await context.Ambevs
                    .AsNoTracking()
                    .FirstOrDefaultAsync(a => a.Id == id);

                if (ambevs == null) return NotFound();

                context.Remove(ambevs);

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

        public AmbevController(IGeradorRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllAmbevAsync();
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
                var results = await _repo.GetAmbevAsyncById(Id);
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
                var results = await _repo.GetAmbevAsyncByChoose(campo, dado);
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
                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/ambev/{model.Id}", model);
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
                var abv = await _repo.GetAmbevAsyncById(Id);
                if (abv == null) return NotFound();
                _repo.Update(model);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/ambev/{model.Id}", model);
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
                var abv = await _repo.GetAmbevAsyncById(Id);
                if (abv == null) return NotFound();
                
                _repo.Delete(abv);
                if(await _repo.SaveChangesAsync())
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
     
 **/
