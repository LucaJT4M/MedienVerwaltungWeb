using EntityFrameworkCore.Projectables;

namespace MedienVerwaltungDLL.Models.Interpret
{
    public class InterpretDTO : FirstNameModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string BirthDate { get; set; } = string.Empty;
        [Projectable]
        public string FullName => $"{FirstName} {Name}";
    }
}