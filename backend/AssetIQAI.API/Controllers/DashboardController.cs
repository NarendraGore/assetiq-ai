using AssetIQAI.Infrastructure.DTOs.Stock;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssetIQAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IStockService _stockService;

    public DashboardController(IStockService stockService)
    {
        _stockService = stockService;
    }

    /// <summary>
    /// Inventory Summary Dashboard
    /// </summary>
    [HttpGet("inventory-summary")]
    public async Task<ActionResult<InventorySummaryResponse>> GetInventorySummary()
    {
        var result = await _stockService.GetInventorySummaryAsync();

        return Ok(result);
    }

    /// <summary>
    /// Recent Stock Transactions
    /// </summary>
    [HttpGet("recent-transactions")]
    public async Task<ActionResult<IEnumerable<StockTransactionResponse>>> GetRecentTransactions()
    {
        var result = await _stockService.GetRecentTransactionsAsync();

        return Ok(result);
    }

    /// <summary>
    /// Low Stock Products
    /// </summary>
    [HttpGet("low-stock")]
    public async Task<ActionResult<IEnumerable<InventoryResponse>>> GetLowStock()
    {
        var result = await _stockService.GetLowStockAsync();

        return Ok(result);
    }

    /// <summary>
    /// Out Of Stock Products
    /// </summary>
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
}