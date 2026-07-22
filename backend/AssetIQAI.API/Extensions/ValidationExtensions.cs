using FluentValidation;
using FluentValidation.AspNetCore;

namespace AssetIQAI.API.Extensions;

public static class ValidationExtensions
{
    public static IServiceCollection AddValidationServices(
        this IServiceCollection services)
    {
        services.AddFluentValidationAutoValidation();

        services.AddValidatorsFromAssemblyContaining<Program>();

        return services;
    }
}