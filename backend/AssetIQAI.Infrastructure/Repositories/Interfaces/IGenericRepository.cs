using System.Linq.Expressions;
using AssetIQAI.Domain.Entities;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id);

    Task<(IEnumerable<T> Items, int TotalCount)> GetPagedAsync(
     int page,
     int pageSize,
     Expression<Func<T, bool>>? predicate = null,
     Expression<Func<T, object>>? orderBy = null);

    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);

    Task AddAsync(T entity);

    Task UpdateAsync(T entity);

    Task DeleteAsync(T entity);

    Task<bool> ExistsAsync(Guid id);

    Task SaveChangesAsync();
}