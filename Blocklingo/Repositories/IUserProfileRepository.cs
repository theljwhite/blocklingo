using Blocklingo.Models; 

namespace Blocklingo.Repositories
{
    public interface IUserProfileRepository
    {
        public List<UserProfile> GetAll();
        public UserProfile GetById(int id);
        public UserProfile GetByEmail(string email); 
        public UserProfile GetByUsername(string username);
        public UserProfile Add(UserProfile profile);
    }
}
