using AssetIQAI.Infrastructure.DTOs.Supplier;
using FluentValidation;

namespace AssetIQAI.API.Validators.Supplier;

public class UpdateSupplierValidator
    : AbstractValidator<UpdateSupplierRequest>
{
    public UpdateSupplierValidator()
    {
        RuleFor(x => x.CompanyName)
            .NotEmpty()
            .WithMessage("Company name is required.")
            .MaximumLength(150);

        RuleFor(x => x.ContactPerson)
            .MaximumLength(100);

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Phone)
            .MaximumLength(20);

        RuleFor(x => x.Address)
            .MaximumLength(500);
    }
}