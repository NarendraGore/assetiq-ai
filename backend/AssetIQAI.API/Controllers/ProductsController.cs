using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Product;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssetIQAI.API.Controllers;

[ApiController]
[Route("api/products")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] ProductFilterRequest request)
    {
        var products = await _productService.GetAllAsync(request);

        return Ok(products);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _productService.GetByIdAsync(id);

        return Ok(product);
    }

    [Authorize(Roles = "Admin, Employee")]
    [HttpPost]
    public async Task<IActionResult> Create(
        CreateProductRequest request)
    {
        var product = await _productService.CreateAsync(request);

        return Ok(product);
    }

    [Authorize(Roles = "Admin,Employee")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid id,
        UpdateProductRequest request)
    {
        var product =
            await _productService.UpdateAsync(id, request);

        return Ok(product);
    }

    [Authorize(Roles = "Admin,Employee")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _productService.DeleteAsync(id);

        return NoContent();
    }

    [HttpGet("low-stock")]
    public async Task<IActionResult> LowStock()
    {
        var products =
            await _productService.GetLowStockAsync();

        return Ok(products);
    }
}