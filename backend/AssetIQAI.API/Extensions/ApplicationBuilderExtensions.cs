using AssetIQAI.API.Middlewares;

namespace AssetIQAI.API.Extensions;

public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder UseGlobalExceptionMiddleware(
        this IApplicationBuilder app)
    {
        return app.UseMiddleware<API.Middlewares.ExceptionMiddleware>();
    }
}