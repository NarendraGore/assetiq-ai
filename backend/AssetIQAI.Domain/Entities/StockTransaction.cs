using AssetIQAI.Domain.Common;
using AssetIQAI.Domain.Enums;

namespace AssetIQAI.Domain.Entities;

public class StockTransaction : BaseEntity, IOwnedEntity
{
    public Guid ProductId { get; set; }

    public Product Product { get; set; } = null!;

    public StockTransactionType TransactionType { get; set; }

    /// <summary>
    /// Quantity entered by user.
    /// For Adjustment, this represents the adjusted quantity.
    /// </summary>
    public int Quantity { get; set; }

    public int PreviousQuantity { get; set; }

    public int NewQuantity { get; set; }

    public string? Remarks { get; set; }

    public Guid OwnerId { get; set; }
}