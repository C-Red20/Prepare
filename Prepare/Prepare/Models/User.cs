﻿using System.ComponentModel.DataAnnotations;

namespace Prepare.Models
{
    public class UserProfile // Renamed from User to UserProfile
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }
    }
}
