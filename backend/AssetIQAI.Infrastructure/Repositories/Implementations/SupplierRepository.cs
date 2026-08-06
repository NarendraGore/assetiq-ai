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

    public new async Task<Supplier?> GetByIdAsync(Guid id)
    {
        return await _context.Suppliers
            .Include(s => s.Products)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<bool> HasProductsAsync(Guid supplierId)
    {


        return await _context.Products
            .AnyAsync(p => p.SupplierId == supplierId);
    }
    public async Task<(IEnumerable<Supplier> Items, int TotalCount)> GetPagedAsync(
        int page,
        int pageSize,
        string? search)
    {
        IQueryable<Supplier> query = _context.Suppliers
            .Include(s => s.Products);

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(s => s.CompanyName.Contains(search));
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(s => s.CompanyName)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }
}