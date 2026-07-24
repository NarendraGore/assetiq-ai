namespace AssetIQAI.Infrastructure.DTOs.Stock;

public class StockOutRequest
{
    public Guid ProductId { get; set; }

    public int Quantity { get; set; }

    public string? Remarks { get; set; }
}