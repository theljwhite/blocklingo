using Blocklingo.Models;
using Blocklingo.Utils;
using Microsoft.Data.SqlClient;

namespace Blocklingo.Repositories
{
    public class UserAchievementRepository: BaseRepository, IUserAchievementRepository
    {
        public UserAchievementRepository(IConfiguration configuration) : base(configuration) { }

    public UserAchievement GetUserAchievementById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ua.*, a.*
                        FROM UserAchievement ua
                        JOIN Achievement a ON ua.AchievementId = a.Id
                        Where ua.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    UserAchievement userAchievement = null;

                    if (reader.Read())
                    {
                        userAchievement = new UserAchievement()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Achievement = new Achievement()
                            {
                                Id = DbUtils.GetInt(reader, "AchievementId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Image = DbUtils.GetString(reader, "Image"),
                                Points = DbUtils.GetNullableInt(reader, "Points"),
                                EarnedAt = reader.GetDateTime(reader.GetOrdinal("EarnedAt")),
                            }
                        };
                    }

                    reader.Close();
                    return userAchievement;
                }  
            }
        }
        public List<Achievement> GetAchievementsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT ua.EarnedAt, ua.Id, a.Name, a.Description, a.Image, a.Points
                        FROM UserAchievement ua
                        JOIN Achievement a ON ua.AchievementId = a.Id
                        WHERE ua.UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId); 

                    var reader = cmd.ExecuteReader();
                    List<Achievement> userAchievements = []; 

                    while (reader.Read())
                    {
                        userAchievements.Add(NewAchievementFromReader(reader));
                    }

                    reader.Close();
                    return userAchievements;
                }
            }
        }

        public List<Achievement> GetAchievementsByUsername(string username) { 
        
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ua.EarnedAt, ua.Id, a.Name, a.Description, a.Image, a.Points
                        FROM UserAchievement ua
                        JOIN Achievement a ON ua.AchievementId = a.Id
                        JOIN UserProfile up ON ua.UserId = up.Id
                        WHERE up.Username = @Username";

                    DbUtils.AddParameter(cmd, "@Username", username);

                    var reader = cmd.ExecuteReader();
                    List<Achievement> userAchievements = []; 

                    while (reader.Read())
                    {
                        userAchievements.Add(NewAchievementFromReader(reader));
                    }

                    reader.Close();
                    return userAchievements;
                }

            }
        }

        public void Add(UserAchievement achievement) { 
            
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserAchievement (UserId, AchievementId, EarnedAt)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @AchievementId, GETDATE())";

                    DbUtils.AddParameter(cmd, "@UserId", achievement.UserId);
                    DbUtils.AddParameter(cmd, "@AchievementId", achievement.Achievement.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private static Achievement NewAchievementFromReader(SqlDataReader reader)
        {
            return new Achievement()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Description = DbUtils.GetString(reader, "Description"),
                Image = DbUtils.GetString(reader, "Image"),
                Points = DbUtils.GetNullableInt(reader, "Points"),
                EarnedAt = DbUtils.GetNullableDateTime(reader, "EarnedAt")
            };
        }
    }
}
