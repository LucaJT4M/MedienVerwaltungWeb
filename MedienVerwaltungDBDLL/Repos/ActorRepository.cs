using MedienVerwaltungDLL.Models.Actor;

namespace MedienVerwaltungDBDLL.Repos
{
    public class ActorRepository(MedienVerwaltungContext context) : IActorRepository
    {
        private readonly MedienVerwaltungContext _context = context;

        public async Task<Actor?> GetByIdAsync(int ID)
        {
            return await _context.Actors.FindAsync(ID);
        }
        public async Task AddAsync(Actor actor)
        {
            await _context.Actors.AddAsync(actor);
        }

        public void Update(Actor actor)
        {
            _context.Actors.Update(actor);
        }

        public void Remove(Actor actor)
        {
            _context.Actors.Remove(actor);
        }
    }
}