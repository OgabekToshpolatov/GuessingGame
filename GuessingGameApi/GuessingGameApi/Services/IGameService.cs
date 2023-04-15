using GuessingGameApi.Dtos;

namespace GuessingGameApi.Services;

public interface IGameService
{
    ValueTask<List<GameDto>> GetGamesAsync();
    ValueTask<GameDto> GetGameByIdAsync(int gameId);
    ValueTask<GameDto> CreateGameAsync(string userName);
}