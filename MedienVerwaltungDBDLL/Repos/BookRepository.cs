using MedienVerwaltungDLL.Models.Book;

namespace MedienVerwaltungDBDLL.Repos
{
    public class BookRepository(MedienVerwaltungContext context) : IBookRepository
    {
        private readonly MedienVerwaltungContext _context = context;

        public async Task<Book?> GetByIdAsync(int ID)
        {
            return await _context.Books.FindAsync(ID);
        }
        public async Task AddAsync(Book book)
        {
            await _context.Books.AddAsync(book);
        }

        public void Update(Book book)
        {
            _context.Books.Update(book);
        }

        public void Remove(Book book)
        {
            _context.Books.Remove(book);
        }
    }
}