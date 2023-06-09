using GuessingGameApi.Data;
using GuessingGameApi.Dtos;
using GuessingGameApi.Entities;
using GuessingGameApi.Exceptions;
using GuessingGameApi.Helpers;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace GuessingGameApi.Services;

public class GameService : IGameService
{
    private readonly AppDbContext _context;
    private readonly ILogger<AppDbContext> _logger;
    private readonly IUserService _userService;

    public GameService(AppDbContext context, ILogger<AppDbContext> logger, IUserService userService)
    {
        _context = context ;
        _logger = logger ;
        _userService = userService ;
    }
    public async  ValueTask<GameDto> CreateGameAsync(string userName)
    {
        var userId =await _userService.GetUserIdAsync(userName);
        var secretNumber = Calculation.GenerateSecretNumber();

        var newGame = new Game
        {
            SecretNumber = secretNumber,
            NumberOfTries = 0,
            MaximumTries = 8,
            IsFinish = false,
            IsWinner = false,
            UserId = userId,
        };

        await _context.Games!.AddAsync(newGame);
        await _context.SaveChangesAsync();

        var newGameDto = newGame.Adapt<GameDto>();

        return newGameDto;
    }

    public async ValueTask<GameDtos> GetGameByIdAsync(long gameId)
    {
        var game = await _context.Games!.FindAsync(gameId);
        
        
        if(game == null)
                throw new BadRequestException("Game does not exists!");

        var gameTriesList =await  _context.GameTries!.Where(gameTries => gameTries.GameId == gameId).ToListAsync();

        var gameTriesListDto = gameTriesList.Select(gameTries => gameTries.Adapt<Dtos.GameTriesDto>()).ToList();
        
        var gameDto = new GameDtos
        {
            Id = game.Id,
            SecretNumber = game.SecretNumber,
            NumberOfTries = game.NumberOfTries,
            MaximumTries = game.MaximumTries,
            IsFinish = game.IsFinish,
            IsWinner = game.IsWinner,
            UserId = game.UserId,
            GameTries = gameTriesListDto
        };


        return gameDto;
    }

    private GameTriesDto ConvertToGameTriesModel(GameTries gameTries)
    {
        if(gameTries == null) return null!;

        return new GameTriesDto
        {
            GuessNumber = gameTries.GuessNumber,
            Message = gameTries.Message
        };
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

    public async ValueTask<List<UserRating>> GetUserRatingAsync()
    {
         var users = await _context.Users!.ToListAsync();
        var usersRating = new List<UserRating>();

        foreach (var user in users)
        {
            var totalWins = 0;
            var totalGames = 0;
            var totalTries = 0;

            foreach (var userGame in user.Games!)
            {
                if(userGame.IsWinner)
                    totalWins++;

                totalGames++;
                totalTries = userGame.NumberOfTries > 8 ? totalTries + 8 : totalTries + userGame.NumberOfTries;
            }

            usersRating.Add(new UserRating
            {
                Id = 0,
                UserName = user.UserName!,
                TotalWins = totalWins,
                TotalGames = totalGames,
                TotalTries = totalTries,
                SuccessRate = totalGames == 0 ? 0 : Math.Round((double)totalWins / totalGames * 100, 1)
            });
        }

        var id = 1;
        var sortedUsersStats = usersRating
            .OrderByDescending(userStats => userStats.SuccessRate)
            .ThenBy(userStats => userStats.TotalTries)
            .ToList();

        foreach (var sortedUsersStat in sortedUsersStats)
        {
            sortedUsersStat.Id = id++;
        }

        return sortedUsersStats;
    }

    public async ValueTask<GuessResponse> GuessNumberAsync(GuessRequest guessRequest)
    {
        var game = await _context.Games!.FirstOrDefaultAsync(game => game.Id == guessRequest.GameId);
        var userId = await _userService.GetUserIdAsync(guessRequest.UserName!);

        if(game is null)
                throw new BadRequestException("Game is not exists!");
        
        if(userId != game.UserId)
                 throw new BadRequestException("This is not your game!");
        
        if(game.IsFinish || game.NumberOfTries > game.MaximumTries)
                 throw new BadRequestException("You cannot try anymore!");

        game.NumberOfTries++;
        
        if(game.SecretNumber == guessRequest.GuessNumber)
        {
            game.IsFinish = true;
            game.IsWinner = true;
        }

        if(game.NumberOfTries >= game.MaximumTries)
            game.IsFinish = true;

         await _context.SaveChangesAsync();

        var message = Calculation.CheckGuessNumber(game.SecretNumber, guessRequest.GuessNumber!.Value);

        var gameTries = new GameTries
        {
          GuessNumber = (int)guessRequest.GuessNumber,
          Message = message,
          GameId = game.Id
        };

        await _context.GameTries!.AddAsync(gameTries);
        await _context.SaveChangesAsync();

        var guessResponse = new GuessResponse
        {
           Message = message,
           IsFinish = game.IsFinish,
           IsWinner = game.IsWinner,
           SecretNumber = game.SecretNumber,
           NumberOfTriesRest = game.MaximumTries - game.NumberOfTries
        };

        return guessResponse;
    }
}