namespace AssetIQAI.API.Extensions;

public static class CorsExtensions
{
    public static IServiceCollection AddCorsPolicy(
    this IServiceCollection services,
    IConfiguration configuration)
    {
        // Allow overriding the whole origin list from a single env var so the
        // production frontend domain works without editing appsettings.
        var origins = configuration["CORS_ORIGINS"]
            ?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            ?? configuration
                .GetSection("Cors:AllowedOrigins")
                .Get<string[]>()
            ?? [];

        services.AddCors(options =>
        {
            options.AddPolicy("FrontendPolicy", policy =>
            {
                policy.AllowAnyHeader()
                      .AllowAnyMethod();

                if (origins.Length == 0)
                {
                    policy.AllowAnyOrigin();
                }
                else
                {
                    policy.WithOrigins(origins)
                          .AllowCredentials();
                }
            });
        });

        return services;
    }
}
