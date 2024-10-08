using Microsoft.AspNetCore.Mvc;
using Blocklingo.Repositories;
using Blocklingo.Models;

namespace Blocklingo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PuzzleAttemptController : ControllerBase
    {

        private readonly IPuzzleAttemptRepository _puzzleAttemptRepository;

        public PuzzleAttemptController(IPuzzleAttemptRepository puzzleAttemptRepository)
        {
            _puzzleAttemptRepository = puzzleAttemptRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var puzzleAttempt = _puzzleAttemptRepository.GetById(id);

            if (puzzleAttempt == null) return NotFound();

            return Ok(puzzleAttempt);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetAllByUserId(int userId) { 
        
            var puzzleAttempts = _puzzleAttemptRepository.GetAllByUserId(userId);
            return Ok(puzzleAttempts);
        }

        [HttpGet("user/{userId}/puzzle/{puzzleId}")]
        public IActionResult GetByPuzzleAndUserId(int puzzleId, int userId)
        {
            var puzzleAttempt = _puzzleAttemptRepository.GetByPuzzleAndUserId(puzzleId, userId);
            if (puzzleAttempt == null) return NotFound();

            return Ok(puzzleAttempt);
        }

        [HttpPost]
        public IActionResult Post(PuzzleAttempt puzzleAttempt)
        {
            _puzzleAttemptRepository.Add(puzzleAttempt);    
            return CreatedAtAction("GetById", new {id =  puzzleAttempt.Id});
        }

        [HttpPatch("{id}/increment")]
        public IActionResult IncrementPuzzleTries(int id) {
            
            _puzzleAttemptRepository.IncrementTries(id);
            return NoContent(); 
        
        }

        [HttpPut("{id}/solve")]
        public IActionResult SolvePuzzleAttempt(int id, PuzzleAttempt puzzleAttempt) { 
            
            if (id != puzzleAttempt.Id)
            {
                return BadRequest();
            }

            _puzzleAttemptRepository.Solve(puzzleAttempt);

            return NoContent();

        }
    }
}
