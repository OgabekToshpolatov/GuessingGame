using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GuessingGameApi.Entities;

public class User
{
    [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string? UserName { get; set; }
    public virtual List<Game>? Games { get; set; }
}