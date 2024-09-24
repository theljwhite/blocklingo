using Capstone1.Models; 

namespace Capstone1.Repositories
{
    public interface IUserProfileRepository
    {
        public List<UserProfile> GetAll();
        public UserProfile GetById(int id);
        public UserProfile GetByEmail(string email); 
        public UserProfile Add(UserProfile profile);
    }
}
