using AssetIQAI.Infrastructure.DTOs.Reports;
using FluentValidation;

namespace AssetIQAI.API.Validators.Reports;

public class ReportFilterValidator : AbstractValidator<ReportFilterRequest>
{
    public ReportFilterValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThan(0)
            .WithMessage("Page must be greater than 0.");

        RuleFor(x => x.PageSize)
            .GreaterThan(0)
            .WithMessage("PageSize must be greater than 0.");

        RuleFor(x => x)
            .Must(x =>
                !x.FromDate.HasValue ||
                !x.ToDate.HasValue ||
                x.FromDate <= x.ToDate)
            .WithMessage("FromDate must be less than or equal to ToDate.");
    }
}