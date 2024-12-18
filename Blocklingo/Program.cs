using Blocklingo.Repositories;

namespace Blocklingo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();
            builder.Services.AddTransient<IUserProfileRepository, UserProfileRepository>(); 
            builder.Services.AddTransient<IPuzzleRepository, PuzzleRepository>();
            builder.Services.AddTransient<IPuzzleAttemptRepository, PuzzleAttemptRepository>(); 
            builder.Services.AddTransient<IUserAchievementRepository, UserAchievementRepository>();    
            builder.Services.AddTransient<ILeaderboardRepository, LeaderboardRepository>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });

            }


            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
