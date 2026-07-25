using AssetIQAI.Infrastructure.DTOs.Dashboard;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface IDashboardRepository
{
    Task<DashboardSummaryResponse> GetSummaryAsync();

    Task<IEnumerable<CategoryChartResponse>> GetCategoryChartAsync();

    Task<IEnumerable<SupplierChartResponse>> GetSupplierChartAsync();

    Task<IEnumerable<InventoryChartResponse>> GetInventoryChartsAsync();

    Task<IEnumerable<StockChartResponse>> GetStockChartAsync();
}