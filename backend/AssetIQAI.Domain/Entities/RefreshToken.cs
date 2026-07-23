using AssetIQAI.Domain.Common;

namespace AssetIQAI.Domain.Entities;

public class RefreshToken : BaseEntity
{
    public string Token { get; set; } = string.Empty;

    public DateTime ExpiryDate { get; set; }

    public bool IsRevoked { get; set; }

    public Guid UserId { get; set; }

    public User? User { get; set; }
}