using Microsoft.AspNetCore.Http;

namespace AssetIQAI.Infrastructure.Services.Interfaces;

public interface IFileService
{
    Task<string> UploadImageAsync(IFormFile file);

    Task<bool> DeleteImageAsync(string fileName);
}