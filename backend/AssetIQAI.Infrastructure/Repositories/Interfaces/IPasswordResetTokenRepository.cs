using AssetIQAI.Domain.Entities;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface IPasswordResetTokenRepository : IGenericRepository<PasswordResetToken>
{
    Task<PasswordResetToken?> GetByTokenHashAsync(string tokenHash);

    Task InvalidateActiveTokensForUserAsync(Guid userId);
}
