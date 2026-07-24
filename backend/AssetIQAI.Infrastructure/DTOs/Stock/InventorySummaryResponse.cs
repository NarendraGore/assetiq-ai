namespace AssetIQAI.Infrastructure.DTOs.Stock;

public class InventorySummaryResponse
{
    public int TotalProducts { get; set; }

    public int ActiveProducts { get; set; }

    public int LowStockProducts { get; set; }

    public int OutOfStockProducts { get; set; }

    public decimal TotalInventoryValue { get; set; }
}