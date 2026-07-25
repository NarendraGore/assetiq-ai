using AssetIQAI.Infrastructure.DTOs.Reports;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssetIQAI.API.Controllers;

[ApiController]
[Route("api/reports")]
[Authorize]
public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportController(IReportService reportService)
    {
        _reportService = reportService;
    }

    #region Inventory Report

    [HttpGet("inventory")]
    public async Task<IActionResult> GetInventoryReport(
        [FromQuery] ReportFilterRequest request)
    {
        var result = await _reportService.GetInventoryReportAsync(request);

        return Ok(result);
    }

    #endregion

    #region Stock Transaction Report

    [HttpGet("stock")]
    public async Task<IActionResult> GetStockReport(
        [FromQuery] ReportFilterRequest request)
    {
        var result = await _reportService.GetStockReportAsync(request);

        return Ok(result);
    }

    #endregion
}