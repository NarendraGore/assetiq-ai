using AssetIQAI.Infrastructure.DTOs.File;
using FluentValidation;
using System.IO;

namespace AssetIQAI.API.Validators.File;

public class FileUploadValidator
    : AbstractValidator<FileUploadRequest>
{
    private static readonly string[] AllowedExtensions =
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    };

    private const long MaxFileSize = 5 * 1024 * 1024;

    public FileUploadValidator()
    {
        RuleFor(x => x.File)
            .NotNull()
            .WithMessage("Image is required.");

        RuleFor(x => x.File.Length)
            .LessThanOrEqualTo(MaxFileSize)
            .WithMessage("Maximum image size is 5 MB.");

        RuleFor(x => Path.GetExtension(x.File.FileName).ToLower())
            .Must(ext => AllowedExtensions.Contains(ext))
            .WithMessage("Only JPG, JPEG, PNG and WEBP images are allowed.");
    }
}