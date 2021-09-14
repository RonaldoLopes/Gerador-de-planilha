using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Gerador.Domain.Identity;
using Gerador.Repository.Context;
using Gerador.WebAPI.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Gerador.WebAPI.Controllers
{
    [ApiController]
    [Route("api/logins")]
    public class AuthController : ControllerBase
    {
        public IConfiguration Configuration { get; set; }
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;

        public AuthController(IConfiguration config, UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
        {
            this.Configuration = config;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._mapper = mapper;
            var builder = new ConfigurationBuilder().AddJsonFile("config.json");
            Configuration = builder.Build();
        }

        [HttpGet("GetUser")]
        public IActionResult GetUser()
        {
            return Ok(new UserDto());
        }
        [HttpGet]
        [Route("getAllUser")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<UserRole>>> Get([FromServices] GeradorContext context)
        {
            var usrs = await context.UserRoles
                .Include(u => u.User)
                .Include(r => r.Role)
               // .Include(ur => ur.UserRoles)
               // .ThenInclude(r => r.)
                .AsNoTracking()
                .ToListAsync();

            return Ok(usrs);
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            try
            {
                var user = _mapper.Map<User>(userDto);
                var result = await _userManager.CreateAsync(user, userDto.Password);
                var userToReturn = _mapper.Map<UserDto>(user);

                if (result.Succeeded)
                {
                    return Created("GetUser", userToReturn);
                }

                return BadRequest(result.Errors);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Houve uma falha: {ex.Message}");
            }
        }

        [HttpPut("{updateUser}")]
        [Route("")]
        public async Task<IActionResult> Update(User model)
        {
            try
            {
                //var user = await _userManager.FindByEmailAsync(model.Email);
                await _userManager.UpdateAsync(model);
                return Ok("Sucesso");
            }
            catch (Exception)
            {

                throw;
            }
            //return Ok("Sucesso");
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDto userLogin)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(userLogin.UserName);
                var result = await _signInManager.CheckPasswordSignInAsync(user, userLogin.Password, false);

                if (result.Succeeded)
                {
                    var appUser = await _userManager.Users
                        .FirstOrDefaultAsync(u => u.NormalizedUserName == userLogin.UserName.ToUpper());

                    var userToReturn = _mapper.Map<UserLoginDto>(appUser);

                    return Ok(new
                    {
                        token = GenerateJwtToken(appUser).Result,
                        user = userToReturn
                    });
                }

                return Unauthorized();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Houve uma falha: {ex.Message}");
            }
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            //var key1 = Configuration.GetSection("AppSettings:Token").Value;

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                //Expires = DateTime.Now.AddDays(1),
                Expires = DateTime.Now.AddHours(6),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
