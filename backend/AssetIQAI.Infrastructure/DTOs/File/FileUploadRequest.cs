using Microsoft.AspNetCore.Http;

namespace AssetIQAI.Infrastructure.DTOs.File;

public class FileUploadRequest
{
    public IFormFile File { get; set; } = null!;
}