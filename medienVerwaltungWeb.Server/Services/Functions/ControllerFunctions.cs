using MedienVerwaltungDLL.Models;

namespace medienVerwaltungWeb.Server.Services.Functions
{
    public class ControllerFunctions
    {
        public List<T> Pagination<T>(List<T> toSortList, int pageSize, int page) where T : class
        {
            return [.. toSortList.Skip((page - 1) * pageSize).Take(pageSize)];
        }
        public List<T> SearchByTitle<T>(List<T> itemList, string searchTerm, int maxResults) where T : MediaTitle
        {
            return SearchAndSortItems(itemList, searchTerm, maxResults);
        }
        public List<T> SearchByFirstName<T>(List<T> itemList, string searchFirstName, int maxResults) where T : FirstNameModel
        {
            return SearchAndSortFirstNames(itemList, searchFirstName, maxResults);
        }
        private List<T> SearchAndSortFirstNames<T>(List<T> itemList, string searchFirstName, int maxResults) where T : FirstNameModel
        {
            return [..itemList
                .Where(s => s.FirstName.Contains(searchFirstName, StringComparison.OrdinalIgnoreCase))
                .OrderBy(s => LevenshteinDistance(s.FirstName, searchFirstName))
                .Take(maxResults)];
        }
        private List<T> SearchAndSortItems<T>(List<T> itemList, string searchTerm, int maxResults) where T : MediaTitle
        {
            return [..itemList
                .Where(s => s.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
                .OrderBy(s => LevenshteinDistance(s.Title, searchTerm))
                .Take(maxResults)];
        }
        private int LevenshteinDistance(string s1, string s2)
        {
            int[,] matrix = new int[s1.Length + 1, s2.Length + 1];

            for (int i = 0; i <= s1.Length; i++) matrix[i, 0] = i;
            for (int j = 0; j <= s2.Length; j++) matrix[0, j] = j;

            for (int i = 1; i <= s1.Length; i++)
            {
                for (int j = 1; j <= s2.Length; j++)
                {
                    int kosten = (s1[i - 1] == s2[j - 1]) ? 0 : 1;
                    matrix[i, j] = Math.Min(
                        Math.Min(matrix[i - 1, j] + 1, matrix[i, j - 1] + 1),
                        matrix[i - 1, j - 1] + kosten
                    );
                }
            }
            return matrix[s1.Length, s2.Length];
        }
    }
}