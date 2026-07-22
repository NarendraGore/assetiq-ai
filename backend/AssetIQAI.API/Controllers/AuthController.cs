using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Asp.Versioning;
using AssetIQAI.API.Configurations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AssetIQAI.API.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtSettings _jwt;

    public AuthController(IOptions<JwtSettings> options)
    {
        _jwt = options.Value;
    }

    [HttpPost("token")]
    public IActionResult GenerateToken()
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, "1"),
            new(ClaimTypes.Name, "Narendra"),
            new(ClaimTypes.Role, "Admin")
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_jwt.SecretKey));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwt.ExpiryMinutes),
            signingCredentials: credentials);

        return Ok(new
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token)
        });
    }

    [Authorize]
    [HttpGet("protected")]
    public IActionResult Protected()
    {
        return Ok("JWT Authentication Working");
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok("API Version 1");
    }
}