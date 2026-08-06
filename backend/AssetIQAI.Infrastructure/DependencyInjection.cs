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

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection")));


        services.AddHttpContextAccessor();


        services.AddScoped<ICurrentUserService, CurrentUserService>();


        RegisterServices(services);


        RegisterRepositories(services);

        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        services.AddScoped<IUserRepository, UserRepository>();

        services.AddScoped<ICategoryRepository, CategoryRepository>();

        services.AddScoped<ISupplierRepository, SupplierRepository>();

        services.AddScoped<IProductRepository, ProductRepository>();

        services.AddScoped<IStockRepository, StockRepository>();

        services.AddScoped<IDashboardRepository, DashboardRepository>();


        services.AddScoped<IPasswordHasher, PasswordHasher>();

        services.AddScoped<IJwtTokenService, JwtTokenService>();

        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

        services.AddScoped<IPasswordResetTokenRepository, PasswordResetTokenRepository>();

        services.AddScoped<IEmailService, EmailService>();

        services.AddScoped<ICategoryService, CategoryService>();

        services.AddScoped<ISupplierService, SupplierService>();

        services.AddScoped<IProductService, ProductService>();

        services.AddScoped<IStockService, StockService>();

        services.AddScoped<IDashboardService, DashboardService>();

        services.AddScoped<IReportService, ReportService>();


        return services;

    }

    private static void RegisterServices(IServiceCollection services)
    {

    }

    private static void RegisterRepositories(IServiceCollection services)
    {

    }


}