using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Supplier;

namespace AssetIQAI.Infrastructure.Services.Interfaces;

public interface ISupplierService
{
    Task<PagedResponse<SupplierResponse>> GetAllAsync(PaginationRequest request);

    Task<SupplierResponse> GetByIdAsync(Guid id);

    Task<SupplierResponse> CreateAsync(CreateSupplierRequest request);

    Task<SupplierResponse> UpdateAsync(Guid id, UpdateSupplierRequest request);

    Task DeleteAsync(Guid id);
}