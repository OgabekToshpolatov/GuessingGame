namespace GuessingGameApi.Dtos;

public class UserRating
{
    public long Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public int TotalWins { get; set; }
    public int TotalGames { get; set; }
    public int TotalTries { get; set; }
    public double SuccessRate { get; set; }
}