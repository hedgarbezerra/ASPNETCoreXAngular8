using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DatingAppWebApi.Util
{
    public class JwtGenerator
    {
        private readonly IConfiguration _config;
        private readonly JwtSecurityTokenHandler _tokenHandler;

        public JwtGenerator(IConfiguration config, JwtSecurityTokenHandler tokenHandler = null)
        {
            _config = config;

            if (tokenHandler == null)
            {
                _tokenHandler = new JwtSecurityTokenHandler();
            }
            else
            {
                _tokenHandler = tokenHandler;
            }
            
        }

        public  SecurityToken GenerateToken(string Id, string Username)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, Id),
                new Claim(ClaimTypes.Name, Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["AppSettings:Token"]));

            //var key = new SymmetricSecurityKey(Encoding.UTF8
            //    .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(3).AddMinutes(30),
                SigningCredentials = creds,
                IssuedAt = DateTime.Now
            };


            var actualToken = _tokenHandler.CreateToken(tokenDescriptor);

            return actualToken;
        }

        public JwtSecurityTokenHandler GetJwtHandler()
        {
            return _tokenHandler;
        }
    }
}
