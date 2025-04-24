using MedienVerwaltungDLL.Models.Interpret;

namespace MedienVerwaltungDBDLL.Repos
{
    public class InterpretRepository(MedienVerwaltungContext context) : IInterpretRepository
    {
        private readonly MedienVerwaltungContext _context = context;

        public async Task<Interpret?> GetByIdAsync(int ID)
        {
            return await _context.Interprets.FindAsync(ID);
        }
        public async Task AddAsync(Interpret interpret)
        {
            await _context.Interprets.AddAsync(interpret);
        }

        public void Update(Interpret interpret)
        {
            _context.Interprets.Update(interpret);
        }

        public void Remove(Interpret interpret)
        {
            _context.Interprets.Remove(interpret);
        }
    }
}