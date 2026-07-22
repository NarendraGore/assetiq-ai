namespace AssetIQAI.API.Common.Responses;

public static class ApiResponseFactory
{
    public static ApiResponse<T> Success<T>(T data, string message)
    {
        return new ApiResponse<T>
        {
            Success = true,
            Message = message,
            Data = data
        };
    }

    public static ApiResponse<object> Failure(string message, List<string>? errors = null)
    {
        return new ApiResponse<object>
        {
            Success = false,
            Message = message,
            Errors = errors ?? []
        };
    }
}