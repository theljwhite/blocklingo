using Blocklingo.Models;

namespace Blocklingo.Models
{
    public class PuzzleAttempt
    {
        public int Id { get; set; } 
        public int CompletionTimeSeconds { get; set; }
        public int Tries { get; set; }
        public bool IsSolved { get; set; }
        public int EarnedPoints { get; set; }
        public int UserId { get; set; }
        public int PuzzleId { get; set; }

    }
}