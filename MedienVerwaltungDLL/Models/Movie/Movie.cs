namespace MedienVerwaltungDLL.Models.Movie
{
    public class Movie : MediaTitle
    {
        public int Id { get; set; }
        public int Length { get; set; }
        public int ReleaseYear { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public List<int> ActorIDs { get; set; } = [];
        public string Location { get; set; } = string.Empty;
    }
}