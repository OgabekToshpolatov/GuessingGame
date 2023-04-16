using System.ComponentModel.DataAnnotations;

namespace GuessingGameApi.Dtos;

public class UserDto
{
    [Required]
    public string? UserName { get; set; }
}