using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.Data;
using Blocklingo.Repositories;
using Blocklingo.Models; 

namespace Blocklingo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) {
            var profile = _userProfileRepository.GetById(id);

            if (profile == null) return NotFound();
            return Ok(profile); 
        }

        //The below works for demo purposes
        [HttpPost("login")]
        public IActionResult Post(LoginRequest loginRequest)
        {
            var user = _userProfileRepository.GetByEmail(loginRequest.Email);

            if (user == null)
            {
                return NotFound(new { message = "An account was not found with that email." });
            }

            if (user.Password != loginRequest.Password)
            {
                return Unauthorized(new { message = "The password you entered was incorrect." });
            }

            var userWithoutPassword = new
            {
                user.Id,
                user.Username,
                user.FirstName,
                user.LastName,
                user.Email,
                user.Avatar,
                user.WalletAddress,
                user.CreatedAt,
                user.LastLoginDate, 
                user.UserTypeId, 
                user.UserType
            };

            return Ok(userWithoutPassword);
        }

        [HttpPost]
        public IActionResult Post(UserProfile profile)
        {
            var createdUser = _userProfileRepository.Add(profile);

            if (createdUser == null) {
                return BadRequest(new { message = "Failed to create user" });
            }

            var userWithoutPassword = new
            {
                createdUser.Id,
                createdUser.Username,
                createdUser.FirstName,
                createdUser.LastName,
                createdUser.Email,
                createdUser.Avatar,
                createdUser.WalletAddress,
                createdUser.CreatedAt,
                createdUser.LastLoginDate,
                createdUser.UserTypeId,
                createdUser.UserType
            };

            return Ok(userWithoutPassword);

        }
    }
}
