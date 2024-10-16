using System;

namespace Prepare.Models
{
    public class List
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserProfileId { get; set; }
        public string Location { get; set; }
        public DateTime? LastUpdated { get; set; } // Ensure this property exists

        // Navigation properties
        public UserProfile? UserProfile { get; set; }
    }
}
