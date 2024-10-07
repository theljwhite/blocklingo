using Blocklingo.Models; 

namespace Blocklingo.Repositories
{
    public interface IPuzzleRepository
    {
        public Puzzle GetById(int id);
        public Puzzle GetPuzzleDetailsById(int id);
        public List<Puzzle> GetAllUserUnattempted(int userId);
        public List<Puzzle> GetAllUserUnsolved(int userId);
        public Dictionary<string, List<string>> GetOnlyTriggerAndPuzzleWordsById(int id);
    }
}
