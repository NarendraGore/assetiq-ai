using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Category;
using Mapster;

namespace AssetIQAI.Infrastructure.Mapping;

public static class CategoryMapping
{
    public static void Register()
    {
        TypeAdapterConfig<Category, CategoryResponse>
            .NewConfig()
            .Map(dest => dest.ProductCount,
                src => src.Products != null ? src.Products.Count : 0);
    }
}
