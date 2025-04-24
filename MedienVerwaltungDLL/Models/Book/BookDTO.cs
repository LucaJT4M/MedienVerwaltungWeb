namespace MedienVerwaltungDLL.Models.Book
{
    public class BookDTO
    {
        public int Isbn { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? InterpretFullName { get; set; }
        public int PageCount { get; set; }
        public int ReleaseYear { get; set; }
        public string? Location { get; set; }
    }
}