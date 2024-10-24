namespace Blocklingo.Models
{
    public class Leaderboard
    {
        public int Id { get; set; }
        public int TotalSolvedPuzzles { get; set; }
        public int TotalPoints { get; set; }    
        public int CurrentStreak { get; set; }
        public int BestStreak { get; set; }
        public int Rank { get; set; }
        public int LastSolvedPuzzleId { get; set; }
        public DateTime RankedAt { get; set; }
        public int UserId { get; set; }
    }
}
