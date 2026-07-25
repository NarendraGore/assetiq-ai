using System;
using System.Collections.Generic;
using System.Text;
using AssetIQAI.Infrastructure.DTOs.Dashboard;

namespace AssetIQAI.Infrastructure.Services.Interfaces;

public interface IDashboardService 
{
    Task<DashboardSummaryResponse> GetSummaryAsync();

    Task<IEnumerable<CategoryChartResponse>> GetCategoryChartsAsync();

    Task<IEnumerable<StockChartResponse>> GetStockChartsAsync();

    Task<IEnumerable<InventoryChartResponse>> GetInventoryChartsAsync();

    Task<IEnumerable<SupplierChartResponse>> GetSupplierChartsAsync();
}
