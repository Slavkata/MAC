using System.ComponentModel.DataAnnotations;

namespace MAC_API.Models
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Category { get; set; }
    }
}