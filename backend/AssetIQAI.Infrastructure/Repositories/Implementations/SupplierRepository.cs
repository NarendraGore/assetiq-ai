using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.Data;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace AssetIQAI.Infrastructure.Repositories.Implementations;

public class SupplierRepository
    : GenericRepository<Supplier>, ISupplierRepository
{
    public SupplierRepository(ApplicationDbContext context)
        : base(context)
    {

    }
    public async Task<Supplier?> GetByCompanyNameAsync(string companyName)
    {
        return await _context.Suppliers
            .FirstOrDefaultAsync(x => x.CompanyName == companyName);
    }
    public async Task<(IEnumerable<Supplier> Items, int TotalCount)> GetPagedAsync(
    int page,
    int pageSize,
    string? search)
    {
        return await base.GetPagedAsync(
            page,
            pageSize,
            x => string.IsNullOrWhiteSpace(search)
                 || x.CompanyName.Contains(search),
            x => x.CompanyName);
    }
}