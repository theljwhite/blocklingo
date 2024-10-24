using Blocklingo.Models;

namespace Blocklingo.Repositories
{
    public interface IUserAchievementRepository
    {
        public void Add(UserAchievement userAchievement);
        public List<Achievement> GetAchievementsByUserId(int userId);
        public List<Achievement> GetAchievementsByUsername(string username);
        public UserAchievement GetUserAchievementById(int id);
    }
}
