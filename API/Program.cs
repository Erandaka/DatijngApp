using System.Text;
using System.Text.Json.Serialization;
using API;
using API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// builder.Services.AddControllers().AddJsonOptions(x =>
//                 x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

//Swagger Removed
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
//Swagger Removed

builder.Services.AddApplicationServices(builder.Configuration);
// builder.Services.AddDbContext<DataContext>(options =>
// {
//     options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
// });

// builder.Services.AddCors();

// builder.Services.AddScoped<ITokenService, TokenService>();

// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
// .AddJwtBearer(options=>
// {
//     options.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuerSigningKey=true,
//         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
//         ValidateIssuer = false,
//         ValidateAudience = false
//     };
// });

builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

if (app.Environment.IsDevelopment())
{
    //Swagger Removed
    // app.UseSwagger();
    // app.UseSwaggerUI();
    //Swagger Removed
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// using var scope = app.Services.CreateScope();
// var services = scope.ServiceProvider;

// try
// {
//     var context = services.GetRequiredService<DataContext>();
//     await context.Database.MigrateAsync();
//     await Seed.SeedUsers(context);
// }
// catch (Exception ex)
// {
//     var logger = services.GetService<ILogger<Program>>();
//     logger.LogError(ex, "Error occured");
// }

app.Run();
