using AssetIQAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetIQAI.Infrastructure.Data.Configurations;

public class StockTransactionConfiguration
    : IEntityTypeConfiguration<StockTransaction>
{
    public void Configure(EntityTypeBuilder<StockTransaction> builder)
    {
        builder.ToTable("StockTransactions");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Quantity)
               .IsRequired();

        builder.Property(x => x.PreviousQuantity)
               .IsRequired();

        builder.Property(x => x.NewQuantity)
               .IsRequired();

        builder.Property(x => x.TransactionType)
               .HasConversion<int>()
               .IsRequired();

        builder.Property(x => x.Remarks)
               .HasMaxLength(500);

        builder.HasOne(x => x.Product)
               .WithMany(x => x.StockTransactions)
               .HasForeignKey(x => x.ProductId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}