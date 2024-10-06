using System.ComponentModel.DataAnnotations;
using Blocklingo.Models; 

namespace Blocklingo.Models
{
    public class Puzzle
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public DateTime CreatedAt { get; set; } 
        public string Difficulty { get; set; } = "";    
        public int Points { get; set; }
        public decimal RewardAmount { get; set; }
        public DateTime ExpirationAt { get; set; }
        public int TriggerGroupId { get; set; } 
        public int GuessWordId { get; set;  }

        //public required List<string> TriggerWords { get; set; }
        //public required List<string> PuzzleWords { get; set; }
        public GuessWord GuessWord { get; set; }
    }
}