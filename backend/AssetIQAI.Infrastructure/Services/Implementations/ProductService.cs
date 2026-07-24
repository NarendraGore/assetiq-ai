using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Common;
using AssetIQAI.Infrastructure.DTOs.Product;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Mapster;

namespace AssetIQAI.Infrastructure.Services.Implementations;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly ISupplierRepository _supplierRepository;

    public ProductService(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository,
        ISupplierRepository supplierRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
        _supplierRepository = supplierRepository;
    }

    public async Task<PagedResponse<ProductListResponse>> GetAllAsync(
        ProductFilterRequest request)
    {
        var (items, totalCount) =
            await _productRepository.GetPagedAsync(request);

        return new PagedResponse<ProductListResponse>
        {
            Items = items.Adapt<List<ProductListResponse>>(),
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }

    public async Task<ProductResponse> GetByIdAsync(Guid id)
    {
        var product = await _productRepository.GetByIdAsync(id);

        if (product == null)
            throw new Exception("Product not found.");

        return product.Adapt<ProductResponse>();
    }

    public async Task<ProductResponse> CreateAsync(
        CreateProductRequest request)
    {
        var existing =
            await _productRepository.GetBySkuAsync(request.SKU);

        if (existing != null)
            throw new Exception("SKU already exists.");

        if (!await _categoryRepository.ExistsAsync(request.CategoryId))
            throw new Exception("Category not found.");

        if (!await _supplierRepository.ExistsAsync(request.SupplierId))
            throw new Exception("Supplier not found.");

        if (request.UnitPrice <= 0)
            throw new Exception("Price must be greater than zero.");

        if (request.StockQuantity < 0)
            throw new Exception("Stock cannot be negative.");

        if (request.MinimumStock < 0)
            throw new Exception("Minimum stock cannot be negative.");

        var product = request.Adapt<Product>();

        await _productRepository.AddAsync(product);

        await _productRepository.SaveChangesAsync();

        return product.Adapt<ProductResponse>();
    }

    public async Task<ProductResponse> UpdateAsync(
        Guid id,
        UpdateProductRequest request)
    {
        var product =
            await _productRepository.GetByIdAsync(id);

        if (product == null)
            throw new Exception("Product not found.");

        var existing =
            await _productRepository.GetBySkuAsync(request.SKU);

        if (existing != null &&
            existing.Id != id)
        {
            throw new Exception("SKU already exists.");
        }

        if (!await _categoryRepository.ExistsAsync(request.CategoryId))
            throw new Exception("Category not found.");

        if (!await _supplierRepository.ExistsAsync(request.SupplierId))
            throw new Exception("Supplier not found.");

        if (request.UnitPrice <= 0)
            throw new Exception("Price must be greater than zero.");

        if (request.StockQuantity < 0)
            throw new Exception("Stock cannot be negative.");

        if (request.MinimumStock < 0)
            throw new Exception("Minimum stock cannot be negative.");

        request.Adapt(product);

        product.UpdatedAt = DateTime.UtcNow;

        await _productRepository.UpdateAsync(product);

        await _productRepository.SaveChangesAsync();

        return product.Adapt<ProductResponse>();
    }

    public async Task DeleteAsync(Guid id)
    {
        var product =
            await _productRepository.GetByIdAsync(id);

        if (product == null)
            throw new Exception("Product not found.");

        await _productRepository.DeleteAsync(product);

        await _productRepository.SaveChangesAsync();
    }

    public async Task<IEnumerable<ProductListResponse>>
        GetLowStockAsync()
    {
        var products =
            await _productRepository.GetLowStockAsync();

        return products.Adapt<List<ProductListResponse>>();
    }
}