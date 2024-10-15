namespace Prepare.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserProfileId { get; set; }
        public int CategoryId { get; set; }
        public bool Have { get; set; }

        // Navigation properties
        public UserProfile? UserProfile { get; set; }
        public Category? Category { get; set; }
    }
}
