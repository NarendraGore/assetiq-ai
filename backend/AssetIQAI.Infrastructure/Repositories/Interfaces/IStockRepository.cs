using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Stock;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface IStockRepository : IGenericRepository<StockTransaction>
{
    Task<IEnumerable<StockTransaction>> GetByProductIdAsync(Guid productId);

    Task<(IEnumerable<StockTransaction> Items, int TotalCount)>
        GetTransactionsAsync(StockFilterRequest request);

    Task<IEnumerable<Product>> GetLowStockAsync();

    Task<IEnumerable<StockTransaction>> GetRecentTransactionsAsync(int count = 10);
}