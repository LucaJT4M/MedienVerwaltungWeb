using EntityFrameworkCore.Projectables;

namespace MedienVerwaltungDLL.Models.Actor
{
    public class Actor : FirstNameModel
    {
        public int Id { get; set; }
        public string LastName { get; set; } = string.Empty;
        public List<int> MovieIds { get; set; } = [];
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; } = string.Empty;
        [Projectable]
        public string FullName => $"{FirstName} {LastName}";
    }
}