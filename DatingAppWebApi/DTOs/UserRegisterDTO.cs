﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAppWebApi.DTOs
{
    public class UserRegisterDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [MinLength(6, ErrorMessage = "Tamanho minímo da senha é de 6 carácteres.")]
        [MaxLength(14, ErrorMessage = "Tamanho máximo da senha é de 14 carácteres.")]
        public string Password { get; set; }
    }
}
