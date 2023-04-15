using GuessingGameApi.Data;
using GuessingGameApi.Dtos;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace GuessingGameApi.Services;

public class GameService : IGameService
{
    private readonly AppDbContext _context;
    private readonly ILogger<AppDbContext> _logger;

    public GameService(AppDbContext context, ILogger<AppDbContext> logger)
    {
        _context = context ;
        _logger = logger ;
    }
    public ValueTask<GameDto> CreateGameAsync(string userName)
    {
        throw new NotImplementedException();
    }

    public ValueTask<GameDto> GetGameByIdAsync(int gameId)
    {
        throw new NotImplementedException();
    }

    public async ValueTask<List<GameDto>> GetGamesAsync()
    {
        try
        {
            var games = await _context.Games!.ToListAsync();
             
            List<GameDto> gamesDto = new List<GameDto>();

            if(games.Count == 0)
                    return gamesDto;
            
            return games.Select(game => game.Adapt<GameDto>()).ToList();

        }
        catch (System.Exception e)
        {
            throw new Exception(e.Message);
        }
    }
}