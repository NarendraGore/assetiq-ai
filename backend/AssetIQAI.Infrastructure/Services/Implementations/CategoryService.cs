using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Category;
using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Mapster;

namespace AssetIQAI.Infrastructure.Services.Implementations;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<PagedResponse<CategoryResponse>> GetAllAsync(
    PaginationRequest request)
    {
        var (items, totalCount) =
            await _categoryRepository.GetPagedAsync(
                request.Page,
                request.PageSize,
                request.Search);

        return new PagedResponse<CategoryResponse>
        {
            Items = items.Adapt<List<CategoryResponse>>(),
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    public async Task<CategoryResponse> GetByIdAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);

        if (category == null)
            throw new Exception("Category not found.");

        return category.Adapt<CategoryResponse>();
    }

    public async Task<CategoryResponse> CreateAsync(CreateCategoryRequest request)
    {
        // Validation
        var existingCategory = await _categoryRepository.GetByNameAsync(request.Name);

        if (existingCategory != null)
            throw new Exception("Category already exists.");

        // Mapping DTO -> Entity
        var category = request.Adapt<Category>();

        await _categoryRepository.AddAsync(category);

        await _categoryRepository.SaveChangesAsync();

        return category.Adapt<CategoryResponse>();
    }

    public async Task<CategoryResponse> UpdateAsync(Guid id, UpdateCategoryRequest request)
    {
        var category = await _categoryRepository.GetByIdAsync(id);

        if (category == null)
            throw new Exception("Category not found.");

        var existingCategory = await _categoryRepository.GetByNameAsync(request.Name);

        if (existingCategory != null && existingCategory.Id != id)
            throw new Exception("Category name already exists.");

        // Update Entity
        request.Adapt(category);

        category.UpdatedAt = DateTime.UtcNow;

         _categoryRepository.UpdateAsync(category);

        await _categoryRepository.SaveChangesAsync();

        return category.Adapt<CategoryResponse>();
    }

    public async Task DeleteAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);

        if (category == null)
            throw new Exception("Category not found.");

        _categoryRepository.DeleteAsync(category);

        await _categoryRepository.SaveChangesAsync();
    }
}