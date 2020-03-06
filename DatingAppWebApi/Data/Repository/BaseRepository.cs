using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DatingAppWebApi.Data.Repository
{
    public class BaseRepository<TEntity> where TEntity : class
    {
        protected readonly DataContext _context;
        public BaseRepository(DataContext context)
        {
            _context = context;
        }
        public virtual TEntity Add(TEntity obj)
        {
            _context.Set<TEntity>().Add(obj);
            return obj;
        }

        public virtual async Task<TEntity> AddAsync(TEntity obj)
        {
             await _context.AddAsync(obj);
            return obj;
        }

        public virtual void Update(TEntity obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
        }

        public virtual void Remove(TEntity obj)
        {
            _context.Entry(obj).State = EntityState.Deleted;
            _context.Set<TEntity>().Remove(obj);
        }

        public virtual TEntity GetById(params object[] id)
        {
            return _context.Set<TEntity>().Find(id);
        }

        public TEntity GetById(Expression<Func<TEntity, bool>> predicate)
        {
            return _context.Set<TEntity>().FirstOrDefault(predicate);
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return _context.Set<TEntity>().ToList();

        }
        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate = null, Expression<Func<TEntity, object>> order = null, bool reverse = false, int skipRecords = 0, int takeRecords = 0)
        {
            var query = _context.Set<TEntity>().
                Where(predicate ?? (x => true));

            if (order != null)
                query = reverse ? query.OrderByDescending(order) : query.OrderBy(order);

            return (skipRecords == 0 && takeRecords == 0 ? query :
                query.Skip(skipRecords).Take(takeRecords)).ToList();
        }

        public IEnumerable<TEntity> GetAll(ref int totalRecords, Expression<Func<TEntity, bool>> predicate = null, Expression<Func<TEntity, object>> order = null, bool reverse = false, int skipRecords = 0, int takeRecords = 0)
        {
            var query = _context.Set<TEntity>().
                Where(predicate ?? (x => true));
            totalRecords = query.Count();

            if (order != null)
                query = reverse ? query.OrderByDescending(order) : query.OrderBy(order);

            return (skipRecords == 0 && takeRecords == 0 ? query :
                query.Skip(skipRecords).Take(takeRecords)).ToList();
        }

        public DataContext GetContext()
        {
            return this._context;
        }

    }
}
