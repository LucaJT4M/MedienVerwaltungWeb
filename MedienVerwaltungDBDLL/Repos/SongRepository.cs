using MedienVerwaltungDLL.Models.Song;
using Microsoft.EntityFrameworkCore;

namespace MedienVerwaltungDBDLL.Repos
{
    public class SongRepository(MedienVerwaltungContext context) : ISongRepository
    {
        private readonly MedienVerwaltungContext _context = context;

        public async Task<Song?> GetByIdAsync(int ID)
        {
            return await _context.Songs.FindAsync(ID);
        }
        public async Task AddAsync(Song song)
        {
            await _context.Songs.AddAsync(song);
        }

        public void Update(Song song)
        {
            if (_context.Entry(song).State == EntityState.Detached)
            {
                _context.Songs.Update(song);
            }
        }

        public void Remove(Song song)
        {
            _context.Songs.Remove(song);
        }
    }
}