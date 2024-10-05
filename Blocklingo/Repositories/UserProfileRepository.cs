using Blocklingo.Models; 
using Blocklingo.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;

//TODO - can hash passwords. for demo purposes, plain text works.

namespace Blocklingo.Repositories
{
    public class UserProfileRepository: BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }    

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.Username, up.FirstName, 
	                           up.LastName, up.Email, up.Avatar,
	                           up.WalletAddress, up.CreatedAt,up.LastLoginDate,
	                           up.UserTypeId, ut.Name AS UserTypeName 
                        FROM UserProfile up
                        JOIN UserType ut ON ut.Id = up.UserTypeId";

                    var reader = cmd.ExecuteReader();
                    List<UserProfile> profiles = []; 

                    while (reader.Read())
                    {
                        profiles.Add(NewUserProfileFromReader(reader));
                    }

                    reader.Close();
                    return profiles; 
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open(); 
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.Username, up.FirstName, 
	                           up.LastName, up.Email, up.Avatar,
	                           up.WalletAddress, up.CreatedAt,up.LastLoginDate,
	                           up.UserTypeId, ut.Name AS UserTypeName 
                        FROM UserProfile up
                        JOIN UserType ut ON ut.Id = up.UserTypeId
                        WHERE up.Id = @id";

                    DbUtils.AddParameter(cmd, "id", id);

                    var reader = cmd.ExecuteReader();
                    UserProfile profile = null; 

                    if (reader.Read())
                    {
                        profile = NewUserProfileFromReader(reader);
                    }

                    reader.Close();
                    return profile; 
                }
            }
        }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.*, ut.Name AS UserTypeName 
                        FROM UserProfile up
                        JOIN UserType ut ON ut.Id = up.UserTypeId
                        WHERE up.Email = @email";

                    DbUtils.AddParameter(cmd, "email", email);

                    var reader = cmd.ExecuteReader(); 
                    UserProfile profile = null;
                   
                    if (reader.Read())
                    {
                        profile = NewUserProfileFromReader(reader);
                        profile.Password = reader.GetString(reader.GetOrdinal("Password")); 

                    }

                    reader.Close();
                    return profile; 
                }
            }
        }

        public UserProfile Add(UserProfile profile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO UserProfile (Username, Password, FirstName, LastName, Email, Avatar, WalletAddress, CreatedAt, LastLoginDate, UserTypeId)
                OUTPUT INSERTED.Id
                VALUES (@Username, @Password, @FirstName, @LastName, @Email, @Avatar, @WalletAddress, @CreatedAt, @LastLoginDate, @UserTypeId)";

                    DbUtils.AddParameter(cmd, "@Username", profile.Username);
                    DbUtils.AddParameter(cmd, "@Password", profile.Password);  
                    DbUtils.AddParameter(cmd, "@FirstName", profile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", profile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", profile.Email);
                    DbUtils.AddParameter(cmd, "@Avatar", profile.Avatar);
                    DbUtils.AddParameter(cmd, "@WalletAddress", profile.WalletAddress);
                    DbUtils.AddParameter(cmd, "@CreatedAt", profile.CreatedAt);
                    DbUtils.AddParameter(cmd, "@LastLoginDate", profile.LastLoginDate);
                    DbUtils.AddParameter(cmd, "@UserTypeId", profile.UserTypeId);

                    profile.Id = (int)cmd.ExecuteScalar(); 
                }
            }
            return profile; 
        }


        private static UserProfile NewUserProfileFromReader(SqlDataReader reader)
        {
            return new UserProfile()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Username = DbUtils.GetString(reader, "Username"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                Email = DbUtils.GetString(reader, "Email"),
                Avatar = DbUtils.GetString(reader, "Avatar"),
                WalletAddress = DbUtils.GetString(reader, "WalletAddress"),
                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                LastLoginDate = DbUtils.GetDateTime(reader, "LastLoginDate"),
                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"), 
                UserType = new UserType()
                {
                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                    Name = DbUtils.GetString(reader, "UserTypeName")
                }
            };
        }
    }
}
