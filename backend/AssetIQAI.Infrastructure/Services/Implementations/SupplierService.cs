using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Supplier;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Mapster;

namespace AssetIQAI.Infrastructure.Services.Implementations;

public class SupplierService : ISupplierService
{
    private readonly ISupplierRepository _supplierRepository;

    public SupplierService(ISupplierRepository supplierRepository)
    {
        _supplierRepository = supplierRepository;
    }

    public async Task<PagedResponse<SupplierResponse>> GetAllAsync(
       PaginationRequest request)
    {
        var (items, totalCount) =
            await _supplierRepository.GetPagedAsync(
                request.Page,
                request.PageSize,
                request.Search);

        return new PagedResponse<SupplierResponse>
        {
            Items = items.Adapt<List<SupplierResponse>>(),
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    public async Task<SupplierResponse> GetByIdAsync(Guid id)
    {
        var supplier = await _supplierRepository.GetByIdAsync(id);

        if (supplier == null)
            throw new Exception("Supplier not found.");

        return supplier.Adapt<SupplierResponse>();
    }

    public async Task<SupplierResponse> CreateAsync(CreateSupplierRequest request)
    {
        var existingSupplier =
            await _supplierRepository.GetByCompanyNameAsync(request.CompanyName);

        if (existingSupplier != null)
            throw new Exception("Supplier already exists.");

        var supplier = request.Adapt<Supplier>();

        await _supplierRepository.AddAsync(supplier);

        await _supplierRepository.SaveChangesAsync();

        return supplier.Adapt<SupplierResponse>();
    }

    public async Task<SupplierResponse> UpdateAsync(
        Guid id,
        UpdateSupplierRequest request)
    {
        var supplier = await _supplierRepository.GetByIdAsync(id);

        if (supplier == null)
            throw new Exception("Supplier not found.");

        var existingSupplier =
            await _supplierRepository.GetByCompanyNameAsync(request.CompanyName);

        if (existingSupplier != null &&
            existingSupplier.Id != id)
        {
            throw new Exception("Supplier already exists.");
        }

        request.Adapt(supplier);

        supplier.UpdatedAt = DateTime.UtcNow;

        _supplierRepository.UpdateAsync(supplier);

        await _supplierRepository.SaveChangesAsync();

        return supplier.Adapt<SupplierResponse>();
    }

    public async Task DeleteAsync(Guid id)
    {
        var supplier = await _supplierRepository.GetByIdAsync(id);

        if (supplier == null)
            throw new Exception("Supplier not found.");

        if (await _supplierRepository.HasProductsAsync(id))
            throw new InvalidOperationException(
                "Cannot delete this supplier because it has products assigned to it. Reassign or delete those products first.");

        _supplierRepository.DeleteAsync(supplier);

        await _supplierRepository.SaveChangesAsync();
    }
}