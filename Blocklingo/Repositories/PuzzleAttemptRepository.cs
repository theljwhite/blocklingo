using Blocklingo.Models;
using Blocklingo.Utils;
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
                        INSERT INTO PuzzleAttempt (CompletionTimeSeconds, Tries, IsSolved, EarnedPoints, Mistakes, Guesses, UserId, PuzzleId, CreatedAt, UpdatedAt)
                        OUTPUT INSERTED.ID
                        Values (@CompletionTimeSeconds, @Tries, @IsSolved, @EarnedPoints, @Mistakes, @Guesses, @UserId, @PuzzleId, GETDATE(), GETDATE())";

                    DbUtils.AddParameter(cmd, "@Id", puzzleAttempt.Id);
                    DbUtils.AddParameter(cmd, "@CompletionTimeSeconds", puzzleAttempt.CompletionTimeSeconds);
                    DbUtils.AddParameter(cmd, "@Tries", puzzleAttempt.Tries);
                    DbUtils.AddParameter(cmd, "@IsSolved", puzzleAttempt.IsSolved);
                    DbUtils.AddParameter(cmd, "@EarnedPoints", puzzleAttempt.EarnedPoints);
                    DbUtils.AddParameter(cmd, "@Mistakes", puzzleAttempt.Mistakes);
                    DbUtils.AddParameter(cmd, "@Guesses", puzzleAttempt.Guesses); 
                    DbUtils.AddParameter(cmd, "@UserId", puzzleAttempt.UserId);
                    DbUtils.AddParameter(cmd, "@PuzzleId", puzzleAttempt.PuzzleId);
                    
                    puzzleAttempt.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void IncrementTries(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE PuzzleAttempt
                        SET Tries = Tries + 1,
                            UpdatedAt = GETDATE()
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Solve(PuzzleAttempt puzzleAttempt) {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE PuzzleAttempt
                        SET CompletionTimeSeconds = @CompletionTimeSeconds,
                            IsSolved = 1,
                            EarnedPoints = @EarnedPoints,
                            Mistakes = @Mistakes,
                            Guesses = @Guesses, 
                            UpdatedAt = GETDATE()
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", puzzleAttempt.Id);
                    DbUtils.AddParameter(cmd, "@CompletionTimeSeconds", puzzleAttempt.CompletionTimeSeconds);
                    DbUtils.AddParameter(cmd, "@EarnedPoints", puzzleAttempt.EarnedPoints);
                    DbUtils.AddParameter(cmd, "@Mistakes", puzzleAttempt.Mistakes);
                    DbUtils.AddParameter(cmd, "@Guesses", puzzleAttempt.Guesses);

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

        public PuzzleAttempt GetByPuzzleAndUserId(int puzzleId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM PuzzleAttempt
                                        WHERE PuzzleId = @PuzzleId AND UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@PuzzleId", puzzleId);
                    DbUtils.AddParameter(cmd, "@UserId", userId); 

                    var reader = cmd.ExecuteReader();
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
                Mistakes = DbUtils.GetInt(reader, "Mistakes"),
                Guesses = DbUtils.GetInt(reader, "Guesses"),
                UserId = DbUtils.GetInt(reader, "UserId"), 
                PuzzleId = DbUtils.GetInt(reader, "PuzzleId"),
                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                UpdatedAt = reader.GetDateTime(reader.GetOrdinal("UpdatedAt"))
            };
        }
    }
}
