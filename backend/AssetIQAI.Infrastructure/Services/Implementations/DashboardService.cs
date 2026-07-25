using AssetIQAI.Infrastructure.DTOs.Dashboard;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using AssetIQAI.Infrastructure.Services.Interfaces;

namespace AssetIQAI.Infrastructure.Services.Implementations;

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _dashboardRepository;

    public DashboardService(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    public async Task<DashboardSummaryResponse> GetSummaryAsync()
    {
        return await _dashboardRepository.GetSummaryAsync();
    }

    public async Task<IEnumerable<CategoryChartResponse>>GetCategoryChartsAsync() 
    { 
    
        return await _dashboardRepository.GetCategoryChartAsync();
    }

    public async Task<IEnumerable<SupplierChartResponse>> GetSupplierChartsAsync()
    { 
        return await _dashboardRepository.GetSupplierChartAsync();
    }

    public async Task<IEnumerable<InventoryChartResponse>> GetInventoryChartsAsync()
    {
        return await _dashboardRepository.GetInventoryChartsAsync();
    }

    public async Task<IEnumerable<StockChartResponse>> GetStockChartsAsync()
    {
        return await _dashboardRepository.GetStockChartAsync();
    }
}