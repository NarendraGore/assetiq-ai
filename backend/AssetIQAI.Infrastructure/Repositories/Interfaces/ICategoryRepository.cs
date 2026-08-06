using AssetIQAI.Domain.Entities;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface ICategoryRepository : IGenericRepository<Category>
{
    Task<Category?> GetByNameAsync(string name);

    /// <summary>
    /// True when at least one product references this category. Used to block
    /// deletion of categories that are still in use.
    /// </summary>
    Task<bool> HasProductsAsync(Guid categoryId);

    Task<(IEnumerable<Category> Items, int TotalCount)> GetPagedAsync(
        int page,
        int pageSize,
        string? search);
}