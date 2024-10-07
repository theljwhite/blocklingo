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
        public IActionResult Get(int id)
        {
            var puzzleAttempt = _puzzleAttemptRepository.GetById(id);

            if (puzzleAttempt == null) return NotFound();

            return Ok(puzzleAttempt);
        }

        [HttpGet("/user/{userId}")]
        public IActionResult GetAllByUserId(int userId) { 
        
            var puzzleAttempts = _puzzleAttemptRepository.GetAllByUserId(userId);
            return Ok(puzzleAttempts);
        }

        [HttpPost]
        public IActionResult Post(PuzzleAttempt puzzleAttempt)
        {
            _puzzleAttemptRepository.Add(puzzleAttempt);    
            return CreatedAtAction("GetById", new {id =  puzzleAttempt.Id});
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PuzzleAttempt puzzleAttempt) { 
            
            if (id != puzzleAttempt.Id)
            {
                return BadRequest();
            }

            _puzzleAttemptRepository.Update(puzzleAttempt);

            return NoContent();

        }
    }
}
