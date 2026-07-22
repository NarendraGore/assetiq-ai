using System.Net;
using System.Text.Json;
using AssetIQAI.API.Models;
using FluentValidation;

namespace AssetIQAI.API.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            await HandleException(
                context,
                HttpStatusCode.BadRequest,
                ex.Errors.Select(x => x.ErrorMessage).ToList(),
                "Validation Failed");
        }
        catch (KeyNotFoundException ex)
        {
            await HandleException(
                context,
                HttpStatusCode.NotFound,
                new List<string> { ex.Message },
                "Resource Not Found");
        }
        catch (UnauthorizedAccessException ex)
        {
            await HandleException(
                context,
                HttpStatusCode.Unauthorized,
                new List<string> { ex.Message },
                "Unauthorized");
        }
        catch (InvalidOperationException ex)
        {
            await HandleException(
                context,
                HttpStatusCode.Conflict,
                new List<string> { ex.Message },
                "Conflict");
        }
        catch (Exception ex)
        {
            await HandleException(
                context,
                HttpStatusCode.InternalServerError,
                new List<string> { ex.Message },
                "Internal Server Error");
        }
    }

    private static async Task HandleException(
        HttpContext context,
        HttpStatusCode statusCode,
        List<string> errors,
        string message)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var response = new ApiResponse<object>
        {
            Success = false,
            Message = message,
            Errors = errors
        };

        await context.Response.WriteAsync(
            JsonSerializer.Serialize(response));
    }
}