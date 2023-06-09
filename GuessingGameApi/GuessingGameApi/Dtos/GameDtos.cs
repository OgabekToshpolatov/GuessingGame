namespace GuessingGameApi.Dtos;

public class GameDtos
{
    public long Id { get; set; }
    public int SecretNumber { get; set; }
    public int NumberOfTries { get; set; }
    public int MaximumTries { get; set; }
    public bool IsFinish { get; set; }
    public bool IsWinner { get; set; }
    public long UserId { get; set; }
    public List<GameTriesDto>? GameTries { get; set; }
}