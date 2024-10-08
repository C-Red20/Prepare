namespace Prepare.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public DateTime PostedDate { get; set; }

        // Navigation properties
        public User User { get; set; }
    }

}
