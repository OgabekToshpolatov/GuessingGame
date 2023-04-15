namespace GuessingGameApi.Services;

public interface IUserService
{
    ValueTask<long> GetUserIdAsync(string userName);
}