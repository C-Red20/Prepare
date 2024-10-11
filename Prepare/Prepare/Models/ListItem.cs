namespace Prepare.Models
{
    public class ListItem
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int ListId { get; set; }
        public int Amount { get; set; }

        // Navigation properties
        public string ItemName { get; set; } // Add this property if needed
        public List List { get; set; }
    }
}
