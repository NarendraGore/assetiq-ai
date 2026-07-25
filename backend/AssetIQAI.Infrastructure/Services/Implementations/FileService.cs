using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace AssetIQAI.Infrastructure.Services.Implementations;

public class FileService : IFileService
{
    private readonly string _uploadPath;

    private static readonly string[] AllowedExtensions =
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    };

    private const long MaxFileSize = 5 * 1024 * 1024;

    public FileService(string uploadPath)
    {
        _uploadPath = uploadPath;

        if (!Directory.Exists(_uploadPath))
        {
            Directory.CreateDirectory(_uploadPath);
        }
    }

    public async Task<string> UploadImageAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new Exception("Please select an image.");

        ValidateFile(file);

        var extension = Path.GetExtension(file.FileName);

        var fileName = $"{Guid.NewGuid()}{extension}";

        var filePath = Path.Combine(_uploadPath, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);

        await file.CopyToAsync(stream);

        return $"/uploads/{fileName}";
    }

    public async Task<bool> DeleteImageAsync(string fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
            return false;

        fileName = Path.GetFileName(fileName);

        var filePath = Path.Combine(_uploadPath, fileName);

        if (!File.Exists(filePath))
            return false;

        await Task.Run(() => File.Delete(filePath));

        return true;
    }

    private static void ValidateFile(IFormFile file)
    {
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!AllowedExtensions.Contains(extension))
            throw new Exception("Only JPG, JPEG, PNG and WEBP images are allowed.");

        if (file.Length > MaxFileSize)
            throw new Exception("Image size cannot exceed 5 MB.");
    }
}