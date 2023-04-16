using GuessingGameApi.Data;
using GuessingGameApi.Entities;
using Microsoft.EntityFrameworkCore;

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

    public async ValueTask<long> GetUserIdAsync(string userName)
    {
        var user =await _context.Users!.FirstOrDefaultAsync(user => user.UserName == userName);
        
        if(user != null) return user.Id ;

        var newUser = new User
        {
            UserName = userName,
            Games = new List<Game>()
        };

        await _context.Users!.AddAsync(newUser);
        await _context.SaveChangesAsync();

        return newUser.Id;
    }
}