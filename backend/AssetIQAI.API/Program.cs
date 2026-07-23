using AssetIQAI.API.Extensions;
using AssetIQAI.Infrastructure;
using AssetIQAI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog();

// Register Services
builder.Services.AddControllers();

builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddValidationServices();

builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddSwaggerDocumentation();

builder.Services.AddCorsPolicy(builder.Configuration);

builder.Services.AddApplicationHealthChecks(builder.Configuration);

builder.Services.AddApiVersioningConfiguration();

// Build Application
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<ApplicationDbContext>();

    await DbSeeder.SeedAsync(context);
}

// Configure HTTP Request Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI(options =>
    {
        options.DocumentTitle = "AssetIQ AI API";
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "AssetIQ AI API v1");
    });
}

app.UseGlobalExceptionMiddleware();

app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapApplicationHealthChecks();

app.Run();