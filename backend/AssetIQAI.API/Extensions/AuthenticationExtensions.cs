using System.Text;
using AssetIQAI.API.Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace AssetIQAI.API.Extensions;

public static class AuthenticationExtensions
{
    public static IServiceCollection AddJwtAuthentication(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var jwt = configuration
            .GetSection(JwtSettings.SectionName)
            .Get<JwtSettings>()!;

        services.Configure<JwtSettings>(
            configuration.GetSection(JwtSettings.SectionName));

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters =
                    new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = jwt.Issuer,
                        ValidAudience = jwt.Audience,

                        IssuerSigningKey =
                            new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(jwt.SecretKey)),

                        ClockSkew = TimeSpan.Zero
                    };
            });

        services.AddAuthorization();

        return services;
    }
}