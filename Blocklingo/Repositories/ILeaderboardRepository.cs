using Blocklingo.Models;

namespace Blocklingo.Repositories
{
    public interface ILeaderboardRepository
    {
        public void Add(Leaderboard leaderboardEntry);

        public Leaderboard GetEntryById (int id);   
        public Leaderboard GetEntryByUserId (int userId); 
    }
}
