namespace AssetIQAI.API.Common.Responses;

public class ErrorResponse
{
    public bool Success { get; set; } = false;

    public string Message { get; set; } = string.Empty;

    public List<string> Errors { get; set; } = [];

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}