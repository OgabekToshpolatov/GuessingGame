using Microsoft.AspNetCore.Mvc;

namespace GuessingGameApi.Controllers;

public class GameController:ControllerBase
{
    private readonly ILogger<GameController> _logger;

    public GameController(ILogger<GameController> logger)
    {
        _logger = logger ;
    }
}