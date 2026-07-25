using AssetIQAI.Domain.Enums;

namespace AssetIQAI.Infrastructure.DTOs.Reports;

public class StockTransactionReportResponse
{
    public Guid TransactionId { get; set; }

    public Guid ProductId { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public string SKU { get; set; } = string.Empty;

    public StockTransactionType TransactionType { get; set; }

    public int Quantity { get; set; }

    public int PreviousQuantity { get; set; }

    public int NewQuantity { get; set; }

    public string? Remarks { get; set; }

    public DateTime CreatedAt { get; set; }

    public string CreatedBy { get; set; } = string.Empty;
}