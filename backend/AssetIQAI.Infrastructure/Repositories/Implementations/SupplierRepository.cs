using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.Data;
using AssetIQAI.Infrastructure.Repositories.Interfaces;

namespace AssetIQAI.Infrastructure.Repositories.Implementations;

public class SupplierRepository
    : GenericRepository<Supplier>, ISupplierRepository
{
    public SupplierRepository(ApplicationDbContext context)
        : base(context)
    {
    }
}