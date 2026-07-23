using AssetIQAI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AssetIQAI.Infrastructure.Repositories.Implementations;
using AssetIQAI.Infrastructure.Repositories.Interfaces;

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

        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        services.AddScoped<IUserRepository, UserRepository>();

        services.AddScoped<ICategoryRepository, CategoryRepository>();

        services.AddScoped<ISupplierRepository, SupplierRepository>();

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