using Mapster;
using MedienVerwaltungDBDLL;
using MedienVerwaltungDLL.Models.Interpret;
using MedienVerwaltungDLL.Models.Song;
using medienVerwaltungWeb.Server.Services.Functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace medienVerwaltungWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly MedienVerwaltungContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ControllerFunctions _controllerFunctions;

        public SongController(MedienVerwaltungContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _controllerFunctions = new();
        }

        // GET: api/SongDTO
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SongDTO>>> GetSongDTOs()
        {
            return await _context.Songs.Select(s => new SongDTO
            {
                Id = s.Id,
                Title = s.Title,
                Length = s.Length,
                InterpretFullName = s.InterpretFullName,
                Location = s.Location
            }).ToListAsync();
        }

        [HttpGet("GetSongsByCount/{count}")]
        public async Task<ActionResult<List<SongDTO>>> GetSongsByCount(int count)
        {
            var toReturnList = await _context.Songs.ToListAsync();

            return toReturnList.Take(count).Adapt<List<SongDTO>>();
        }

        [HttpGet("SearchSongsByTitle/{title},{count}")]
        public async Task<List<SongDTO>> SearchSongsByTitle(string title, int count)
        {
            var toSortList = await _context.Songs.ToListAsync();

            var output = _controllerFunctions.SearchByTitle(toSortList, title, count);

            return output.Adapt<List<SongDTO>>();
        }

        // [HttpGet("GetSongsByProperty/{count}")]
        // public async Task<List<SongDTO>> GetSongsByProperty(int count, bool sortByTitle, bool sortByLength, bool sortByLocation, bool sortByInterpretName)
        // {
        //     var toSortList = await _context.Songs.ToListAsync();

        //     if (sortByTitle)
        //     {
        //         toSortList = toSortList.OrderBy(s => s.Title).ToList();
        //     }
        //     else if (sortByLength)
        //     {
        //         toSortList = toSortList.OrderBy(s => s.Length).ToList();
        //     }
        //     else if (sortByLocation)
        //     {
        //         toSortList = toSortList.OrderBy(s => s.Location).ToList();
        //     }
        //     else if (sortByInterpretName)
        //     {
        //         toSortList = toSortList.OrderBy(s => s.InterpretFullName).ToList();
        //     }

        //     return toSortList.Take(count).Adapt<List<SongDTO>>();
        // }

        [HttpGet("SongPagination/{page},{itemsPerPage}")]
        public async Task<ActionResult<List<SongDTO>>> SongPagination(int page, int itemsPerPage)
        {
            var toSortList = await _context.Songs.ToListAsync();

            var output = _controllerFunctions.Pagination(toSortList, itemsPerPage, page);

            return output.Adapt<List<SongDTO>>();
        }

        [HttpGet("IsPageLastPage/{page},{pageSize}")]
        public async Task<ActionResult<bool>> IsPageLastPage(int page, int pageSize)
        {
            var songs = await _context.Songs.ToListAsync();
            var toReturnBool = false;

            if (songs.Count / pageSize <= page)
            {
                toReturnBool = true;
            }

            return toReturnBool;
        }

        [HttpGet("GetPageCount/{pageSize}")]
        public async Task<ActionResult<int>> GetPageCount(int pageSize)
        {
            var songList = await _context.Songs.ToListAsync();

            return songList.Count / pageSize;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<SongDTO>> GetSong(int id)
        {
            var song = await _unitOfWork.Songs.GetByIdAsync(id);

            if (song == null)
            {
                return NotFound();
            }

            return song.Adapt<SongDTO>();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSong(int id, SongDTO song)
        {
            if (id != song.Id)
            {
                return BadRequest();
            }

            _context.Entry(song.Adapt<Song>()).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SongExists(id))
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
        public async Task<ActionResult<SongDTO>> PostSong(SongDTO song)
        {
            var toAddSong = await GetMissingSongInfo(song);

            _unitOfWork.Add(toAddSong);
            await _unitOfWork.BeginTransactionAsync();

            return CreatedAtAction("GetSong", new { id = toAddSong.Id }, song);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(int id)
        {
            var song = await _unitOfWork.Songs.GetByIdAsync(id);
            if (song == null)
            {
                return NotFound();
            }

            _unitOfWork.Remove(song);
            await _unitOfWork.BeginTransactionAsync();
            System.Console.WriteLine("Song Deleted");

            return NoContent();
        }
        private bool SongExists(int id)
        {
            return _context.Songs.Any(e => e.Id == id);
        }
        private async Task<Song> GetMissingSongInfo(SongDTO song)
        {
            var interprets = await _context.Interprets.Select(i => new Interpret
            {
                Id = i.Id,
                FirstName = i.FirstName,
                Name = i.Name,
            }).ToListAsync();

            var newSong = new Song()
            {
                Id = song.Id,
                Title = song.Title ?? string.Empty,
                Length = song.Length,
                InterpretFullName = song.InterpretFullName ?? string.Empty,
                Location = song.Location
            };
            var foundInterpret = false;

            foreach (var interpret in interprets)
            {
                if (interpret.FullName == newSong.InterpretFullName)
                {
                    newSong.InterpretId = interpret.Id;
                    foundInterpret = true;
                    break;
                }
            }

            if (!foundInterpret)
            {
                var interpretName = newSong.InterpretFullName.Split(" ") ?? throw new Exception("Interpret name could not be splitted");

                Interpret newInterpret;

                if (interpretName.Length > 2)
                {
                    newInterpret = new Interpret
                    {
                        FirstName = interpretName[0],
                        Name = interpretName[1],
                        BirthDate = DateTime.Now,
                    };
                }
                else
                {
                    newInterpret = new Interpret
                    {
                        FirstName = interpretName[0],
                        BirthDate = DateTime.Now,
                    };
                }

                _unitOfWork.Add(newInterpret);
                await _unitOfWork.BeginTransactionAsync();

                newSong.InterpretId = newInterpret.Id;
            }

            return newSong;
        }
    }
}