using AssetIQAI.Infrastructure.DTOs.Stock;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssetIQAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IStockService _stockService;
    private readonly IDashboardService _dashboardService;

    public DashboardController(IStockService stockService
        , IDashboardService dashboardService)
    {
        _stockService = stockService;
        _dashboardService = dashboardService;
    }

    [HttpGet("inventory-summary")]
    public async Task<ActionResult<InventorySummaryResponse>> GetInventorySummary()
    {
        var result = await _stockService.GetInventorySummaryAsync();

        return Ok(result);
    }

    [HttpGet("recent-transactions")]
    public async Task<ActionResult<IEnumerable<StockTransactionResponse>>> GetRecentTransactions()
    {
        var result = await _stockService.GetRecentTransactionsAsync();

        return Ok(result);
    }

    [HttpGet("low-stock")]
    public async Task<ActionResult<IEnumerable<InventoryResponse>>> GetLowStock()
    {
        var result = await _stockService.GetLowStockAsync();

        return Ok(result);
    }

    [HttpGet("out-of-stock")]
    public async Task<ActionResult<IEnumerable<InventoryResponse>>> GetOutOfStock()
    {
        var inventory = await _stockService.GetInventoryAsync(
            new ProductFilterRequest
            {
                Page = 1,
                PageSize = int.MaxValue
            });

        var result = inventory.Items
            .Where(x => x.CurrentStock == 0)
            .ToList();

        return Ok(result);
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var result = await _dashboardService.GetSummaryAsync();

        return Ok(result);
    }


    [HttpGet("category-chart")]
    public async Task<IActionResult> GetCategoryChart()
    {
        var result = await _dashboardService.GetCategoryChartsAsync();
        return Ok(result);
    }

    [HttpGet("stock-chart")]

    public async Task<IActionResult> GetStockChart() 
    {

        var result = await _dashboardService.GetStockChartsAsync();
        return Ok(result);
    }

    [HttpGet("supplier-chart")]
    public async Task<IActionResult> GetSupplierChart()
    {
        var result = await _dashboardService.GetSupplierChartsAsync();
        return Ok(result);
    }

    [HttpGet("inventory-chart")]
    public async Task<IActionResult> GetInventoryChart()
    {
        var result = await _dashboardService.GetInventoryChartsAsync();
        return Ok(result);

    }
}