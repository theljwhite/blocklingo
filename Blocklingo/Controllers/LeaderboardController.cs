using Blocklingo.Repositories;
using Blocklingo.Models; 
using Microsoft.AspNetCore.Mvc;

namespace Blocklingo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderboardController : ControllerBase
    {
        private readonly ILeaderboardRepository _leaderboardRepository;

        public LeaderboardController(ILeaderboardRepository leaderboardRepository)
        {
            _leaderboardRepository = leaderboardRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetEntryById(int id)
        {
            var entry = _leaderboardRepository.GetEntryById(id);

            if (entry == null) return NotFound();

            return Ok(entry);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetEntryByUserId(int userId)
        {
            var entry = _leaderboardRepository.GetEntryByUserId(userId);
            if (entry == null) return NotFound();

            return Ok(entry);
        }

        [HttpPost]
        public IActionResult Post(Leaderboard leaderboardEntry)
        {
            _leaderboardRepository.Add(leaderboardEntry);
            return CreatedAtAction("GetById", new {id =  leaderboardEntry.Id}); 
        }
    }
}
