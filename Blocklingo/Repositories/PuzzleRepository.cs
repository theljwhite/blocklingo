using Blocklingo.Models;
using Blocklingo.Utils;
using Microsoft.Data.SqlClient;

namespace Blocklingo.Repositories
{
    public class PuzzleRepository: BaseRepository, IPuzzleRepository
    {

        public PuzzleRepository(IConfiguration configuration): base(configuration) { }

        public Puzzle GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand()) {

                    cmd.CommandText = @"
                        WITH PuzzleData AS (
                            SELECT 
                                p.Id, p.Name, p.CreatedAt, p.Difficulty, p.Points, p.RewardAmount, 
                                p.ExpirationAt, gw.Word AS GuessWord
                            FROM Puzzle p
                            JOIN GuessWord gw ON p.GuessWordId = gw.Id
                            WHERE p.Id = @PuzzleId
                        ),
                        TriggerWords AS (
                            SELECT ptw.PuzzleId, STRING_AGG(tw.Word, ', ') AS TriggerWords
                            FROM PuzzleTriggerWord ptw
                            JOIN TriggerWord tw ON ptw.TriggerWordId = tw.Id
                            WHERE ptw.PuzzleId = @PuzzleId
                            GROUP BY ptw.PuzzleId
                        ),
                        PuzzleWords AS (
                            SELECT ppw.PuzzleId, STRING_AGG(pw.Word, ', ') AS PuzzleWords
                            FROM PuzzlePuzzleWord ppw
                            JOIN PuzzleWord pw ON ppw.PuzzleWordId = pw.Id
                            WHERE ppw.PuzzleId = @PuzzleId
                            GROUP BY ppw.PuzzleId
                        )
                        SELECT pd.*, tw.TriggerWords, pw.PuzzleWords
                        FROM PuzzleData pd
                        LEFT JOIN TriggerWords tw ON pd.Id = tw.PuzzleId
                        LEFT JOIN PuzzleWords pw ON pd.Id = pw.PuzzleId;";

                    DbUtils.AddParameter(cmd, "@PuzzleId", id);

                    var reader = cmd.ExecuteReader();
                    Puzzle puzzle = null; 

                    if (reader.Read())
                    {
                        puzzle = NewPuzzleFromReader(reader);
                    }

                    reader.Close();
                    return puzzle;
                }
            }
        }

    private static Puzzle NewPuzzleFromReader(SqlDataReader reader)
        {
            return new Puzzle()
            {
                Id = DbUtils.GetInt(reader, "Id"), 
                Name = DbUtils.GetString(reader, "Name"),  
                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                Difficulty = DbUtils.GetString(reader, "Difficulty"),
                Points = DbUtils.GetInt(reader, "Points"), 
                RewardAmount = reader.GetDecimal(reader.GetOrdinal("RewardAmount")),
                ExpirationAt = reader.GetDateTime(reader.GetOrdinal("ExpirationAt")),
                TriggerWords = DbUtils.GetString(reader, "TriggerWords")
                ?.Split(", ")
                .ToList(),

                PuzzleWords = DbUtils.GetString(reader, "PuzzleWords")
                ?.Split(", ")
                .ToList(),
                GuessWord = DbUtils.GetString(reader, "GuessWord")
            };
        }
    }
}
