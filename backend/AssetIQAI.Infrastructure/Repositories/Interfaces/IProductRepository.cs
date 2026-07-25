using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Reports;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface IProductRepository : IGenericRepository<Product>
{
    Task<Product?> GetBySkuAsync(string sku);

    Task<(IEnumerable<Product> Items, int TotalCount)> GetPagedAsync(
        ProductFilterRequest request);

    Task<IEnumerable<Product>> GetLowStockAsync();

    Task<Product?> GetByIdWithDetailsAsync(Guid id);

    Task<(IEnumerable<InventoryReportResponse> Items, int TotalCount)>
    GetInventoryReportAsync(ReportFilterRequest request);


}