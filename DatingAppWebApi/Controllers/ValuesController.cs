using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingAppWebApi.Data;
using DatingAppWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingAppWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("AsyncEnumerable")]
        public async Task<IEnumerable<Value>> AsyncList() =>
            await _context.Values.ToListAsync();

        [HttpGet]
        [Route("AsyncActionResult")]
        public async Task<ActionResult> List()
        {
            var y = await _context.Values.ToListAsync();
            return Ok(y);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("SyncActionResult")]
        public ActionResult SyncList()
        {
            var values = _context.Values.ToList();
            return Ok(values);
        }

        //[HttpGet("{id}")]
        //public ActionResult Unico(int id)
        //{
        //    var value = _context.Values.FirstOrDefault(val => val.Id == id);

        //    return Ok(value);
        //}

        [HttpGet("{id}")]
        public async Task<ActionResult> Unico(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(val => val.Id == id);
            value ??= new Value();
            return Ok(value);
        }
    }
}