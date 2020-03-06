using DatingAppWebApi.Data;
using DatingAppWebApi.Models;
using DatingAppWebApi.Util;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAppWebApi.Migrations
{
    public  class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Migrations/JsonData/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);


                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;

                    Cripto.CreatePasswordHash("123456", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();

                    context.Users.Add(user);                    
                }

                context.SaveChanges();
            }
        }
    }
}
