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
    


}