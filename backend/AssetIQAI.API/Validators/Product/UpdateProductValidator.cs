using AssetIQAI.Infrastructure.DTOs.Product;
using FluentValidation;

namespace AssetIQAI.API.Validators.Product;

public class UpdateProductValidator
    : AbstractValidator<UpdateProductRequest>
{
    public UpdateProductValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(150);

        RuleFor(x => x.SKU)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(x => x.CategoryId)
            .NotEmpty();

        RuleFor(x => x.SupplierId)
            .NotEmpty();

        RuleFor(x => x.UnitPrice)
            .GreaterThan(0);

        RuleFor(x => x.StockQuantity)
            .GreaterThanOrEqualTo(0);

        RuleFor(x => x.MinimumStock)
            .GreaterThanOrEqualTo(0);

        RuleFor(x => x.ImageUrl)
            .MaximumLength(500)
            .When(x => !string.IsNullOrWhiteSpace(x.ImageUrl));
    }
}