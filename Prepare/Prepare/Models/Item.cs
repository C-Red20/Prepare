namespace Prepare.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public bool Have { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Category Category { get; set; }
    }

}
