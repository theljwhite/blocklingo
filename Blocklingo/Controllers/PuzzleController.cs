using Microsoft.AspNetCore.Mvc;
using Blocklingo.Repositories;
using Blocklingo.Models;

//TODO some of these may be temporary

namespace Blocklingo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PuzzleController : ControllerBase
    {
        private readonly IPuzzleRepository _puzzleRepository; 

        public PuzzleController(IPuzzleRepository puzzleRepository)
        {
            _puzzleRepository = puzzleRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var puzzle = _puzzleRepository.GetById(id);
            if (puzzle == null) return NotFound();

            return Ok(puzzle);
        }

        [HttpGet("details/{id}")]
        public IActionResult GetDetails(int id) { 
            
            var puzzleDetails = _puzzleRepository.GetPuzzleDetailsById(id);

            if (puzzleDetails == null) return NotFound();

            return Ok(puzzleDetails);
        }

        [HttpGet("words/{id}")]
        public IActionResult GetPuzzleWordsMap(int id)
        {
            var puzzleWordsMap = _puzzleRepository.GetOnlyTriggerAndPuzzleWordsById(id);

            if (puzzleWordsMap  == null) return NotFound(); 

            return Ok(puzzleWordsMap);

        }

        [HttpGet("best/{userId}")]
        public IActionResult GetBestAvailablePuzzles(int userId)
        {
            var unattempted = _puzzleRepository.GetAllUserUnattempted(userId);
            var unsolved = _puzzleRepository.GetAllUserUnsolved(userId);

            return Ok(new
            {
                unattempted,
                unsolved
            });
            
        }
    }
}
