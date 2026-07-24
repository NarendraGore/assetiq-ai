using AssetIQAI.Infrastructure.DTOs.Stock;
using FluentValidation;

namespace AssetIQAI.API.Validators.Stock;

public class StockAdjustmentValidator : AbstractValidator<StockAdjustmentRequest>
{
    public StockAdjustmentValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty()
            .WithMessage("Product is required.");

        RuleFor(x => x.NewQuantity)
            .GreaterThanOrEqualTo(0)
            .WithMessage("New quantity cannot be negative.");

        RuleFor(x => x.Remarks)
            .MaximumLength(500)
            .WithMessage("Remarks cannot exceed 500 characters.");
    }
}