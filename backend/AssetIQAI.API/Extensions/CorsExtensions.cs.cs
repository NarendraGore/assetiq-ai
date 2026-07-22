namespace AssetIQAI.API.Extensions;

public static class CorsExtensions
{
    public static IServiceCollection AddCorsPolicy(
    this IServiceCollection services,
    IConfiguration configuration)
    {
        var origins = configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>() ?? [];

        services.AddCors(options =>
        {
            options.AddPolicy("FrontendPolicy", policy =>
            {
                policy.WithOrigins(origins)
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
            });
        });

        return services;
    }
}