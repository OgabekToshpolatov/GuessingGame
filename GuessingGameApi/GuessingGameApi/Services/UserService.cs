using GuessingGameApi.Data;

namespace GuessingGameApi.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly ILogger<UserService> _logger;

    public UserService(AppDbContext context, ILogger<UserService> logger)
    {
        _context = context ;
        _logger = logger ;
    }

    public ValueTask<long> GetUserIdAsync(string userName)
    {
        throw new NotImplementedException();
    }
}