using Mapster;
using MedienVerwaltungDBDLL;
using MedienVerwaltungDLL.Models.Interpret;
using medienVerwaltungWeb.Server.Services.Functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace medienVerwaltungWeb.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InterpretController : ControllerBase
    {
        private readonly MedienVerwaltungContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ControllerFunctions _controllerFunctions;

        public InterpretController(MedienVerwaltungContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _controllerFunctions = new();
        }

        // GET: api/Interpret
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Interpret>>> GetInterpret()
        {
            return await _context.Interprets.ToListAsync();
        }

        [HttpGet("GetInterpretsByCount/{count}")]
        public async Task<ActionResult<List<Interpret>>> GetInterpretsByCount(int count)
        {
            var toReturnList = await _context.Interprets.ToListAsync();

            return toReturnList.Take(count).ToList();
        }

        [HttpGet("SearchInterpretsByName/{name},{count}")]
        public async Task<IEnumerable<Interpret>> SearchInterpretsByName(string name, int count)
        {
            var toSortList = await _context.Interprets.ToListAsync();

            var output = _controllerFunctions.SearchByFirstName(toSortList, name, count);

            return output;
        }

        [HttpGet("InterpretPagination/{page},{itemsPerPage}")]
        public async Task<ActionResult<List<Interpret>>> InterpretPagination(int page, int itemsPerPage)
        {
            var toSortList = await _context.Interprets.ToListAsync();

            var output = _controllerFunctions.Pagination(toSortList, itemsPerPage, page);

            return output;
        }

        [HttpGet("IsPageLastPage/{page},{pageSize}")]
        public async Task<ActionResult<bool>> IsPageLastPage(int page, int pageSize)
        {
            var Interprets = await _context.Interprets.ToListAsync();
            var toReturnBool = false;

            if (Interprets.Count / pageSize <= page)
            {
                toReturnBool = true;
            }

            return toReturnBool;
        }

        [HttpGet("GetPageCount/{pageSize}")]
        public async Task<ActionResult<int>> GetPageCount(int pageSize)
        {
            var InterpretList = await _context.Interprets.ToListAsync();

            return InterpretList.Count / pageSize;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Interpret>> GetInterpret(int id)
        {
            var Interpret = await _unitOfWork.Interprets.GetByIdAsync(id);

            if (Interpret == null)
            {
                return NotFound();
            }

            return Interpret;
        }

        [HttpGet("InterpretExists")]
        public async Task<bool> InterpretExists([FromQuery] Interpret interpret)
        {
            var interpretList = await _context.Interprets.AsNoTracking().ToListAsync();

            foreach (var currentInterpret in interpretList)
            {
                if (currentInterpret.FullName == interpret.FullName && currentInterpret.BirthDate == interpret.BirthDate && currentInterpret.Gender == interpret.Gender)
                {
                    return true;
                }
            }
            return false;
        }

        [HttpGet("GetInterpretFullnames")]
        public async Task<IEnumerable<string>> GetInterpretFullnames()
        {
            var interpretList = await _context.Interprets.AsNoTracking().Select(i => i.FullName).ToListAsync();

            return interpretList;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInterpret(int id, Interpret interpret)
        {
            if (id != interpret.Id)
            {
                return BadRequest();
            }

            _context.Entry(interpret).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InterpretExists(id))
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
        public async Task<ActionResult<InterpretDTO>> PostInterpret(InterpretDTO inputInterpret)
        {
            // var toAddInterpret = await GetMissingInterpretInfo(interpret);

            var interpret = inputInterpret.Adapt<Interpret>();

            var dateArr = inputInterpret.BirthDate.Split(".");

            if (dateArr.Length == 3)
            {
                interpret.BirthDate = new DateTime(int.Parse(dateArr[2]), int.Parse(dateArr[1]), int.Parse(dateArr[0]));
            }
            else
            {
                interpret.BirthDate = DateTime.Now;
            }

            _unitOfWork.Add(interpret);
            await _unitOfWork.BeginTransactionAsync();

            return CreatedAtAction("GetInterpret", new { id = interpret.Id }, interpret);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInterpret(int id)
        {
            var Interpret = await _unitOfWork.Interprets.GetByIdAsync(id);
            if (Interpret == null)
            {
                return NotFound();
            }

            _unitOfWork.Remove(Interpret);
            await _unitOfWork.BeginTransactionAsync();

            return NoContent();
        }
        private bool InterpretExists(int id)
        {
            return _context.Interprets.Any(e => e.Id == id);
        }
        // private async Task<Interpret> GetMissingInterpretInfo(Interpret Interpret)
        // {
        //     var interprets = await _context.Interprets.Select(i => new Interpret
        //     {
        //         Id = i.Id,
        //         FirstName = i.FirstName,
        //         Name = i.Name,
        //     }).ToListAsync();

        //     var newInterpret = new Interpret()
        //     {
        //         Id = Interpret.Id,
        //         Title = Interpret.Title ?? string.Empty,
        //         Length = Interpret.Length,
        //         InterpretFullName = Interpret.InterpretFullName ?? string.Empty,
        //         Location = Interpret.Location
        //     };
        //     var foundInterpret = false;

        //     foreach (var interpret in interprets)
        //     {
        //         if (interpret.FullName == newInterpret.InterpretFullName)
        //         {
        //             newInterpret.InterpretId = interpret.Id;
        //             foundInterpret = true;
        //             break;
        //         }
        //     }

        //     if (!foundInterpret)
        //     {
        //         var interpretName = newInterpret.InterpretFullName.Split(" ") ?? throw new Exception("Interpret name could not be splitted");

        //         Interpret newInterpret;

        //         if (interpretName.Length > 2)
        //         {
        //             newInterpret = new Interpret
        //             {
        //                 FirstName = interpretName[0],
        //                 Name = interpretName[1],
        //                 BirthDate = DateTime.Now,
        //             };
        //         }
        //         else
        //         {
        //             newInterpret = new Interpret
        //             {
        //                 FirstName = interpretName[0],
        //                 BirthDate = DateTime.Now,
        //             };
        //         }

        //         _unitOfWork.Add(newInterpret);
        //         await _unitOfWork.BeginTransactionAsync();

        //         newInterpret.InterpretId = newInterpret.Id;
        //     }

        //     return newInterpret;
        // }
    }
}