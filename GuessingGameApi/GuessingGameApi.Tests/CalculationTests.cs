namespace GuessingGameApi.Tests;

public class CalculationTests
{
    [Theory]
    [InlineData(7046, 8724, "M:2; P:0")]
    [InlineData(7046, 7640, "M:2; P:2")]
    [InlineData(7046, 7842, "M:0; P:2")]
    public void CheckNumberResultCorrect(int secretNumber, int guessNumber, string result)
    {
        var check = Helpers.Calculation.CheckGuessNumber(secretNumber,guessNumber);
        Assert.Equal(result,check);
    }
}