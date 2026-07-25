using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Reports;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using AssetIQAI.Infrastructure.Services.Interfaces;

namespace AssetIQAI.Infrastructure.Services.Implementations;

public class ReportService : IReportService
{
    private readonly IProductRepository _productRepository;
    private readonly IStockRepository _stockRepository;

    public ReportService(
        IProductRepository productRepository,
        IStockRepository stockRepository)
    {
        _productRepository = productRepository;
        _stockRepository = stockRepository;
    }

    #region Inventory Report

    public async Task<PagedResponse<InventoryReportResponse>>
        GetInventoryReportAsync(ReportFilterRequest request)
    {
        var (items, totalCount) =
            await _productRepository.GetInventoryReportAsync(request);

        return new PagedResponse<InventoryReportResponse>
        {
            Items = items.ToList(),
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    #endregion

    #region Stock Report

    public async Task<PagedResponse<StockTransactionReportResponse>>
        GetStockReportAsync(ReportFilterRequest request)
    {
        var (items, totalCount) =
            await _stockRepository.GetStockTransactionReportAsync(request);

        return new PagedResponse<StockTransactionReportResponse>
        {
            Items = items.ToList(),
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    #endregion
}