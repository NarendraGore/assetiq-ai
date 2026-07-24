namespace AssetIQAI.Infrastructure.DTOs.Product;

public class ProductListResponse
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string SKU { get; set; } = string.Empty;

    public string CategoryName { get; set; } = string.Empty;

    public string SupplierName { get; set; } = string.Empty;

    public decimal UnitPrice { get; set; }

    public int StockQuantity { get; set; }

    public bool IsActive { get; set; }
}