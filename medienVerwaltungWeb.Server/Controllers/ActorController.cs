using MedienVerwaltungDBDLL;
using MedienVerwaltungDLL.Models.Actor;
using medienVerwaltungWeb.Server.Services.Functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace medienVerwaltungWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly MedienVerwaltungContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ControllerFunctions _controllerFunctions;

        public ActorController(MedienVerwaltungContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _controllerFunctions = new();
        }

        // GET: api/Actor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Actor>>> GetActors()
        {
            return await _context.Actors.ToListAsync();
        }

        // GET: api/Actor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Actor>> GetActor(int id)
        {
            var actor = await _unitOfWork.Actors.GetByIdAsync(id);

            if (actor == null)
            {
                return NotFound();
            }

            return actor;
        }

        [HttpGet("SearchActorByFullName/{firstName},{count}")]
        public async Task<List<Actor>> SearchActorByFullName(string firstName, int count)
        {
            var toSortList = await _context.Actors.ToListAsync();

            var output = _controllerFunctions.SearchByFirstName(toSortList, firstName, count);

            return output;
        }

        [HttpGet("ActorPagination/{page},{pageSize}")]
        public async Task<ActionResult<List<Actor>>> ActorPagination(int page, int pageSize)
        {
            var actors = await _context.Actors.ToListAsync();

            return actors.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }

        // PUT: api/Actor/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActor(int id, Actor actor)
        {
            if (id != actor.Id)
            {
                return BadRequest();
            }

            _context.Entry(actor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActorExists(id))
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

        // POST: api/Actor
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Actor>> PostActor(Actor actor)
        {
            _unitOfWork.Add(actor);
            await _unitOfWork.BeginTransactionAsync();

            return CreatedAtAction("GetActor", new { id = actor.Id }, actor);
        }

        // DELETE: api/Actor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActor(int id)
        {
            var actor = await _unitOfWork.Actors.GetByIdAsync(id);
            if (actor == null)
            {
                return NotFound();
            }

            _unitOfWork.Remove(actor);
            await _unitOfWork.BeginTransactionAsync();

            return NoContent();
        }

        private bool ActorExists(int id)
        {
            return _context.Actors.Any(e => e.Id == id);
        }
    }
}
