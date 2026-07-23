

//[ApiController]
//[ApiVersion("1.0")]
//[Route("api/v{version:apiVersion}/[controller]")]
//public class AuthController : ControllerBase
//{
//    private readonly JwtSettings _jwt;

//    public AuthController(IOptions<JwtSettings> options)
//    {
//        _jwt = options.Value;
//    }

//    [HttpPost("token")]
//    public IActionResult GenerateToken()
//    {
//        var claims = new List<Claim>
//        {
//            new(ClaimTypes.NameIdentifier, "1"),
//            new(ClaimTypes.Name, "Narendra"),
//            new(ClaimTypes.Role, "Admin")
//        };

//        var key = new SymmetricSecurityKey(
//            Encoding.UTF8.GetBytes(_jwt.SecretKey));

//        var credentials = new SigningCredentials(
//            key,
//            SecurityAlgorithms.HmacSha256);

//        var token = new JwtSecurityToken(
//            issuer: _jwt.Issuer,
//            audience: _jwt.Audience,
//            claims: claims,
//            expires: DateTime.UtcNow.AddMinutes(_jwt.ExpiryMinutes),
//            signingCredentials: credentials);

//        return Ok(new
//        {
//            Token = new JwtSecurityTokenHandler().WriteToken(token)
//        });
//    }

//    [Authorize]
//    [HttpGet("protected")]
//    public IActionResult Protected()
//    {
//        return Ok("JWT Authentication Working");
//    }

//    [HttpGet]
//    public IActionResult Get()
//    {
//        return Ok("API Version 1");
//    }
//}

using Asp.Versioning;
using AssetIQAI.API.DTOs.Auth;
using AssetIQAI.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AssetIQAI.API.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // ==========================
    // Authentication Endpoints
    // ==========================

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

    // ==========================
    // Authorization Test Endpoints
    // ==========================

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