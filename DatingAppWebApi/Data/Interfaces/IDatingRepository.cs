using DatingAppWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAppWebApi.Data.Interfaces
{
    public interface IDatingRepository
    {
        void Add<T>( T entity) where T: class;
        void Remove<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
    }
}
