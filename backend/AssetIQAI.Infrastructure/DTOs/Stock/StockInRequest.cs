namespace AssetIQAI.Infrastructure.DTOs.Stock;

public class StockInRequest
{
    public Guid ProductId { get; set; }

    public int Quantity { get; set; }

    public string? Remarks { get; set; }
}