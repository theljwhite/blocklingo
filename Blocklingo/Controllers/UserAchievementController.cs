using Microsoft.AspNetCore.Mvc;
using Blocklingo.Models;
using Blocklingo.Repositories;

//TODO: Post created at action

namespace Blocklingo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAchievementController : ControllerBase
    {
        private readonly IUserAchievementRepository _achievementRepository;

        public UserAchievementController(IUserAchievementRepository achievementRepository)
        {
            _achievementRepository = achievementRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userAchievement = _achievementRepository.GetUserAchievementById(id);    
            if (userAchievement == null) return NotFound(); 
            return Ok(userAchievement);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetAchievementsByUserId(int userId)
        {
            var userAchievements = _achievementRepository.GetAchievementsByUserId(userId);
            return Ok(userAchievements);
        }

        [HttpGet("username/{username}")]
        public IActionResult GetAchievementsByUsername(string username)
        {
            var userAchievements = _achievementRepository.GetAchievementsByUsername(username);
            return Ok(userAchievements);
        }

        [HttpPost]
        public IActionResult Post(UserAchievement achievement)
        {
            _achievementRepository.Add(achievement);
            return NoContent();
        }
    }
}
