using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Supplier;
using Mapster;

namespace AssetIQAI.Infrastructure.Mapping;

public static class SupplierMapping
{
    public static void Register()
    {
        TypeAdapterConfig<Supplier, SupplierResponse>
            .NewConfig()
            .Map(dest => dest.ProductCount,
                src => src.Products != null ? src.Products.Count : 0);
    }
}
