using Microsoft.AspNetCore.Mvc;
using Blocklingo.Repositories;
using Blocklingo.Models;

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
    }
}
