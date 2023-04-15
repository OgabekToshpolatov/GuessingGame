using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GuessingGameApi.Entities;

public class Game
{
    [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public ushort SecretNumber { get; set; }
    public ushort NumberOfTries { get; set; }
    public ushort MaximumTries { get; set; }
    public bool IsFinish { get; set; }
    public bool IsWinner { get; set; }
    public long UserId { get; set; }
    [ForeignKey("UserId")]
    public virtual User? User { get; set; }


}