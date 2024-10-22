namespace Blocklingo.Models
{
    public class UserAchievement
    {
        public int Id { get; set; }
        public int UserId { get; set; } 
        public Achievement Achievement { get; set; }   
    }
}
