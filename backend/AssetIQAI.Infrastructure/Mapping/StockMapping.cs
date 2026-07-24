using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.DTOs.Stock;
using Mapster;

namespace AssetIQAI.Infrastructure.Mappings;

public static class StockMapping
{
    public static void Register()
    {
        TypeAdapterConfig<Product, InventoryResponse>
            .NewConfig()
            .Map(dest => dest.ProductId, src => src.Id)
            .Map(dest => dest.ProductName, src => src.Name)
            .Map(dest => dest.CurrentStock, src => src.StockQuantity)
            .Map(dest => dest.MinimumStock, src => src.MinimumStock)
            .Map(dest => dest.IsLowStock,
                src => src.StockQuantity <= src.MinimumStock);

        TypeAdapterConfig<StockTransaction, StockTransactionResponse>
            .NewConfig()
            .Map(dest => dest.TransactionId, src => src.Id)
            .Map(dest => dest.ProductName, src => src.Product.Name);
    }
}