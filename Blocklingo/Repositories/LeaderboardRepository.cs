using Blocklingo.Models;
using Blocklingo.Utils;
using Microsoft.Data.SqlClient;

namespace Blocklingo.Repositories
{
    public class LeaderboardRepository: BaseRepository, ILeaderboardRepository
    {
        public LeaderboardRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Leaderboard leaderboardEntry)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Leaderboard (Id, TotalSolvedPuzzles, TotalPoints, CurrentStreak, BestStreak, Rank, UserId, LastSolvedPuzzleId, RankedAt)
                        OUTPUT INSERTED.ID
                        VALUES (@Id, @TotalSolvedPuzzles, @TotalPoints, @CurrentStreak, @BestStreak, @Rank, @UserId, @LastSolvedPuzzleId, GETDATE())";

                    DbUtils.AddParameter(cmd, "@Id", leaderboardEntry.Id);
                    DbUtils.AddParameter(cmd, "@TotalSolvedPuzzles", leaderboardEntry.TotalSolvedPuzzles);
                    DbUtils.AddParameter(cmd, "@TotalPoints", leaderboardEntry.TotalPoints);
                    DbUtils.AddParameter(cmd, "@CurrentStreak", leaderboardEntry.CurrentStreak);
                    DbUtils.AddParameter(cmd, "@BestStreak", leaderboardEntry.BestStreak);
                    DbUtils.AddParameter(cmd, "@Rank", leaderboardEntry.Rank);
                    DbUtils.AddParameter(cmd, "@UserId", leaderboardEntry.UserId);
                    DbUtils.AddParameter(cmd, "@LastSolvedPuzzleId", leaderboardEntry.LastSolvedPuzzleId);

                    leaderboardEntry.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Leaderboard GetEntryById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Leaderboard
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Leaderboard leaderboardEntry = null; 

                    if (reader.Read())
                    {
                        leaderboardEntry = NewEntryFromReader(reader);
                    }

                    reader.Close();
                    return leaderboardEntry;
                }
            }
        }

        public Leaderboard GetEntryByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Leaderboard
                        WHERE UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    Leaderboard leaderboardEntry = null; 

                    if (reader.Read())
                    {
                        leaderboardEntry = NewEntryFromReader(reader); 
                    }

                    reader.Close();
                    return leaderboardEntry;
                }
             }
        }

        private static Leaderboard NewEntryFromReader(SqlDataReader reader)
        {
            return new Leaderboard()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                TotalSolvedPuzzles = DbUtils.GetInt(reader, "TotalSolvedPuzzles"),
                TotalPoints = DbUtils.GetInt(reader, "TotalPoints"),
                CurrentStreak = DbUtils.GetInt(reader, "CurrentStreak"),
                BestStreak = DbUtils.GetInt(reader, "BestStreak"),
                Rank = DbUtils.GetInt(reader, "Rank"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                LastSolvedPuzzleId = DbUtils.GetInt(reader, "LastSolvedPuzzleId"),
                RankedAt = reader.GetDateTime(reader.GetOrdinal("RankedAt"))
            };
        }
    }
}
