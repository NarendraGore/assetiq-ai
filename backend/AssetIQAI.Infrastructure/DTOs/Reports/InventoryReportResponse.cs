namespace AssetIQAI.Infrastructure.DTOs.Reports;

public class InventoryReportResponse
{
    public Guid ProductId { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public string SKU { get; set; } = string.Empty;

    public string CategoryName { get; set; } = string.Empty;

    public string SupplierName { get; set; } = string.Empty;

    public int CurrentStock { get; set; }

    public int MinimumStock { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal StockValue => CurrentStock * UnitPrice;

    public bool IsLowStock => CurrentStock <= MinimumStock;

    public bool IsOutOfStock => CurrentStock == 0;

    public bool IsActive { get; set; }
}