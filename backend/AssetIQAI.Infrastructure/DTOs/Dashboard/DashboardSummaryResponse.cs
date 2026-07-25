namespace AssetIQAI.Infrastructure.DTOs.Dashboard;

public class DashboardSummaryResponse
{
    public int TotalProducts { get; set; }

    public int ActiveProducts { get; set; }

    public int InactiveProducts { get; set; }

    public decimal TotalInventoryValue { get; set; }

    public int LowStockProducts { get; set; }

    public int OutOfStockProducts { get; set; }

    public int TotalCategories { get; set; }

    public int TotalSuppliers { get; set; }
}