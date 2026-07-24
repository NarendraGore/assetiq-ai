using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Common;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface IProductRepository : IGenericRepository<Product>
{
    Task<Product?> GetBySkuAsync(string sku);

    Task<(IEnumerable<Product> Items, int TotalCount)> GetPagedAsync(
        ProductFilterRequest request);

    Task<IEnumerable<Product>> GetLowStockAsync();

    Task<Product?> GetByIdWithDetailsAsync(Guid id);
}