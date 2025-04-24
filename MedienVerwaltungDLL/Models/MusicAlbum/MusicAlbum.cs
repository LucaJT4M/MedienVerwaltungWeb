namespace MedienVerwaltungDLL.Models.MusicAlbum
{
    public class MusicAlbum : Media
    {
        public int Id { get; set; }
        public List<int> SongIdList { get; set; } = [];
    }
}