using MedienVerwaltungDBDLL;
using MedienVerwaltungDLL.Models.Interpret;
using MedienVerwaltungDLL.Models.MusicAlbum;
using medienVerwaltungWeb.Server.Services.Functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace medienVerwaltungWeb.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MusicAlbumController : ControllerBase
    {
        private readonly MedienVerwaltungContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ControllerFunctions _controllerFunctions;

        public MusicAlbumController(MedienVerwaltungContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _controllerFunctions = new();
        }

        // GET: api/MusicAlbum
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MusicAlbum>>> GetMusicAlbums()
        {
            return await _context.MusicAlbums.Select(m => new MusicAlbum
            {
                Id = m.Id,
                Title = m.Title,
                InterpretFullName = m.InterpretFullName,
                Location = m.Location,
                SongIdList = m.SongIdList
            }).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MusicAlbum>> GetMusicAlbum(int id)
        {
            var musicAlbum = await _unitOfWork.MusicAlbums.GetByIdAsync(id);

            if (musicAlbum == null)
            {
                return NotFound();
            }

            return musicAlbum;
        }

        [HttpGet("SearchMusicAlbumByTitle/{title},{count}")]
        public async Task<ActionResult<List<MusicAlbum>>> SearchMusicAlbumByTitle(string title, int count)
        {
            var toSortList = await _context.MusicAlbums.ToListAsync();

            var output = _controllerFunctions.SearchByTitle(toSortList, title, count);

            return output;
        }

        [HttpGet("MusicAlbumPagination/{page},{pageSize}")]
        public async Task<ActionResult<List<MusicAlbum>>> MusicAlbumPagination(int page, int pageSize)
        {
            var toSortList = await _context.MusicAlbums.ToListAsync();

            return _controllerFunctions.Pagination(toSortList, pageSize, page);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMusicAlbum(int id, MusicAlbum musicAlbum)
        {
            if (id != musicAlbum.Id)
            {
                return BadRequest();
            }

            _context.Entry(musicAlbum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MusicAlbumExists(id))
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
        public async Task<ActionResult<MusicAlbum>> PostMusicAlbum(MusicAlbum musicAlbum)
        {
            _unitOfWork.Add(musicAlbum);
            await _unitOfWork.BeginTransactionAsync();

            return CreatedAtAction("GetMusicAlbum", new { id = musicAlbum.Id }, musicAlbum);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMusicAlbum(int id)
        {
            var musicAlbum = await _unitOfWork.MusicAlbums.GetByIdAsync(id);
            if (musicAlbum == null)
            {
                return NotFound();
            }

            _unitOfWork.Remove(musicAlbum);
            await _unitOfWork.BeginTransactionAsync();

            return NoContent();
        }

        private bool MusicAlbumExists(int id)
        {
            return _context.MusicAlbums.Any(e => e.Id == id);
        }

        private async Task<MusicAlbum> GetMissingMusicAlbumInfo(MusicAlbum musicAlbum)
        {
            var interprets = await _context.Interprets.Select(i => new Interpret
            {
                Id = i.Id,
                FirstName = i.FirstName,
                Name = i.Name,
            }).ToListAsync();

            var newMusicAlbum = new MusicAlbum()
            {
                Id = musicAlbum.Id,
                Title = musicAlbum.Title,
                InterpretFullName = musicAlbum.InterpretFullName ?? string.Empty,
                Location = musicAlbum.Location ?? string.Empty,
                SongIdList = musicAlbum.SongIdList
            };
            var foundInterpret = false;

            foreach (var interpret in interprets)
            {
                if (interpret.FullName == newMusicAlbum.InterpretFullName)
                {
                    newMusicAlbum.InterpretId = interpret.Id;
                    foundInterpret = true;
                    break;
                }
            }

            if (!foundInterpret)
            {
                var interpretName = newMusicAlbum.InterpretFullName.Split(" ") ?? throw new Exception("Interpret name could not be splitted");

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

                newMusicAlbum.InterpretId = newInterpret.Id;
            }

            return newMusicAlbum;
        }
    }
}