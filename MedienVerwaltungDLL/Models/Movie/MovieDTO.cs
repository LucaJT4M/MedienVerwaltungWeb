using EntityFrameworkCore.Projectables;

namespace MedienVerwaltungDLL.Models.Movie
{
    public class MovieDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int Length { get; set; }
        public int ReleaseYear { get; set; }
        public string? Description { get; set; }
        public string? Genre { get; set; }
        public List<int> ActorIDs { get; set; } = [];
        public string? Location { get; set; }
        [Projectable]
        public string ActorCountDisplay => "Schauspieler: " + ActorIDs.Count;
    }
}