using System.ComponentModel.DataAnnotations;

namespace AssetIQAI.API.DTOs.Auth;

public class RefreshTokenRequest
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}