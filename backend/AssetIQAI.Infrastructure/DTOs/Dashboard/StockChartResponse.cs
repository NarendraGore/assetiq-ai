namespace AssetIQAI.Infrastructure.DTOs.Dashboard;

public class StockChartResponse
{
    public string Month { get; set; } = string.Empty;

    public int StockIn { get; set; }

    public int StockOut { get; set; }
}