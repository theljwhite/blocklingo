using Blocklingo.Models;
using Blocklingo.Utils;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Data.SqlClient;

namespace Blocklingo.Repositories
{
    public class PuzzleAttemptRepository: BaseRepository, IPuzzleAttemptRepository
    {
        public PuzzleAttemptRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(PuzzleAttempt puzzleAttempt)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PuzzleAttempt (Id, CompletionTimeSeconds, Tries, IsSolved, EarnedPoints, UserId, PuzzleId)
                        OUTPUT INSERTED.ID
                        Values (@Id, @CompletionTimeSeconds, @Tries, @IsSolved, @EarnedPoints, @UserId, @PuzzleId)";

                    DbUtils.AddParameter(cmd, "@Id", puzzleAttempt.Id);
                    DbUtils.AddParameter(cmd, "@CompletionTimeSeconds", puzzleAttempt.CompletionTimeSeconds);
                    DbUtils.AddParameter(cmd, "@IsSolved", puzzleAttempt.IsSolved);
                    DbUtils.AddParameter(cmd, "@EarnedPoints", puzzleAttempt.EarnedPoints);
                    DbUtils.AddParameter(cmd, "@UserId", puzzleAttempt.UserId);
                    DbUtils.AddParameter(cmd, "@PuzzleId", puzzleAttempt.PuzzleId);

                    var reader = cmd.ExecuteReader();
                    
                    puzzleAttempt.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(PuzzleAttempt puzzleAttempt) {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE PuzzleAttempt
                        SET CompletionTimeSeconds = @CompletionTimeSeconds,
                            Tries = @Tries,
                            IsSolved = @IsSolved,
                            EarnedPoints = @EarnedPoints
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", puzzleAttempt.Id);
                    DbUtils.AddParameter(cmd, "@CompletionTimeSeconds", puzzleAttempt.CompletionTimeSeconds);
                    DbUtils.AddParameter(cmd, "@IsSolved", puzzleAttempt.IsSolved);
                    DbUtils.AddParameter(cmd, "@EarnedPoints", puzzleAttempt.EarnedPoints);

                    cmd.ExecuteNonQuery();
                }
            }

        }

        public PuzzleAttempt GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM PuzzleAttempt WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id); 

                    var reader= cmd.ExecuteReader();
                    PuzzleAttempt puzzleAttempt = null; 

                    if (reader.Read())
                    {
                        puzzleAttempt = NewPuzzleAttemptFromReader(reader);
                    }

                    reader.Close();
                    return puzzleAttempt;
                }
            }
        }

        public List<PuzzleAttempt> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM PuzzleAttempt 
                        WHERE UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    List<PuzzleAttempt> puzzleAttempts = []; 

                    while (reader.Read())
                    {
                        puzzleAttempts.Add(NewPuzzleAttemptFromReader(reader)); 
                    }

                    reader.Close();
                    return puzzleAttempts;
                }
            }
        }

    private static PuzzleAttempt NewPuzzleAttemptFromReader(SqlDataReader reader)
        {
            return new PuzzleAttempt()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                CompletionTimeSeconds = DbUtils.GetInt(reader, "CompletionTimeSeconds"),
                Tries = DbUtils.GetInt(reader, "Tries"),
                IsSolved= reader.GetBoolean(reader.GetOrdinal("IsSolved")),
                EarnedPoints = DbUtils.GetInt(reader, "EarnedPoints"),
                UserId = DbUtils.GetInt(reader, "UserId"), 
                PuzzleId = DbUtils.GetInt(reader, "PuzzleId")
            };
        }
    }
}
