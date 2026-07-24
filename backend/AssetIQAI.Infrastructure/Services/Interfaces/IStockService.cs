using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Stock;

namespace AssetIQAI.Infrastructure.Services.Interfaces;

public interface IStockService
{
    Task StockInAsync(StockInRequest request);

    Task StockOutAsync(StockOutRequest request);

    Task AdjustStockAsync(StockAdjustmentRequest request);

    Task<PagedResponse<InventoryResponse>> GetInventoryAsync(
        PaginationRequest request);

    Task<PagedResponse<StockTransactionResponse>> GetTransactionsAsync(
        StockFilterRequest request);

    Task<IEnumerable<InventoryResponse>> GetLowStockAsync();

    Task<IEnumerable<StockTransactionResponse>> GetRecentTransactionsAsync(
        int count = 10);

    Task<InventorySummaryResponse> GetInventorySummaryAsync();
}