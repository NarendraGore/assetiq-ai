using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

namespace AssetIQAI.API.Extensions;

public static class HealthCheckEndpointExtensions
{
    public static IEndpointRouteBuilder MapApplicationHealthChecks(
        this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapHealthChecks("/health", new HealthCheckOptions
        {
            ResponseWriter = async (context, report) =>
            {
                var response = new
                {
                    Status = report.Status.ToString(),
                    Timestamp = DateTime.UtcNow,
                    Checks = report.Entries.Select(entry => new
                    {
                        Name = entry.Key,
                        Status = entry.Value.Status.ToString(),
                        Duration = entry.Value.Duration.TotalMilliseconds
                    })
                };

                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync(
                    JsonSerializer.Serialize(response));
            }
        });

        return endpoints;
    }
}