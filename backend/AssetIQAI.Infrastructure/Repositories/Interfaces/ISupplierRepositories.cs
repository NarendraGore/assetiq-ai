using AssetIQAI.Domain.Entities;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface ISupplierRepository : IGenericRepository<Supplier>
{
    Task<Supplier?> GetByCompanyNameAsync(string companyName);

    /// <summary>
    /// True when at least one product references this supplier. Used to block
    /// deletion of suppliers that are still in use.
    /// </summary>
    Task<bool> HasProductsAsync(Guid supplierId);

    Task<(IEnumerable<Supplier> Items, int TotalCount)> GetPagedAsync(
        int page,
        int pageSize,
        string? search);
}