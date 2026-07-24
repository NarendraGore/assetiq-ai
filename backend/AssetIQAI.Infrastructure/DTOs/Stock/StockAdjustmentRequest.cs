namespace AssetIQAI.Infrastructure.DTOs.Stock;

public class StockAdjustmentRequest
{
    public Guid ProductId { get; set; }

    /// <summary>
    /// Final stock quantity after adjustment.
    /// </summary>
    public int NewQuantity { get; set; }

    public string? Remarks { get; set; }
}