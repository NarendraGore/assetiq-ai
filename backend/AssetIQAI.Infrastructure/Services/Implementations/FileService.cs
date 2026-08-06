using System.Net.Http.Headers;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace AssetIQAI.Infrastructure.Services.Implementations;

/// <summary>
/// Stores images in Supabase Storage via its REST API. Local disk is
/// ephemeral on free hosts (Railway, Render), so images must live in
/// durable object storage instead.
/// </summary>
public class FileService : IFileService
{
    private readonly HttpClient _httpClient;
    private readonly string _bucket;

    private static readonly string[] AllowedExtensions =
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    };

    private const long MaxFileSize = 5 * 1024 * 1024;

    public FileService(HttpClient httpClient, IConfiguration configuration)
    {
        var url = configuration["Supabase:Url"];
        var serviceRoleKey = configuration["Supabase:ServiceRoleKey"];
        _bucket = configuration["Supabase:Bucket"] ?? "uploads";

        if (string.IsNullOrWhiteSpace(url) || string.IsNullOrWhiteSpace(serviceRoleKey))
        {
            throw new InvalidOperationException(
                "Supabase Storage is not configured. Set Supabase__Url, " +
                "Supabase__ServiceRoleKey and (optionally) Supabase__Bucket.");
        }

        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri(url.TrimEnd('/') + "/");
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", serviceRoleKey);
    }

    public async Task<string> UploadImageAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new Exception("Please select an image.");

        ValidateFile(file);

        var extension = Path.GetExtension(file.FileName);

        var fileName = $"{Guid.NewGuid()}{extension}";

        await using var stream = file.OpenReadStream();

        using var content = new StreamContent(stream);

        content.Headers.ContentType =
            new MediaTypeHeaderValue(GetMimeType(extension));

        var response = await _httpClient.PostAsync(
            $"storage/v1/object/{_bucket}/{fileName}",
            content);

        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync();

            throw new Exception(
                $"Failed to upload image: {(int)response.StatusCode} {body}");
        }

        // Bucket is expected to be public, so the URL is directly fetchable.
        return $"{_httpClient.BaseAddress}storage/v1/object/public/{_bucket}/{fileName}";
    }

    public async Task<bool> DeleteImageAsync(string fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
            return false;

        var objectName = ResolveObjectName(fileName);

        if (string.IsNullOrWhiteSpace(objectName))
            return false;

        var response = await _httpClient.DeleteAsync(
            $"storage/v1/object/{_bucket}/{objectName}");

        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            return false;

        return response.IsSuccessStatusCode;
    }

    /// <summary>
    /// Accepts either a bare file name ("abc.png") or a full Supabase public
    /// URL, and reduces it to the object name stored under the bucket.
    /// </summary>
    private static string? ResolveObjectName(string value)
    {
        var uri = Uri.TryCreate(value, UriKind.Absolute, out var parsed)
            ? parsed
            : null;

        var raw = uri?.AbsolutePath ?? value;

        const string marker = "/object/";

        var idx = raw.LastIndexOf(marker, StringComparison.OrdinalIgnoreCase);

        var path = idx >= 0 ? raw[(idx + marker.Length)..] : raw.TrimStart('/');

        return Path.GetFileName(path);
    }

    private static void ValidateFile(IFormFile file)
    {
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!AllowedExtensions.Contains(extension))
            throw new Exception("Only JPG, JPEG, PNG and WEBP images are allowed.");

        if (file.Length > MaxFileSize)
            throw new Exception("Image size cannot exceed 5 MB.");
    }

    private static string GetMimeType(string extension) =>
        extension.ToLowerInvariant() switch
        {
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".webp" => "image/webp",
            _ => "application/octet-stream"
        };
}
