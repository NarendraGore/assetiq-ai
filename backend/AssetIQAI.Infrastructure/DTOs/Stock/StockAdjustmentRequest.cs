namespace AssetIQAI.Infrastructure.DTOs.Stock;

public class StockAdjustmentRequest
{
    public Guid ProductId { get; set; }

    public int NewQuantity { get; set; }

    public string? Remarks { get; set; }
}