namespace MedienVerwaltungDLL.Models.Book
{
    public class Book : Media
    {
        public int Isbn { get; set; }
        public string Description { get; set; } = string.Empty;
        public int PageCount { get; set; }
        public int ReleaseYear { get; set; }
    }
}