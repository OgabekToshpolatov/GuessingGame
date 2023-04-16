using GuessingGameApi.Dtos;
using GuessingGameApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GuessingGameApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController:ControllerBase
{
    private readonly ILogger<GamesController> _logger;
    private readonly IGameService _gameService;

    public GamesController(ILogger<GamesController> logger,IGameService gameService)
    {
        _logger = logger ;
        _gameService = gameService ;
    }

    [HttpGet]
    public async Task<IActionResult> GetGames() =>
            Ok(await _gameService.GetGamesAsync());

    [HttpPost("new-game")]
    public async Task<IActionResult> CreateGame([FromBody] UserDto userDto)
    {
        if(!ModelState.IsValid)
                   return BadRequest(new {Message = "ModelState Is valid"});
        var game =await _gameService.CreateGameAsync(userDto.UserName!);

        return Ok(game);
    }

    [HttpGet("{gameId}")]
    public async Task<IActionResult> GetGameById(long gameId)
        => Ok(await _gameService.GetGameByIdAsync(gameId));
    
    [HttpPost("guess-number")]
    public async Task<IActionResult> GuessNumber([FromBody] GuessRequest guessRequest)
    {
        if (!ModelState.IsValid)
              return BadRequest(ModelState);

        var guessResponse = await _gameService.GuessNumberAsync(guessRequest);

        return Ok(guessResponse);
    }


}