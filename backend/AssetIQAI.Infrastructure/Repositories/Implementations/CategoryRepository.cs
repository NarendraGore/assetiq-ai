using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.Data;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AssetIQAI.Infrastructure.Repositories.Implementations;

public class CategoryRepository
    : GenericRepository<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<Category?> GetByNameAsync(string name)
    {
        return await _context.Categories
            .FirstOrDefaultAsync(c => c.Name == name);
    }

    public async Task<(IEnumerable<Category> Items, int TotalCount)> GetPagedAsync(
        int page,
        int pageSize,
        string? search)
    {
        return await base.GetPagedAsync(
            page,
            pageSize,
            x => string.IsNullOrWhiteSpace(search) ||
                 x.Name.Contains(search),
            x => x.Name);
    }
}