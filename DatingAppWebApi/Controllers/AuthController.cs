using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingAppWebApi.Data.Repository;
using DatingAppWebApi.Interfaces;
using DatingAppWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthRepository _repository;

        public AuthController(IAuthRepository repository, IConfiguration config)
        {
            _config = config;
            _repository = repository;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(DTOs.UserRegisterDTO user)
        {
            user.Username = user.Username.ToLower();

            if (await _repository.UserExistsAsync(user.Username)) 
                return BadRequest("User already exists");

            var userToCreate = new User
            {
                Username = user.Username
            };

            var userCreated = await _repository.Register(userToCreate, user.Password);

            return Created(nameof(this.ControllerContext), userCreated);

        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(DTOs.UserLogin user)
        {
            try
            {
                var userOnline = await _repository.Login(user.Username, user.Password);

                if (userOnline == null)
                    return Unauthorized();

                var utilJwt = new Util.JwtGenerator(_config);

                var actualToken = utilJwt.GenerateToken(userOnline.Id.ToString(), userOnline.Username);
                var tokenHandler = utilJwt.GetJwtHandler();

                return Ok(new
                {
                    token = tokenHandler.WriteToken(actualToken)
                });
                
                //var jwtToken = new JwtSecurityToken
                //{
                //    Claims = claims,
                //    SigningCredentials = creds,

                //};
                //jwtToken.ValidFrom = DateTime.Now;
                //jwtToken.ValidTo = DateTime.Now.AddMinutes(30);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }
    }
}