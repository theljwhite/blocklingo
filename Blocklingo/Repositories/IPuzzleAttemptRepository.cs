using Blocklingo.Models; 

namespace Blocklingo.Repositories
{
    public interface IPuzzleAttemptRepository
    {
        public PuzzleAttempt GetByPuzzleAndUserId(int puzzleId, int userId);
        public PuzzleAttempt GetById(int id);
        public List<PuzzleAttempt> GetAllByUserId(int id);
        public void Add(PuzzleAttempt puzzleAttempt); 
        public void Solve(PuzzleAttempt puzzleAttempt);
        public void IncrementTries(int id);
    }
}
