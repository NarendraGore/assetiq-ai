using AssetIQAI.Domain.Enums;
using AssetIQAI.Infrastructure.DTOs.Common;

namespace AssetIQAI.Infrastructure.DTOs.Stock;

public class StockFilterRequest : PaginationRequest
{
    public StockTransactionType? TransactionType { get; set; }

    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }
}