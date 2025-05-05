using MedienVerwaltungDBDLL;
using MedienVerwaltungDLL.Models.Movie;
using medienVerwaltungWeb.Server.Services.Functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace medienVerwaltungWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MedienVerwaltungContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ControllerFunctions _controllerFunctions;

        public MovieController(MedienVerwaltungContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _controllerFunctions = new();
        }

        // GET: api/Movie
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
            return await _context.Movies.Select(m => new Movie
            {
                Id = m.Id,
                Title = m.Title,
                Length = m.Length,
                Location = m.Location,
                ActorIDs = m.ActorIDs,
                Description = m.Description,
                Genre = m.Genre,
                ReleaseYear = m.ReleaseYear,
            }).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id)
        {
            var movie = await _unitOfWork.Movies.GetByIdAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        [HttpGet("SearchMovieByTitle/{title},{count}")]
        public async Task<ActionResult<List<Movie>>> SearchMovieByTitle(string title, int count)
        {
            var toSortList = await _context.Movies.ToListAsync();

            var output = _controllerFunctions.SearchByTitle(toSortList, title, count);

            return output;
        }

        [HttpGet("MoviePagination/{page},{pageSize}")]
        public async Task<ActionResult<List<Movie>>> MoviePagination(int page, int pageSize)
        {
            var toSortList = await _context.Movies.ToListAsync();

            var output = _controllerFunctions.Pagination(toSortList, page, pageSize);

            return output;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Movie>> PostMovie(Movie movie)
        {
            _unitOfWork.Add(movie);
            await _unitOfWork.BeginTransactionAsync();

            return CreatedAtAction("GetMovie", new { id = movie.Id }, movie);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _unitOfWork.Movies.GetByIdAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _unitOfWork.Remove(movie);
            await _unitOfWork.BeginTransactionAsync();

            return NoContent();
        }

        private bool MovieExists(int id)
        {
            return _context.Songs.Any(e => e.Id == id);
        }
    }
}
