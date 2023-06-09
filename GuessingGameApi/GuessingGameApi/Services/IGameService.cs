using GuessingGameApi.Dtos;

namespace GuessingGameApi.Services;

public interface IGameService
{
    ValueTask<List<GameDto>> GetGamesAsync();
    ValueTask<GameDtos> GetGameByIdAsync(long gameId);
    ValueTask<GameDto> CreateGameAsync(string userName);
    ValueTask<GuessResponse> GuessNumberAsync(GuessRequest guessRequest);
    ValueTask<List<UserRating>> GetUserRatingAsync();

    
}