using System.ComponentModel.DataAnnotations;

namespace GuessingGameApi.Dtos;

public class GuessRequest
{
    [Required]
    public string? UserName { get; set; }

    [Required]
    public int? GameId { get; set; }

    [Required]
    public int? GuessNumber { get; set; }
}