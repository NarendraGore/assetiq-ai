using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Product;
using Mapster;

namespace AssetIQAI.Infrastructure.Mapping;

public static class ProductMapping
{
    public static void Register()
    {
        TypeAdapterConfig<Product, ProductResponse>
            .NewConfig()
            .Map(dest => dest.CategoryName,
                src => src.Category.Name)
            .Map(dest => dest.SupplierName,
                src => src.Supplier.CompanyName);

        TypeAdapterConfig<Product, ProductListResponse>
            .NewConfig()
            .Map(dest => dest.CategoryName,
                src => src.Category.Name)
            .Map(dest => dest.SupplierName,
                src => src.Supplier.CompanyName);
    }
}