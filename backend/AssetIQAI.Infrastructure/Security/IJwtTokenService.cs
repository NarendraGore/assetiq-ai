using System.Security.Claims;
using AssetIQAI.Domain.Entities;

namespace AssetIQAI.Infrastructure.Security;

public interface IJwtTokenService
{
    string GenerateAccessToken(User user);

    string GenerateRefreshToken();

    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}