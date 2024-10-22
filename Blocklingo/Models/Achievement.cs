namespace Blocklingo.Models
{
    public class Achievement
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public string Image { get; set; } = ""; 
        public int? Points { get; set; }
        public DateTime? EarnedAt { get; set; }     
    }
}

