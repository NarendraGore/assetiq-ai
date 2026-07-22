using AssetIQAI.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AssetIQAI.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Database
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection")));

        // Services
        RegisterServices(services);

        // Repositories
        RegisterRepositories(services);

        return services;
    }

    private static void RegisterServices(IServiceCollection services)
    {
        // Register services here
    }

    private static void RegisterRepositories(IServiceCollection services)
    {
        // Register repositories here
    }
}