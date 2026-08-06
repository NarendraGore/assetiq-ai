using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.Data;
using AssetIQAI.Infrastructure.DTOs.Stock;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using AssetIQAI.Infrastructure.DTOs.Reports;
using Microsoft.EntityFrameworkCore;

namespace AssetIQAI.Infrastructure.Repositories.Implementations;

public class StockRepository
    : GenericRepository<StockTransaction>, IStockRepository
{
    public StockRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<IEnumerable<StockTransaction>> GetByProductIdAsync(Guid productId)
    {
        return await _context.StockTransactions
            .Include(x => x.Product)
            .Where(x => x.ProductId == productId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();
    }

    public async Task<(IEnumerable<StockTransaction> Items, int TotalCount)>
        GetTransactionsAsync(StockFilterRequest request)
    {
        IQueryable<StockTransaction> query = _context.StockTransactions
            .Include(x => x.Product);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            query = query.Where(x =>
                x.Product.Name.Contains(request.Search));
        }

        if (request.TransactionType.HasValue)
        {
            query = query.Where(x =>
                x.TransactionType == request.TransactionType.Value);
        }

        if (request.FromDate.HasValue)
        {
            query = query.Where(x =>
                x.CreatedAt >= request.FromDate.Value);
        }

        if (request.ToDate.HasValue)
        {
            query = query.Where(x =>
                x.CreatedAt <= request.ToDate.Value);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAt)
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
            .ToListAsync();
    }

    public async Task<IEnumerable<StockTransaction>> GetRecentTransactionsAsync(int count = 10)
    {
        return await _context.StockTransactions
            .Include(x => x.Product)
            .OrderByDescending(x => x.CreatedAt)
            .Take(count)
            .ToListAsync();
    }
    public async Task<(IEnumerable<StockTransactionReportResponse> Items, int TotalCount)>
    GetStockTransactionReportAsync(ReportFilterRequest request)
    {
        IQueryable<StockTransaction> query = _context.StockTransactions
            .Include(x => x.Product);


        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            query = query.Where(x =>
                x.Product.Name.Contains(request.Search) ||
                x.Product.SKU.Contains(request.Search));
        }


        if (request.TransactionType.HasValue)
        {
            query = query.Where(x =>
                x.TransactionType == request.TransactionType.Value);
        }


        if (request.FromDate.HasValue)
        {
            query = query.Where(x =>
                x.CreatedAt >= request.FromDate.Value);
        }


        if (request.ToDate.HasValue)
        {
            query = query.Where(x =>
                x.CreatedAt <= request.ToDate.Value);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(x => new StockTransactionReportResponse
            {
                TransactionId = x.Id,
                ProductId = x.ProductId,
                ProductName = x.Product.Name,
                SKU = x.Product.SKU,
                TransactionType = x.TransactionType,
                Quantity = x.Quantity,
                PreviousQuantity = x.PreviousQuantity,
                NewQuantity = x.NewQuantity,
                Remarks = x.Remarks,
                CreatedAt = x.CreatedAt,
                CreatedBy = x.CreatedBy
            })
            .ToListAsync();

        return (items, totalCount);
    }
}