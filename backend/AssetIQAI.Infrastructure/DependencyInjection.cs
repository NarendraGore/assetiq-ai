using AssetIQAI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AssetIQAI.Infrastructure.Repositories.Implementations;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using AssetIQAI.Infrastructure.Security;
using AssetIQAI.Infrastructure.Services.Interfaces;
using AssetIQAI.Infrastructure.Services.Implementations;

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

        services.AddScoped<IProductRepository, ProductRepository>();

        // Password Hasher
        services.AddScoped<IPasswordHasher, PasswordHasher>();

        services.AddScoped<IJwtTokenService, JwtTokenService>();

        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

        services.AddScoped<ICategoryService, CategoryService>();

        services.AddScoped<ISupplierService, SupplierService>();

        services.AddScoped<IProductService, ProductService>();

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