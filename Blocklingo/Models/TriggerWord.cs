using System.ComponentModel.DataAnnotations;

namespace Blocklingo.Models
{
    public class TriggerWord
    {
        public int Id { get; set; }
        public string Word { get; set; }
        public int TriggerGroupId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}