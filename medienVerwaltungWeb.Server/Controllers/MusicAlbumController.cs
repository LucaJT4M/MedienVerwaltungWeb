using Mapster;
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

        // GET: api/MusicAlbumDTO
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MusicAlbumDTO>>> GetMusicAlbumDTOs()
        {
            return await _context.MusicAlbums.Select(m => new MusicAlbumDTO
            {
                Id = m.Id,
                Title = m.Title,
                InterpretFullName = m.InterpretFullName,
                Location = m.Location,
                SongIdList = m.SongIdList
            }).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MusicAlbumDTO>> GetMusicAlbum(int id)
        {
            var musicAlbum = await _unitOfWork.MusicAlbums.GetByIdAsync(id);

            if (musicAlbum == null)
            {
                return NotFound();
            }

            return musicAlbum.Adapt<MusicAlbumDTO>();
        }

        [HttpGet("SearchMusicAlbumByTitle/{title},{count}")]
        public async Task<ActionResult<List<MusicAlbumDTO>>> SearchMusicAlbumByTitle(string title, int count)
        {
            var toSortList = await _context.MusicAlbums.ToListAsync();

            var output = _controllerFunctions.SearchByTitle(toSortList, title, count);

            return output.Adapt<List<MusicAlbumDTO>>();
        }

        [HttpGet("MusicAlbumPagination/{page},{pageSize}")]
        public async Task<ActionResult<List<MusicAlbumDTO>>> MusicAlbumPagination(int page, int pageSize)
        {
            var toSortList = await _context.MusicAlbums.ToListAsync();

            return _controllerFunctions.Pagination(toSortList, pageSize, page).Adapt<List<MusicAlbumDTO>>();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMusicAlbum(int id, MusicAlbumDTO musicAlbum)
        {
            if (id != musicAlbum.Id)
            {
                return BadRequest();
            }

            _context.Entry(musicAlbum.Adapt<MusicAlbum>()).State = EntityState.Modified;

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
        public async Task<ActionResult<MusicAlbumDTO>> PostMusicAlbum(MusicAlbumDTO musicAlbum)
        {
            var toAddMusicAlbum = await GetMissingMusicAlbumInfo(musicAlbum);

            _unitOfWork.Add(toAddMusicAlbum);
            await _unitOfWork.BeginTransactionAsync();

            return CreatedAtAction("GetMusicAlbum", new { id = toAddMusicAlbum.Id }, musicAlbum);
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

        private async Task<MusicAlbum> GetMissingMusicAlbumInfo(MusicAlbumDTO musicAlbum)
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