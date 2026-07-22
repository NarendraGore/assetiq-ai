namespace AssetIQAI.API.Common.Responses;

public class ValidationErrorResponse : ErrorResponse
{
    public Dictionary<string, string[]> ValidationErrors { get; set; } = [];
}