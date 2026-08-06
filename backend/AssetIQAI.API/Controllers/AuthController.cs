
using Asp.Versioning;
using AssetIQAI.API.DTOs.Auth;
using AssetIQAI.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssetIQAI.API.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);

        return Ok(new
        {
            Success = true,
            Message = "Registration successful.",
            Data = result
        });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);

        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken(RefreshTokenRequest request)
    {
        var result = await _authService.RefreshTokenAsync(request);

        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest request)
    {
        await _authService.ForgotPasswordAsync(request);

        return Ok(new
        {
            Success = true,
            Message = "If an account exists for that email, a password reset link has been sent."
        });
    }

    [AllowAnonymous]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
    {
        await _authService.ResetPasswordAsync(request);

        return Ok(new
        {
            Success = true,
            Message = "Password has been reset successfully."
        });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout(LogoutRequest request)
    {
        await _authService.LogoutAsync(request.RefreshToken);

        return Ok(new
        {
            Success = true,
            Message = "Logout successful."
        });
    }

    [AllowAnonymous]
    [HttpGet("public")]
    public IActionResult Public()
    {
        return Ok("Public Endpoint - No Authentication Required");
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult Profile()
    {
        return Ok(new
        {
            Message = "Authenticated User",
            User = User.Identity?.Name,
            Role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value
        });
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public IActionResult Admin()
    {
        return Ok("Welcome Admin");
    }

    [Authorize(Roles = "Manager")]
    [HttpGet("manager")]
    public IActionResult Manager()
    {
        return Ok("Welcome Manager");
    }

    [Authorize(Roles = "Employee")]
    [HttpGet("employee")]
    public IActionResult Employee()
    {
        return Ok("Welcome Employee");
    }

    [Authorize(Roles = "Admin,Manager")]
    [HttpGet("reports")]
    public IActionResult Reports()
    {
        return Ok("Reports accessible by Admin and Manager only.");
    }
}