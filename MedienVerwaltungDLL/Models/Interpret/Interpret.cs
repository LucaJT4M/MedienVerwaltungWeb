using EntityFrameworkCore.Projectables;

namespace MedienVerwaltungDLL.Models.Interpret
{
    public class Interpret : FirstNameModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
        [Projectable]
        public string FullName => $"{FirstName} {Name}";
    }
}