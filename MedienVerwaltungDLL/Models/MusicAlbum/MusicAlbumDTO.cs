namespace MedienVerwaltungDLL.Models.MusicAlbum
{
    public class MusicAlbumDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public List<int> SongIdList { get; set; } = [];
        public string? InterpretFullName { get; set; }
        public string? Location { get; set; }
    }
}