namespace Prepare.Models
{
    public class ListItem
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int ListId { get; set; }
        public int Amount { get; set; }

        // Navigation properties
        public Item Item { get; set; }
        public List List { get; set; }
    }
}
