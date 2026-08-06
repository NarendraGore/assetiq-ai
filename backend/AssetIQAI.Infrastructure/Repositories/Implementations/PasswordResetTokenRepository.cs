using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.Data;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AssetIQAI.Infrastructure.Repositories.Implementations;

public class PasswordResetTokenRepository
    : GenericRepository<PasswordResetToken>, IPasswordResetTokenRepository
{
    public PasswordResetTokenRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<PasswordResetToken?> GetByTokenHashAsync(string tokenHash)
    {
        return await _context.PasswordResetTokens
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.TokenHash == tokenHash);
    }

    public async Task InvalidateActiveTokensForUserAsync(Guid userId)
    {
        var activeTokens = await _context.PasswordResetTokens
            .Where(x => x.UserId == userId && !x.IsUsed)
            .ToListAsync();

        foreach (var token in activeTokens)
        {
            token.IsUsed = true;
        }
    }
}
