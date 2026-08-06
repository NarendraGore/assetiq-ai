using AssetIQAI.Infrastructure.DTOs.Category;
using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssetIQAI.API.Controllers;

[ApiController]
[Route("api/v1/categories")]
[Authorize]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }


    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PaginationRequest request)
    {
        var categories = await _categoryService.GetAllAsync(request);

        return Ok(categories);
    }


    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var category = await _categoryService.GetByIdAsync(id);

        return Ok(category);
    }


    [Authorize(Roles = "Admin,Manager,Employee")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryRequest request)
    {
        var category = await _categoryService.CreateAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = category.Id },
            category);
    }


    [Authorize(Roles = "Admin,Manager,Employee")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid id,
        UpdateCategoryRequest request)
    {
        var category = await _categoryService.UpdateAsync(id, request);

        return Ok(category);
    }


    [Authorize(Roles = "Admin,Manager,Employee")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _categoryService.DeleteAsync(id);

        return NoContent();
    }
}