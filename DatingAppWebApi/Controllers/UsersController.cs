using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingAppWebApi.Data.Interfaces;
using DatingAppWebApi.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingAppWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var mappedUsers = _mapper.Map<IEnumerable<UserListDTO>>(users);
            return Ok(mappedUsers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var mappedUser = _mapper.Map<UserDetailsDTO>(user);
            return Ok(mappedUser);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserUpdateDTO user)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);
            
            _mapper.Map(user, userFromRepo);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception($"Failed to update user {userFromRepo.KnownAs} on save.");
        }

    }

}