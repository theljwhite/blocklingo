using System.ComponentModel.DataAnnotations;

namespace Capstone1.Models
{
    public class UserProfile
    {
       public int Id { get; set; }

        [Required]
        public string Username { get; set; } = "";

        [Required]
        public string Password { get; set; } = "";

        public string? FirstName { get; set; } = "";
        public string? LastName { get; set; } = "";

        public string Email { get; set; } = "";

        public string? Avatar { get; set; } = "";

        public string? WalletAddress { get; set; } = "";

        [Required]
        public DateTime CreatedAt { get; set; } 

        public DateTime? LastLoginDate { get; set; }

        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }

    }
}
