using AssetIQAI.Domain.Entities;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface ICategoryRepository : IGenericRepository<Category>
{
    Task<Category?> GetByNameAsync(string name);

    Task<(IEnumerable<Category> Items, int TotalCount)> GetPagedAsync(
        int page,
        int pageSize,
        string? search);
}