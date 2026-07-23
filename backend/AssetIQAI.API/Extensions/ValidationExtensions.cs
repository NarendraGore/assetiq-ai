using FluentValidation;
using FluentValidation.AspNetCore;
using System.Reflection;

namespace AssetIQAI.API.Extensions;

public static class ValidationExtensions
{
    public static IServiceCollection AddValidationServices(
        this IServiceCollection services)
    {
        services.AddFluentValidationAutoValidation();

        services.AddValidatorsFromAssembly(
            Assembly.GetExecutingAssembly());

        return services;
    }
}