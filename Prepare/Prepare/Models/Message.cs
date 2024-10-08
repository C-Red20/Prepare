namespace Prepare.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserProfileId { get; set; }
        public DateTime PostedDate { get; set; }

        // Navigation properties
        public UserProfile UserProfile { get; set; }
    }

}
