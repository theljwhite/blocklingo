using Blocklingo.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Blocklingo.Models
{
    public class PuzzleWord
    {
        public int Id { get; set; }
        public string Word { get; set; } = "";
        public int TriggerWordId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}