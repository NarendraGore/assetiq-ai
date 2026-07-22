
using System.Reflection;
using Microsoft.OpenApi;

namespace AssetIQAI.API.Extensions;

public static class SwaggerExtensions
{
    public static IServiceCollection AddSwaggerDocumentation(
        this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "AssetIQ AI API",
                Version = "v1",
                Description = "REST API for AssetIQ AI Inventory & Asset Management System",
                Contact = new OpenApiContact
                {
                    Name = "Narendra Gore"
                }
            });

            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

            if (File.Exists(xmlPath))
            {
                options.IncludeXmlComments(xmlPath);
            }
        });

        return services;
    }
} 


