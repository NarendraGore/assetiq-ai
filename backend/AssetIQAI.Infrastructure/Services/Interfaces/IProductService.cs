using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Product;

namespace AssetIQAI.Infrastructure.Services.Interfaces;

public interface IProductService
{
    Task<PagedResponse<ProductListResponse>> GetAllAsync(
        ProductFilterRequest request);

    Task<ProductResponse> GetByIdAsync(Guid id);

    Task<ProductResponse> CreateAsync(CreateProductRequest request);

    Task<ProductResponse> UpdateAsync(
        Guid id,
        UpdateProductRequest request);

    Task DeleteAsync(Guid id);

    Task<IEnumerable<ProductListResponse>> GetLowStockAsync();
}