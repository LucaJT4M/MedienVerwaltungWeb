using MedienVerwaltungDLL.Models.Interpret;

namespace MedienVerwaltungDBDLL.Repos
{
    public interface IInterpretRepository
    {
        Task<Interpret?> GetByIdAsync(int ID);
        Task AddAsync(Interpret interpret);
        void Update(Interpret interpret);
        void Remove(Interpret interpret);
    }
}