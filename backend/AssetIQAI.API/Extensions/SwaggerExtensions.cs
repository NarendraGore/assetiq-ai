
//using System.Reflection;
//using Microsoft.OpenApi;

//namespace AssetIQAI.API.Extensions;

//public static class SwaggerExtensions
//{
//    public static IServiceCollection AddSwaggerDocumentation(
//        this IServiceCollection services)
//    {
//        services.AddEndpointsApiExplorer();

//        services.AddSwaggerGen(options =>
//        {
//            options.SwaggerDoc("v1", new OpenApiInfo
//            {
//                Title = "AssetIQ AI API",
//                Version = "v1",
//                Description = "REST API for AssetIQ AI Inventory & Asset Management System",
//                Contact = new OpenApiContact
//                {
//                    Name = "Narendra Gore"
//                }
//            });

//            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
//            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

//            if (File.Exists(xmlPath))
//            {
//                options.IncludeXmlComments(xmlPath);
//            }
//        });

//        return services;
//    }
//} 





using System.Reflection;
using Microsoft.OpenApi.Models;
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

            // XML Comments
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

            if (File.Exists(xmlPath))
            {
                options.IncludeXmlComments(xmlPath);
            }

            // JWT Authentication
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "Enter only the JWT token. Example: eyJhbGciOiJIUzI1NiIs..."
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Id = "Bearer",
                            Type = ReferenceType.SecurityScheme
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        return services;
    }
}