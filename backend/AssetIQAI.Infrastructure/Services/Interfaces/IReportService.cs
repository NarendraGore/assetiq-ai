using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Reports;

namespace AssetIQAI.Infrastructure.Services.Interfaces;

public interface IReportService
{
    Task<PagedResponse<InventoryReportResponse>>
        GetInventoryReportAsync(ReportFilterRequest request);

    Task<PagedResponse<StockTransactionReportResponse>>
        GetStockReportAsync(ReportFilterRequest request);
}