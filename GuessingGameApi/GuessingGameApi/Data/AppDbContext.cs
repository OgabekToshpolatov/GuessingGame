using GuessingGameApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace GuessingGameApi.Data;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options) {}

    public DbSet<Game>? Games { get; set; }
    public DbSet<User>? Users { get; set; }
}