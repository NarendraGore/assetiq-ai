using AssetIQAI.Infrastructure.DTOs.Category;
using FluentValidation;

namespace AssetIQAI.API.Validators.Category;

public class UpdateCategoryValidator
    : AbstractValidator<UpdateCategoryRequest>
{
    public UpdateCategoryValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Category name is required.")
            .MaximumLength(100);

        RuleFor(x => x.Description)
            .MaximumLength(500);
    }
}