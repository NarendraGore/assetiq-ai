using AssetIQAI.Domain.Enums;
using AssetIQAI.Infrastructure.DTOs.Common;

namespace AssetIQAI.Infrastructure.DTOs.Reports;

public class ReportFilterRequest:PaginationRequest
{

    public Guid? CategoryId { get; set; }

    public Guid? SupplierId { get; set; }


    public StockTransactionType? TransactionType { get; set; }


    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }
}