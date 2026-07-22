using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace AssetIQAI.API.Extensions;

public static class HealthCheckExtensions
{
    public static IServiceCollection AddApplicationHealthChecks(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddHealthChecks()
            .AddNpgSql(
                configuration.GetConnectionString("DefaultConnection")!,
                name: "PostgreSQL",
                failureStatus: HealthStatus.Unhealthy,
                tags: new[] { "database" });

        return services;
    }
}