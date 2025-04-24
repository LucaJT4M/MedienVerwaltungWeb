namespace MedienVerwaltungDLL.Models
{
    public class Media : MediaTitle
    {
        public string Location { get; set; } = string.Empty;
        public int InterpretId { get; set; }
        public string InterpretFullName { get; set; } = string.Empty;
    }
}