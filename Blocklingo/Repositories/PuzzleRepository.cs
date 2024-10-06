using Blocklingo.Models;
using Blocklingo.Utils;
using Microsoft.Data.SqlClient;

//TODO fix GetById() 
//for now, 2 separate calls will work to get required puzzle data in the correct shape.
//(GetPuzzleDetails) and (GetOnlyTriggerAndPuzzleWordsById),

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
                        LEFT JOIN PuzzleWords pw ON pd.Id = pw.PuzzleId";

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

        public Puzzle GetPuzzleDetailsById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.*, gw.Word AS GuessWord, gw.CreatedAt AS GuessWordCreatedAt
                        FROM Puzzle P
                        JOIN GuessWord gw ON p.GuessWordId = gw.Id
                        WHERE p.Id = @PuzzleId";
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


        public Dictionary<string, List<string>> GetOnlyTriggerAndPuzzleWordsById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        WITH TriggerPuzzleMapping AS (
                            SELECT tw.Word AS TriggerWord, pw.Word AS PuzzleWord, ptw.*
                            FROM PuzzleTriggerWord ptw
                            JOIN TriggerWord tw ON ptw.TriggerWordId = tw.Id
                            JOIN PuzzlePuzzleWord ppw ON ptw.PuzzleId = ppw.PuzzleId
                            JOIN PuzzleWord pw ON ppw.PuzzleWordId = pw.Id
                            WHERE ptw.PuzzleId = @PuzzleId AND pw.TriggerWordId = tw.Id
                        )
                        SELECT TriggerWord, STRING_AGG(PuzzleWord, ', ') AS PuzzleWords
                        FROM TriggerPuzzleMapping
                        GROUP BY TriggerWord";

                    DbUtils.AddParameter(cmd, "@PuzzleId", id);

                    var reader = cmd.ExecuteReader();
                    var triggerPuzzleMap = new Dictionary<string, List<string>>();

                    while (reader.Read()) {
                        var triggerWord = DbUtils.GetString(reader, "TriggerWord");
                        var puzzleWordsString = DbUtils.GetString(reader, "PuzzleWords");

                        var puzzleWords = puzzleWordsString?.Split(", ").ToList();

                        if (triggerWord != null && puzzleWords != null)
                        {
                            triggerPuzzleMap[triggerWord] = puzzleWords;
                        }
                    }

                    reader.Close();
                    return triggerPuzzleMap;
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
                TriggerGroupId = DbUtils.GetInt(reader, "TriggerGroupId"),
                GuessWord = new GuessWord()
                {
                    Id = DbUtils.GetInt(reader, "GuessWordId"),
                    Word = DbUtils.GetString(reader, "GuessWord"),
                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("GuessWordCreatedAt")), 
                },
                
            };
        }
    }
}
