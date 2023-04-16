
namespace GuessingGameApi.Dtos;

public class GuessResponse
{
    public string Message { get; set; } = string.Empty;
    public bool IsFinish { get; set; }
    public bool IsWinner { get; set; }
    public int SecretNumber { get; set; }
    public int NumberOfTriesRest { get; set; }
}