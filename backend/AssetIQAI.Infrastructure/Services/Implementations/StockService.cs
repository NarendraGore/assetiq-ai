using AssetIQAI.Domain.Entities;
using AssetIQAI.Domain.Enums;
using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Stock;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Mapster;

namespace AssetIQAI.Infrastructure.Services.Implementations;

public class StockService : IStockService
{
    private readonly IStockRepository _stockRepository;
    private readonly IProductRepository _productRepository;

    public StockService(
        IStockRepository stockRepository,
        IProductRepository productRepository)
    {
        _stockRepository = stockRepository;
        _productRepository = productRepository;
    }

    #region Stock In

    public async Task StockInAsync(StockInRequest request)
    {
        if (request.Quantity <= 0)
            throw new Exception("Quantity must be greater than zero.");

        var product = await _productRepository.GetByIdWithDetailsAsync(request.ProductId);
        Console.WriteLine($"ProductId: {request.ProductId}");
        Console.WriteLine(product == null ? "NULL" : product.Name);

        if (product == null)
            throw new Exception("Product not found.");


        if (!product.IsActive)
            throw new Exception("Cannot perform stock operation on inactive product.");


        if (product.Category == null)
            throw new Exception("Category not found.");

        if (product.Supplier == null)
            throw new Exception("Supplier not found.");

        var previousQuantity = product.StockQuantity;


        product.StockQuantity += request.Quantity;
        product.UpdatedAt = DateTime.UtcNow;


        var transaction = request.Adapt<StockTransaction>();

        transaction.ProductId = product.Id;
        transaction.TransactionType = StockTransactionType.StockIn;
        transaction.PreviousQuantity = previousQuantity;
        transaction.NewQuantity = product.StockQuantity;
        transaction.CreatedAt = DateTime.UtcNow;
        transaction.CreatedBy = "System";

        await _stockRepository.AddAsync(transaction);

        await _productRepository.UpdateAsync(product);

        await _stockRepository.SaveChangesAsync();
    }

    #endregion

    #region Stock Out

    public async Task StockOutAsync(StockOutRequest request)
    {
        if (request.Quantity <= 0)
            throw new Exception("Quantity must be greater than zero.");

        var product = await _productRepository.GetByIdWithDetailsAsync(request.ProductId);

        if (product == null)
            throw new Exception("Product not found.");

        if (!product.IsActive)
            throw new Exception("Cannot perform stock operation on inactive product.");

        if (product.Category == null)
            throw new Exception("Category not found.");

        if (product.Supplier == null)
            throw new Exception("Supplier not found.");

        if (product.StockQuantity < request.Quantity)
            throw new Exception("Insufficient stock available.");

        var previousQuantity = product.StockQuantity;


        product.StockQuantity -= request.Quantity;
        product.UpdatedAt = DateTime.UtcNow;


        var transaction = request.Adapt<StockTransaction>();

        transaction.ProductId = product.Id;
        transaction.TransactionType = StockTransactionType.StockOut;
        transaction.PreviousQuantity = previousQuantity;
        transaction.NewQuantity = product.StockQuantity;
        transaction.CreatedAt = DateTime.UtcNow;
        transaction.CreatedBy = "System";

        await _stockRepository.AddAsync(transaction);

        await _productRepository.UpdateAsync(product);

        await _stockRepository.SaveChangesAsync();
    }

    #region Stock Adjustment

    public async Task AdjustStockAsync(StockAdjustmentRequest request)
    {
        if (request.NewQuantity < 0)
            throw new Exception("New quantity cannot be negative.");

        var product = await _productRepository.GetByIdAsync(request.ProductId);

        if (product == null)
            throw new Exception("Product not found.");

        if (!product.IsActive)
            throw new Exception("Cannot perform stock adjustment on an inactive product.");

        var previousQuantity = product.StockQuantity;


        product.StockQuantity = request.NewQuantity;
        product.UpdatedAt = DateTime.UtcNow;


        var transaction = request.Adapt<StockTransaction>();

        transaction.ProductId = product.Id;
        transaction.TransactionType = StockTransactionType.Adjustment;
        transaction.Quantity = Math.Abs(request.NewQuantity - previousQuantity);
        transaction.PreviousQuantity = previousQuantity;
        transaction.NewQuantity = request.NewQuantity;
        transaction.CreatedAt = DateTime.UtcNow;
        transaction.CreatedBy = "System";

        await _stockRepository.AddAsync(transaction);

        await _productRepository.UpdateAsync(product);

        await _stockRepository.SaveChangesAsync();
    }

    #endregion

    #region Inventory

    public async Task<PagedResponse<InventoryResponse>> GetInventoryAsync(
        PaginationRequest request)
    {
        var filter = new ProductFilterRequest
        {
            Page = request.Page,
            PageSize = request.PageSize
        };

        var (products, totalCount) =
            await _productRepository.GetPagedAsync(filter);
        var response = products.Select(p => new InventoryResponse
        {
            ProductId = p.Id,
            ProductName = p.Name,
            SKU = p.SKU,
            CategoryName = p.Category.Name,
            CompanyName = p.Supplier.CompanyName,
            CurrentStock = p.StockQuantity,
            MinimumStock = p.MinimumStock,
            UnitPrice = p.UnitPrice
        }).ToList();

        return new PagedResponse<InventoryResponse>
        {
            Items = response,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    #endregion

    #region Transaction History

    public async Task<PagedResponse<StockTransactionResponse>>
        GetTransactionsAsync(StockFilterRequest request)
    {
        var (transactions, totalCount) =
            await _stockRepository.GetTransactionsAsync(request);

        var response = transactions
            .Adapt<List<StockTransactionResponse>>();

        return new PagedResponse<StockTransactionResponse>
        {
            Items = response,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
    #region Low Stock

    public async Task<IEnumerable<InventoryResponse>> GetLowStockAsync()
    {
        var products = await _productRepository.GetLowStockAsync();

        return products.Select(x => new InventoryResponse
        {
            ProductId = x.Id,
            ProductName = x.Name,
            SKU = x.SKU,
            CategoryName = x.Category.Name,
            CompanyName = x.Supplier.CompanyName,
            CurrentStock = x.StockQuantity,
            MinimumStock = x.MinimumStock,
            UnitPrice = x.UnitPrice
        }).ToList();
    }

    #endregion

    #region Recent Transactions

    public async Task<IEnumerable<StockTransactionResponse>>
        GetRecentTransactionsAsync(int count = 10)
    {
        var transactions =
            await _stockRepository.GetRecentTransactionsAsync(count);

        return transactions.Adapt<List<StockTransactionResponse>>();
    }

    #endregion

    #region Inventory Summary

    public async Task<InventorySummaryResponse> GetInventorySummaryAsync()
    {
        var filter = new ProductFilterRequest
        {
            Page = 1,
            PageSize = int.MaxValue
        };

        var (products, _) =
            await _productRepository.GetPagedAsync(filter);

        var productList = products.ToList();

        var summary = new InventorySummaryResponse
        {
            TotalProducts = productList.Count,

            ActiveProducts = productList.Count(x => x.IsActive),

            LowStockProducts = productList.Count(x =>
                x.StockQuantity <= x.MinimumStock &&
                x.StockQuantity > 0),

            OutOfStockProducts = productList.Count(x =>
                x.StockQuantity == 0),

            TotalInventoryValue = productList.Sum(x =>
                x.UnitPrice * x.StockQuantity)
        };

        return summary;
    }

    #endregion
}
    #endregion


    #endregion