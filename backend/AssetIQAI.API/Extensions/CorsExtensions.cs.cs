namespace AssetIQAI.API.Extensions;

public static class CorsExtensions
{
    public static IServiceCollection AddCorsPolicy(
    this IServiceCollection services,
    IConfiguration configuration)
    {


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
