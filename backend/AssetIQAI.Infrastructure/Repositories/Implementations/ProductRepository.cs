using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.Data;
using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AssetIQAI.Infrastructure.Repositories.Implementations;

public class ProductRepository
    : GenericRepository<Product>, IProductRepository
{
    public ProductRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<Product?> GetBySkuAsync(string sku)
    {
        return await _context.Products
            .Include(x => x.Category)
            .Include(x => x.Supplier)
            .FirstOrDefaultAsync(x => x.SKU == sku);
    }

    public async Task<(IEnumerable<Product> Items, int TotalCount)> GetPagedAsync(
        ProductFilterRequest request)
    {
        IQueryable<Product> query = _context.Products
            .Include(x => x.Category)
            .Include(x => x.Supplier);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            query = query.Where(x =>
                x.Name.Contains(request.Search) ||
                x.SKU.Contains(request.Search));
        }

        if (request.CategoryId.HasValue)
        {
            query = query.Where(x =>
                x.CategoryId == request.CategoryId.Value);
        }

        if (request.SupplierId.HasValue)
        {
            query = query.Where(x =>
                x.SupplierId == request.SupplierId.Value);
        }

        if (request.MinPrice.HasValue)
        {
            query = query.Where(x =>
                x.UnitPrice >= request.MinPrice.Value);
        }

        if (request.MaxPrice.HasValue)
        {
            query = query.Where(x =>
                x.UnitPrice <= request.MaxPrice.Value);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.Name)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<IEnumerable<Product>> GetLowStockAsync()
    {
        return await _context.Products
            .Include(x => x.Category)
            .Include(x => x.Supplier)
            .Where(x => x.StockQuantity <= x.MinimumStock)
            .OrderBy(x => x.StockQuantity)
            .ToListAsync();
    }
    public async Task<Product?> GetByIdWithDetailsAsync(Guid id)
    {
        return await _context.Products
            .Include(x => x.Category)
            .Include(x => x.Supplier)
            .FirstOrDefaultAsync(x => x.Id == id);
    }
}