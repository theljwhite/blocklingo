using Blocklingo.Models; 

namespace Blocklingo.Repositories
{
    public interface IPuzzleRepository
    {
        public Puzzle GetById(int id);
    }
}
