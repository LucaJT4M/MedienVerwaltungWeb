using MedienVerwaltungDLL.Models.Book;

namespace MedienVerwaltungDBDLL.Repos
{
    public interface IBookRepository
    {
        Task<Book?> GetByIdAsync(int ID);
        Task AddAsync(Book book);
        void Update(Book book);
        void Remove(Book book);
    }
}