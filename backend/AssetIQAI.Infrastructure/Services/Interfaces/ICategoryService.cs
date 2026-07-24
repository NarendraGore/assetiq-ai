using AssetIQAI.Infrastructure.DTOs.Category;
using AssetIQAI.Infrastructure.DTOs.Common;

namespace AssetIQAI.Infrastructure.Services.Interfaces;

public interface ICategoryService
{
    Task<PagedResponse<CategoryResponse>> GetAllAsync(
        PaginationRequest request);

    Task<CategoryResponse> GetByIdAsync(Guid id);

    Task<CategoryResponse> CreateAsync(CreateCategoryRequest request);

    Task<CategoryResponse> UpdateAsync(
        Guid id,
        UpdateCategoryRequest request);

    Task DeleteAsync(Guid id);
}