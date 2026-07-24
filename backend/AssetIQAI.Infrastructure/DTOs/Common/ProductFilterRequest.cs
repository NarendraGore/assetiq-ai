using AssetIQAI.Infrastructure.DTOs.Common;

public class ProductFilterRequest : PaginationRequest
{
    public Guid? CategoryId { get; set; }

    public Guid? SupplierId { get; set; }

    public decimal? MinPrice { get; set; }

    public decimal? MaxPrice { get; set; }
}