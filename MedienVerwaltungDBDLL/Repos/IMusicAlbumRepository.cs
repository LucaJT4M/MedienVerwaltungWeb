using MedienVerwaltungDLL.Models.MusicAlbum;

namespace MedienVerwaltungDBDLL.Repos
{
    public interface IMusicAlbumRepository
    {
        Task<MusicAlbum?> GetByIdAsync(int ID);
        Task AddAsync(MusicAlbum musicAlbum);
        void Update(MusicAlbum musicAlbum);
        void Remove(MusicAlbum musicAlbum);
    }
}