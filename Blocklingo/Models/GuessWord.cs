using System.ComponentModel.DataAnnotations;

namespace Blocklingo.Models
{
    public class GuessWord
    {
        public int Id { get; set; }
        public string Word { get; set; } = ""; 
        public DateTime CreatedAt { get; set; } 
    }
}