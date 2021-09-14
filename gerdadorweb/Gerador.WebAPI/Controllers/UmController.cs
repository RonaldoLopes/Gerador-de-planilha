using AutoMapper;
using AutoMapper.Configuration;
using Gerador.Domain.Entities;
using Gerador.Domain.Identity;
using Gerador.Repository.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Gerador.WebAPI.Controllers
{
    [ApiController]
    [Route("api/ums")]
    
    public class UmController : ControllerBase
    {
        private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;

        public UmController(RoleManager<Role> roleManager, UserManager<User> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }


        [HttpGet]
        [Route("")]
        //ng [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<UM>>> Get([FromServices] GeradorContext context)
        {
            var ums = await context.UMs
                .AsNoTracking()
                .ToListAsync();
            return Ok(ums);
        }
        [HttpGet]
        [Route("{id:int}")]//restrição de rota
        public async Task<ActionResult<UM>> GetById([FromServices] GeradorContext context, int id)
        {
            try
            {
                var ums = await context.UMs
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
                return Ok(ums);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha: " + ex.ToString());
            }
        }
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<UM>> Post([FromServices] GeradorContext context, [FromBody] UM um)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    context.UMs.Add(um);
                    await context.SaveChangesAsync();
                    return Created($"/api/ums/{um.Id}", um);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados: " + ex.ToString());
            }
            return BadRequest();
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult<UM>> Put([FromServices] GeradorContext context, int id, [FromBody] UM um)
        {

            try
            {
                var ums = await context.UMs
                    .AsNoTracking()
                  .FirstOrDefaultAsync(u => u.Id == id);

                if (ums == null) return NotFound();

                context.Update(um);

                await context.SaveChangesAsync();

                return Created($"/api/ums/{um.Id}", um);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<UM>> Delete([FromServices] GeradorContext context, long id)
        {
            try
            {
                var ums = await context.UMs
                    .AsNoTracking()
                  .FirstOrDefaultAsync(u => u.Id == id);

                if (ums == null) return NotFound();

                context.Remove(ums);


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
 *  private readonly IGeradorRepository _repo;//injeto o repositorio pela interface(dependency injection)
        private readonly IMapper _mapper;

        public UmController(IGeradorRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get(){
            try
            {
                var results = await _repo.GetAllUMAsync();
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpGet("{UmId}")]
        public async Task<IActionResult> Get(int UmId){
            try
            {
                var results = await _repo.GetAllUMAsyncById(UmId);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpGet("getByDescricao/{descricao}")]
        public async Task<IActionResult> Get(string descricao){
            try
            {
                var results = await _repo.GetAllUMAsyncByDesc(descricao);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no banco de dados");
            }
        }
        [HttpPost()]
        public async Task<IActionResult> Post(UmDto model)
        {
            try
            {
                var um = _mapper.Map<UM>(model);

                _repo.Add(um);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/um/{model.Id}", _mapper.Map<UmDto>(um));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha no banco de dados {ex.Message}");
            }
            return BadRequest();
        }
        [HttpPut("{UmId}")]
        public async Task<IActionResult> Put(int UmId, UM model){
            try
            {
                var um = await _repo.GetAllUMAsyncById(UmId);

                if(um == null) return NotFound();

                _repo.Update(model);

                if(await _repo.SaveChangesAsync()){
                    return Created($"/api/um/{model.Id}", model);
                }
                
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
            return BadRequest();
        }
        [HttpDelete("{UmId}")]
        public async Task<IActionResult> Delete(int UmId){
            try
            {
                var um = await _repo.GetAllUMAsyncById(UmId);

                if(um == null) return NotFound();

                _repo.Delete(um);

                if(await _repo.SaveChangesAsync()){
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