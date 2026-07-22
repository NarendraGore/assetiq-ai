using AssetIQAI.API.DTOs.Product;
using FluentValidation;

namespace AssetIQAI.API.Validators;

public class ProductValidator : AbstractValidator<CreateProductRequest>
{
    public ProductValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Price)
            .GreaterThan(0);

        RuleFor(x => x.Quantity)
            .GreaterThanOrEqualTo(0);
    }
}