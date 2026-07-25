using AssetIQAI.Domain.Enums;
using AssetIQAI.Infrastructure.DTOs.Common;

namespace AssetIQAI.Infrastructure.DTOs.Reports;

public class ReportFilterRequest:PaginationRequest
{
    // Filters
    public Guid? CategoryId { get; set; }

    public Guid? SupplierId { get; set; }

    // Stock Transaction Filter
    public StockTransactionType? TransactionType { get; set; }

    // Date Filters
    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }
}