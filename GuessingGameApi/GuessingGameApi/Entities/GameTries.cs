using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GuessingGameApi.Entities;

public class GameTries
{
    [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public int GuessNumber { get; set; }
    public string? Message { get; set; }
    public long GameId { get; set; }
    [ForeignKey("GameId")]
    public virtual Game? User { get; set; }

}