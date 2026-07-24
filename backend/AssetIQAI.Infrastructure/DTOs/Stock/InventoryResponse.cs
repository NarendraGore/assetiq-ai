namespace AssetIQAI.Infrastructure.DTOs.Stock;

public class InventoryResponse
{
    public Guid ProductId { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public string SKU { get; set; } = string.Empty;

    public string CategoryName { get; set; } = string.Empty;

    public string CompanyName { get; set; } = string.Empty;

    public int CurrentStock { get; set; }

    public int MinimumStock { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal StockValue => CurrentStock * UnitPrice;

    public bool IsLowStock => CurrentStock <= MinimumStock;
}