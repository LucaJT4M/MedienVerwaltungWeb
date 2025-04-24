using MedienVerwaltungDLL.Models.Song;

namespace MedienVerwaltungDBDLL.Repos
{
    public interface ISongRepository
    {
        Task<Song?> GetByIdAsync(int ID);
        Task AddAsync(Song song);
        void Update(Song song);
        void Remove(Song song);
    }
}