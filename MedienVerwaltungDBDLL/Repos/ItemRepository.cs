using MedienVerwaltungDLL.Models.Item;

namespace MedienVerwaltungDBDLL.Repos
{
    public class ItemRepository(MedienVerwaltungContext context) : IItemRepository
    {
        private readonly MedienVerwaltungContext _context = context;

        public async Task<Item?> GetByIdAsync(int ID)
        {
            return await _context.Items.FindAsync(ID);
        }
        public async Task AddAsync(Item item)
        {
            await _context.Items.AddAsync(item);
        }

        public void Update(Item item)
        {
            _context.Items.Update(item);
        }

        public void Remove(Item item)
        {
            _context.Items.Remove(item);
        }
    }
}