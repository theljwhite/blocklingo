using Blocklingo.Models; 

namespace Blocklingo.Repositories
{
    public interface IPuzzleRepository
    {
        public Puzzle GetById(int id);
        public Puzzle GetPuzzleDetailsById(int id);
        public Dictionary<string, List<string>> GetOnlyTriggerAndPuzzleWordsById(int id);
    }
}
