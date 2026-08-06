using AssetIQAI.Domain.Common;

namespace AssetIQAI.Domain.Entities;

public class PasswordResetToken : BaseEntity
{


    public string TokenHash { get; set; } = string.Empty;

    public DateTime ExpiryDate { get; set; }

    public bool IsUsed { get; set; }

    public Guid UserId { get; set; }

    public User? User { get; set; }
}
