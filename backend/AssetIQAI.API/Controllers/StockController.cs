using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Stock;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssetIQAI.API.Controllers;

[ApiController]
[Route("api/v1/stock")]
[Authorize]
public class StockController : ControllerBase
{
    private readonly IStockService _stockService;

    public StockController(IStockService stockService)
    {
        _stockService = stockService;
    }

    /// <summary>
    /// Get inventory with pagination.
    /// </summary>
    [HttpGet("inventory")]
    public async Task<IActionResult> GetInventory(
        [FromQuery] PaginationRequest request)
    {
        var result = await _stockService.GetInventoryAsync(request);

        return Ok(result);
    }

    /// <summary>
    /// Get stock transaction history.
    /// </summary>
    [HttpGet("history")]
    public async Task<IActionResult> GetTransactionHistory(
        [FromQuery] StockFilterRequest request)
    {
        var result = await _stockService.GetTransactionsAsync(request);

        return Ok(result);
    }

    /// <summary>
    /// Get low stock products.
    /// </summary>
    [HttpGet("low-stock")]
    public async Task<IActionResult> GetLowStock()
    {
        var result = await _stockService.GetLowStockAsync();

        return Ok(result);
    }

    /// <summary>
    /// Add stock.
    /// </summary>
    [HttpPost("in")]
    [Authorize(Roles = "Admin,Manager,Employee")]
    public async Task<IActionResult> StockIn(
        [FromBody] StockInRequest request)
    {
        await _stockService.StockInAsync(request);

        return Ok(new
        {
            Message = "Stock added successfully."
        });
    }

    /// <summary>
    /// Remove stock.
    /// </summary>
    [HttpPost("out")]
    [Authorize(Roles = "Admin,Manager,Employee")]
    public async Task<IActionResult> StockOut(
        [FromBody] StockOutRequest request)
    {
        await _stockService.StockOutAsync(request);

        return Ok(new
        {
            Message = "Stock removed successfully."
        });
    }

    /// <summary>
    /// Adjust stock quantity.
    /// </summary>
    [HttpPost("adjust")]
    [Authorize(Roles = "Admin,Manager,Employee")]
    public async Task<IActionResult> AdjustStock(
        [FromBody] StockAdjustmentRequest request)
    {
        await _stockService.AdjustStockAsync(request);

        return Ok(new
        {
            Message = "Stock adjusted successfully."
        });
    }
}