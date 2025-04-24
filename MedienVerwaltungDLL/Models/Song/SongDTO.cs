namespace MedienVerwaltungDLL.Models.Song
{
    public class SongDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? InterpretFullName { get; set; }
        public string Location { get; set; } = string.Empty;
        public int Length { get; set; }
    }
}