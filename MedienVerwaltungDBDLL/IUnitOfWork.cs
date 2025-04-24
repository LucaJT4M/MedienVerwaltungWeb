using MedienVerwaltungDBDLL.Repos;

namespace MedienVerwaltungDBDLL
{
    public interface IUnitOfWork : IDisposable
    {
        ISongRepository Songs { get; }
        IBookRepository Books { get; }
        IMovieRepository Movies { get; }
        IMusicAlbumRepository MusicAlbums { get; }
        IInterpretRepository Interprets { get; }
        IItemRepository Items { get; }
        IActorRepository Actors { get; }
        Task<int> SaveChangesAsync();
        Task BeginTransactionAsync();
        void Add<T>(T entity) where T : class;
        void Remove<T>(T entity) where T : class;
    }
}
