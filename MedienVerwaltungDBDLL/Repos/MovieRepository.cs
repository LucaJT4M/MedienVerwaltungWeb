using MedienVerwaltungDLL.Models.Movie;

namespace MedienVerwaltungDBDLL.Repos
{
    public class MovieRepository(MedienVerwaltungContext context) : IMovieRepository
    {
        private readonly MedienVerwaltungContext _context = context;

        public async Task<Movie?> GetByIdAsync(int ID)
        {
            return await _context.Movies.FindAsync(ID);
        }
        public async Task AddAsync(Movie movie)
        {
            await _context.Movies.AddAsync(movie);
        }

        public void Update(Movie movie)
        {
            _context.Movies.Update(movie);
        }

        public void Remove(Movie movie)
        {
            _context.Movies.Remove(movie);
        }
    }
}