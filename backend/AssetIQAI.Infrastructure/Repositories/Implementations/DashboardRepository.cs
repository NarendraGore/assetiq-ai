using System.Globalization;
using AssetIQAI.Domain.Enums;
using AssetIQAI.Infrastructure.Data;
using AssetIQAI.Infrastructure.DTOs.Dashboard;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AssetIQAI.Infrastructure.Repositories.Implementations;

public class DashboardRepository : IDashboardRepository
{
    private readonly ApplicationDbContext _context;

    public DashboardRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummaryResponse> GetSummaryAsync()
    {
        var totalProducts = await _context.Products.CountAsync();

        var activeProducts = await _context.Products
            .CountAsync(x => x.IsActive);

        var inactiveProducts = totalProducts - activeProducts;

        var totalInventoryValue = await _context.Products
            .SumAsync(x => x.UnitPrice * x.StockQuantity);

        var lowStockProducts = await _context.Products
            .CountAsync(x =>
                x.StockQuantity > 0 &&
                x.StockQuantity <= x.MinimumStock);

        var outOfStockProducts = await _context.Products
            .CountAsync(x => x.StockQuantity == 0);

        var totalCategories = await _context.Categories.CountAsync();

        var totalSuppliers = await _context.Suppliers.CountAsync();

        return new DashboardSummaryResponse
        {
            TotalProducts = totalProducts,
            ActiveProducts = activeProducts,
            InactiveProducts = inactiveProducts,
            TotalInventoryValue = totalInventoryValue,
            LowStockProducts = lowStockProducts,
            OutOfStockProducts = outOfStockProducts,
            TotalCategories = totalCategories,
            TotalSuppliers = totalSuppliers
        };
    }

    public async Task<IEnumerable<CategoryChartResponse>> GetCategoryChartAsync()
    {
        return await _context.Categories
            .Select(c => new CategoryChartResponse
            {
                CategoryName = c.Name,
                ProductCount = c.Products.Count
            })
            .OrderByDescending(x => x.ProductCount)
            .ToListAsync();
    }

    public async Task<IEnumerable<SupplierChartResponse>> GetSupplierChartAsync()
    {
        return await _context.Suppliers
            .Select(s => new SupplierChartResponse
            {
                SupplierName = s.CompanyName,
                ProductCount = s.Products.Count
            })
            .OrderByDescending(x => x.ProductCount)
            .ToListAsync();
    }

    public async Task<IEnumerable<InventoryChartResponse>> GetInventoryChartsAsync()
    {
        return await _context.Products
            .Select(p => new InventoryChartResponse
            {
                ProductName = p.Name,
                InventoryValue = p.StockQuantity * p.UnitPrice
            })
            .OrderByDescending(x => x.InventoryValue)
            .ToListAsync();
    }

    public async Task<IEnumerable<StockChartResponse>> GetStockChartAsync()
    {
        var currentYear = DateTime.UtcNow.Year;

        var data = await _context.StockTransactions
            .Where(x => x.CreatedAt.Year == currentYear)
            .GroupBy(x => x.CreatedAt.Month)
            .Select(g => new
            {
                MonthNumber = g.Key,

                StockIn = g.Where(x => x.TransactionType == StockTransactionType.StockIn)
                    .Sum(x => x.Quantity),

                StockOut = g.Where(x => x.TransactionType == StockTransactionType.StockOut)
                    .Sum(x => x.Quantity)
            })
            .OrderBy(x => x.MonthNumber)
            .ToListAsync();

        return data.Select(x => new StockChartResponse
        {
            Month = CultureInfo.InvariantCulture.DateTimeFormat
                .GetAbbreviatedMonthName(x.MonthNumber),

            StockIn = x.StockIn,

            StockOut = x.StockOut
        });
    }
}