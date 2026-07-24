namespace AssetIQAI.Infrastructure.DTOs.Product;

public class UpdateProductRequest
{
    public string Name { get; set; } = string.Empty;

    public string SKU { get; set; } = string.Empty;

    public string? Description { get; set; }

    public Guid CategoryId { get; set; }

    public Guid SupplierId { get; set; }

    public decimal UnitPrice { get; set; }

    public int StockQuantity { get; set; }

    public int MinimumStock { get; set; }

    public string? ImageUrl { get; set; }

    public bool IsActive { get; set; } = true;
}