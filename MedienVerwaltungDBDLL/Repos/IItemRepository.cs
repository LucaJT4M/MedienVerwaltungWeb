using MedienVerwaltungDLL.Models.Item;

namespace MedienVerwaltungDBDLL.Repos
{
    public interface IItemRepository
    {
        Task<Item?> GetByIdAsync(int ID);
        Task AddAsync(Item searchResult);
        void Update(Item searchResult);
        void Remove(Item searchResult);
    }
}