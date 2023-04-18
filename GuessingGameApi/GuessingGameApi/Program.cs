using GuessingGameApi.Data;
using GuessingGameApi.Middlewares;
using GuessingGameApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
   options.AddPolicy("MyPolicy", builder =>{
          builder.AllowAnyOrigin()
                                  .AllowAnyMethod()
                                                  .AllowAnyHeader();
   });
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IGameService,GameService>();

builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseLazyLoadingProxies().UseSqlite("Data Source=game.db");
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors("MyPolicy");

app.MapControllers();

app.Run();
