using AssetIQAI.Infrastructure.DTOs.Stock;
using FluentValidation;

namespace AssetIQAI.API.Validators.Stock;

public class CreateStockOutValidator : AbstractValidator<StockOutRequest>
{
    public CreateStockOutValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty()
            .WithMessage("Product is required.");

        RuleFor(x => x.Quantity)
            .GreaterThan(0)
            .WithMessage("Quantity must be greater than zero.");

        RuleFor(x => x.Remarks)
            .MaximumLength(500)
            .WithMessage("Remarks cannot exceed 500 characters.");
    }
}