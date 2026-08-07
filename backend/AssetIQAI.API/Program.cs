using AssetIQAI.API.Extensions;
using AssetIQAI.API.Services;
using AssetIQAI.API.Validators.File;
using AssetIQAI.API.Validators.Reports;
using AssetIQAI.API.Validators.Stock;
using AssetIQAI.Infrastructure;
using AssetIQAI.Infrastructure.Data;
using AssetIQAI.Infrastructure.DTOs.File;
using AssetIQAI.Infrastructure.DTOs.Reports;
using AssetIQAI.Infrastructure.DTOs.Stock;
using AssetIQAI.Infrastructure.Mapping;
using AssetIQAI.Infrastructure.Mappings;
using AssetIQAI.Infrastructure.Services.Implementations;
using AssetIQAI.Infrastructure.Services.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog();


builder.Services.AddControllers();

builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddValidationServices();

builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddSwaggerDocumentation();

builder.Services.AddCorsPolicy(builder.Configuration);

builder.Services.AddApplicationHealthChecks(builder.Configuration);

builder.Services.AddApiVersioningConfiguration();

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IValidator<StockInRequest>, CreateStockInValidator>();

builder.Services.AddScoped<IValidator<StockOutRequest>, CreateStockOutValidator>();

builder.Services.AddScoped<IValidator<StockAdjustmentRequest>, StockAdjustmentValidator>();

builder.Services.AddScoped<IValidator<ReportFilterRequest>, ReportFilterValidator>();

builder.Services.AddScoped<IValidator<FileUploadRequest>, FileUploadValidator>();

builder.Services.AddValidationServices();

builder.Services.AddHttpClient<IFileService, FileService>();

ProductMapping.Register();
CategoryMapping.Register();
SupplierMapping.Register();
StockMapping.Register();


var app = builder.Build();

if (app.Environment.IsProduction())
{
    var config = app.Services.GetRequiredService<IConfiguration>();

    var emailEnabled = config["Email:Enabled"];
    var emailHost = config["Email:Host"];
    var emailPort = config["Email:Port"];
    var emailUsername = config["Email:Username"];
    var emailPassword = config["Email:Password"];
    var emailFrom = config["Email:FromEmail"];

    Console.Error.WriteLine(
        "[DIAG] Email::Enabled='" + emailEnabled + "' Host='" + emailHost +
        "' Port='" + emailPort + "' Username='" + emailUsername +
        "' PasswordSet='" + !string.IsNullOrWhiteSpace(emailPassword) +
        "' From='" + emailFrom + "'");

    if (string.IsNullOrWhiteSpace(config.GetConnectionString("DefaultConnection")))
    {
        throw new InvalidOperationException(
            "ConnectionStrings__DefaultConnection is not configured.");
    }

    var jwtSecret = config["Jwt:Secret"];

    if (string.IsNullOrWhiteSpace(jwtSecret) || jwtSecret.Length < 32)
    {
        throw new InvalidOperationException(
            "Jwt__Secret is not configured (minimum 32 characters).");
    }
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<ApplicationDbContext>();

    await DbSeeder.SeedAsync(context);
}


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

app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapApplicationHealthChecks();

app.Run();