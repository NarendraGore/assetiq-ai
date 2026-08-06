using AssetIQAI.Domain.Entities;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface ISupplierRepository : IGenericRepository<Supplier>
{
    Task<Supplier?> GetByCompanyNameAsync(string companyName);

    Task<bool> HasProductsAsync(Guid supplierId);

    Task<(IEnumerable<Supplier> Items, int TotalCount)> GetPagedAsync(
        int page,
        int pageSize,
        string? search);
}