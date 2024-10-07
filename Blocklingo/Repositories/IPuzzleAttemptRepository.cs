using Blocklingo.Models; 

namespace Blocklingo.Repositories
{
    public interface IPuzzleAttemptRepository
    {
        public PuzzleAttempt GetById(int id);
        public List<PuzzleAttempt> GetAllByUserId(int id);
        public void Add(PuzzleAttempt puzzleAttempt); 
        public void Update(PuzzleAttempt puzzleAttempt);
    }
}
