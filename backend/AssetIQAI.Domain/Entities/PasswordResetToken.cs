using AssetIQAI.Domain.Common;

namespace AssetIQAI.Domain.Entities;

public class PasswordResetToken : BaseEntity
{
    // We never store the raw reset token. Only a SHA-256 hash of it is
    // persisted, so a database leak cannot be used to reset passwords.
    public string TokenHash { get; set; } = string.Empty;

    public DateTime ExpiryDate { get; set; }

    public bool IsUsed { get; set; }

    public Guid UserId { get; set; }

    public User? User { get; set; }
}
