using Gerador.Domain.Entities;
using Gerador.Repository.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gerador.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoVariavelController : ControllerBase
    {
        private readonly IGeradorRepository _repo;//injeto o repositorio pela interface(dependency injection)
        public TipoVariavelController(IGeradorRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllTPAsync();
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpGet("{TpId}")]
        public async Task<IActionResult> Get(int TpId)
        {
            try
            {
                var results = await _repo.GetTPAsyncById(TpId);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpGet("getByDescricao/{descricao}")]
        public async Task<IActionResult> Get(string descricao)
        {
            try
            {
                var results = await _repo.GetTPAsyncByDesc(descricao);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpPost()]
        public async Task<IActionResult> Post(TipoVariavel model)
        {
            try
            {
                _repo.Add(model);
                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/tipovariavel/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
            return BadRequest();
        }
        [HttpPut("{TpId}")]
        public async Task<IActionResult> Put(int TpId, TipoVariavel model)
        {
            try
            {
                var tp = await _repo.GetTPAsyncById(TpId);

                if (tp == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/tipovariavel/{model.Id}", model);
                }

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
            return BadRequest();
        }
        [HttpDelete("{TpId}")]
        public async Task<IActionResult> Delete(int TpId)
        {
            try
            {
                var tp = await _repo.GetTPAsyncById(TpId);

                if (tp == null) return NotFound();

                _repo.Delete(tp);

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
    }
}
