using MedienVerwaltungDLL.Models.Actor;

namespace MedienVerwaltungDBDLL.Repos
{
    public interface IActorRepository
    {
        Task<Actor?> GetByIdAsync(int ID);
        Task AddAsync(Actor searchActorsResult);
        void Update(Actor searchActorsResult);
        void Remove(Actor searchActorsResult);
    }
}