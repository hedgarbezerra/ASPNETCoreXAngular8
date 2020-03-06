using DatingAppWebApi.Interfaces;
using DatingAppWebApi.Models;
using DatingAppWebApi.Util;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAppWebApi.Data.Repository
{
    public class AuthRepository : BaseRepository<User>, IAuthRepository
    {
        public AuthRepository(DataContext context) : base(context)
        {
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username.ToLower());
            
            if (user == null)
                return null;

            if (!Cripto.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }


        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            Cripto.CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await AddAsync(user);
            await SaveChangesAsync();

            return user;

        }

        public async Task<bool> UserExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
  
        }

        public bool userExists(string username)
        {
            return  _context.Users.Any(x => x.Username == username);
        }


    }
}
