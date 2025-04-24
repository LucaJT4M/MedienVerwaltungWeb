namespace MedienVerwaltungDLL.Models.Item
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public MediaType MediaType { get; set; }
        public string Location { get; set; } = string.Empty;
        public int MediaId { get; set; }
    }
}