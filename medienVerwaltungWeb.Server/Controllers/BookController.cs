using Mapster;
using MedienVerwaltungDBDLL;
using MedienVerwaltungDLL.Models.Book;
using MedienVerwaltungDLL.Models.Interpret;
using medienVerwaltungWeb.Server.Services.Functions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace medienVerwaltungWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly MedienVerwaltungContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ControllerFunctions _controllerFunctions;
        public BookController(MedienVerwaltungContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _controllerFunctions = new();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.Select(b => new Book
            {
                Isbn = b.Isbn,
                Title = b.Title,
                Description = b.Description,
                InterpretFullName = b.InterpretFullName,
                Location = b.Location,
                PageCount = b.PageCount,
                ReleaseYear = b.ReleaseYear,
                InterpretId = b.InterpretId
            }).ToListAsync();
        }

        [HttpGet("{isbn}")]
        public async Task<ActionResult<Book>> GetBook(int isbn)
        {
            var book = await _unitOfWork.Books.GetByIdAsync(isbn);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpGet("SearchBooksByTitle/{title},{count}")]
        public async Task<ActionResult<List<Book>>> SearchBooksByTitle(string title, int count)
        {
            var toSortList = await _context.Books.ToListAsync();

            var output = _controllerFunctions.SearchByTitle(toSortList, title, count);

            return output;
        }

        [HttpGet("BookPagination/{page},{pageSize}")]
        public async Task<ActionResult<List<Book>>> BookPagination(int page, int pageSize)
        {
            var toSortList = await _context.Books.ToListAsync();

            var output = _controllerFunctions.Pagination(toSortList, pageSize, page);

            return output;
        }

        [HttpGet("GetPageCount/{pageSize}")]
        public async Task<ActionResult<int>> GetPageCount(int pageSize)
        {
            var bookList = await _context.Books.ToListAsync();

            return bookList.Count / pageSize;
        }

        [HttpGet("IsPageLastPage/{page},{pageSize}")]
        public async Task<ActionResult<bool>> IsPageLastPage(int page, int pageSize)
        {
            var books = await _context.Books.ToListAsync();
            var toReturnBool = false;

            if (books.Count / pageSize <= page)
            {
                toReturnBool = true;
            }

            return toReturnBool;
        }

        [HttpPut("{isbn}")]
        public async Task<IActionResult> UpdateBook(int isbn, Book book)
        {
            if (isbn != book.Isbn)
            {
                return BadRequest();
            }

            _context.Entry(book.Adapt<Book>()).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(isbn))
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
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _unitOfWork.Add(book);
            await _unitOfWork.BeginTransactionAsync();

            return CreatedAtAction("GetBook", new { isbn = book.Isbn }, book);
        }

        [HttpDelete("{isbn}")]
        public async Task<IActionResult> DeleteBook(int isbn)
        {
            var book = await _unitOfWork.Books.GetByIdAsync(isbn);
            if (book == null)
            {
                return NotFound();
            }

            _unitOfWork.Remove(book);
            await _unitOfWork.BeginTransactionAsync();

            return NoContent();
        }

        private bool BookExists(int isbn)
        {
            return _context.Books.Any(b => b.Isbn == isbn);
        }
        private async Task<Book> GetMissingBookInfo(Book book)
        {
            var interprets = await _context.Interprets.Select(i => new Interpret
            {
                Id = i.Id,
                FirstName = i.FirstName,
                Name = i.Name
            }).ToListAsync();

            var newBook = book.Adapt<Book>();
            var foundInterpret = false;

            foreach (var interpret in interprets)
            {
                if (interpret.FullName == newBook.InterpretFullName)
                {
                    newBook.InterpretId = interpret.Id;
                    foundInterpret = true;
                    break;
                }
            }

            if (!foundInterpret)
            {
                var interpretName = newBook.InterpretFullName.Split(" ") ?? throw new Exception("Interpret name could not be splitted");
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

                newBook.InterpretId = newInterpret.Id;
            }

            return newBook;
        }
    }
}
