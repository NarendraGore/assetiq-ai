using System.Security.Cryptography;
using System.Text;
using AssetIQAI.API.DTOs.Auth;
using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.Data;
using AssetIQAI.Infrastructure.Repositories.Implementations;
using AssetIQAI.Infrastructure.Repositories.Interfaces;
using AssetIQAI.Infrastructure.Security;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AssetIQAI.API.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IPasswordResetTokenRepository _passwordResetTokenRepository;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        IJwtTokenService jwtTokenService,
        IRefreshTokenRepository refreshTokenRepository,
        IPasswordResetTokenRepository passwordResetTokenRepository,
        IEmailService emailService,
        IConfiguration configuration,
        ApplicationDbContext context,
        ILogger<AuthService> logger)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenService = jwtTokenService;
        _refreshTokenRepository = refreshTokenRepository;
        _passwordResetTokenRepository = passwordResetTokenRepository;
        _emailService = emailService;
        _configuration = configuration;
        _context = context;
        _logger = logger;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        // Validate password confirmation
        if (request.Password != request.ConfirmPassword)
        {
            throw new Exception("Password and Confirm Password do not match.");
        }

        // Check if email already exists
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);

        if (existingUser != null)
        {
            throw new Exception("Email already exists.");
        }

        // Get Admin role
        var adminRole = await _context.Roles
            .FirstOrDefaultAsync(r => r.Name == "Admin");

        if (adminRole == null)
        {
            throw new Exception("Admin role not found. Please run the role seeder.");
        }

        // Create user
        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            PasswordHash = _passwordHasher.HashPassword(request.Password),
            IsActive = true,
            EmailVerified = false,
            RoleId = adminRole.Id,
            Role = adminRole
        };

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

        // Send welcome email (non-blocking: registration must succeed even if email fails)
        try
        {
            await _emailService.SendRegistrationSuccessEmailAsync(
                user.Email,
                $"{user.FirstName} {user.LastName}");
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Failed to send registration email to {Email}. Registration succeeded.",
                user.Email);
        }

        // Generate Tokens
        var accessToken = _jwtTokenService.GenerateAccessToken(user);
        var refreshToken = _jwtTokenService.GenerateRefreshToken();

        return new AuthResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            Expiration = DateTime.UtcNow.AddHours(1),
            User = new UserResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = adminRole.Name
            }
        };
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);

        if (user == null)
        {
            throw new Exception("Invalid email or password.");
        }

        if (!user.IsActive)
        {
            throw new Exception("User account is inactive.");
        }

        var isValidPassword = _passwordHasher.VerifyPassword(
            user.PasswordHash,
            request.Password);

        if (!isValidPassword)
        {
            throw new Exception("Invalid email or password.");
        }

        var accessToken = _jwtTokenService.GenerateAccessToken(user);
        var refreshToken = _jwtTokenService.GenerateRefreshToken();

        var token = new RefreshToken
        {
            Token = refreshToken,
            UserId = user.Id,
            ExpiryDate = DateTime.UtcNow.AddDays(7),
            IsRevoked = false
        };

        await _refreshTokenRepository.AddAsync(token);
        await _refreshTokenRepository.SaveChangesAsync();

        return new AuthResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            Expiration = DateTime.UtcNow.AddHours(1),
            User = new UserResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role?.Name ?? "Employee"
            }
        };
    }

    public async Task<AuthResponse> RefreshTokenAsync(
    RefreshTokenRequest request)
    {
        var storedToken =
            await _refreshTokenRepository.GetByTokenAsync(request.RefreshToken);

        if (storedToken == null)
            throw new Exception("Invalid refresh token.");

        if (storedToken.IsRevoked)
            throw new Exception("Refresh token revoked.");

        if (storedToken.ExpiryDate < DateTime.UtcNow)
            throw new Exception("Refresh token expired.");

        var user = storedToken.User!;

        var newAccessToken =
            _jwtTokenService.GenerateAccessToken(user);

        var newRefreshToken =
            _jwtTokenService.GenerateRefreshToken();

        storedToken.Token = newRefreshToken;
        storedToken.ExpiryDate = DateTime.UtcNow.AddDays(7);

        await _refreshTokenRepository.SaveChangesAsync();

        return new AuthResponse
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            Expiration = DateTime.UtcNow.AddHours(1),

            User = new UserResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role?.Name ?? "Employee"
            }
        };
    }

    public async Task ForgotPasswordAsync(ForgotPasswordRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);

        // Non-enumeration: if the email is unknown or the account is inactive
        // we return normally without revealing that. The controller always
        // responds with the same generic message.
        if (user == null || !user.IsActive)
        {
            return;
        }

        // Invalidate any earlier unused reset tokens so only the newest link works.
        await _passwordResetTokenRepository
            .InvalidateActiveTokensForUserAsync(user.Id);

        // Raw token goes to the user; only its hash is stored.
        var rawToken = GenerateSecureToken();

        var resetToken = new PasswordResetToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = HashToken(rawToken),
            ExpiryDate = DateTime.UtcNow.AddHours(1),
            IsUsed = false
        };

        await _passwordResetTokenRepository.AddAsync(resetToken);
        await _passwordResetTokenRepository.SaveChangesAsync();

        var frontendBaseUrl =
            _configuration["App:FrontendBaseUrl"] ?? "http://localhost:3000";

        var resetLink =
            $"{frontendBaseUrl.TrimEnd('/')}/reset-password?token={Uri.EscapeDataString(rawToken)}";

        await _emailService.SendPasswordResetEmailAsync(
            user.Email,
            $"{user.FirstName} {user.LastName}",
            resetLink);
    }

    public async Task ResetPasswordAsync(ResetPasswordRequest request)
    {
        if (request.Password != request.ConfirmPassword)
        {
            throw new Exception("Password and Confirm Password do not match.");
        }

        var tokenHash = HashToken(request.Token);

        var storedToken =
            await _passwordResetTokenRepository.GetByTokenHashAsync(tokenHash);

        if (storedToken == null || storedToken.IsUsed)
        {
            throw new Exception("Invalid or already used reset token.");
        }

        if (storedToken.ExpiryDate < DateTime.UtcNow)
        {
            throw new Exception("Reset token has expired.");
        }

        var user = storedToken.User
            ?? await _userRepository.GetByIdAsync(storedToken.UserId);

        if (user == null || !user.IsActive)
        {
            throw new Exception("Invalid or already used reset token.");
        }

        // Update password and consume the token in a single save.
        user.PasswordHash = _passwordHasher.HashPassword(request.Password);
        user.UpdatedAt = DateTime.UtcNow;

        storedToken.IsUsed = true;

        await _userRepository.UpdateAsync(user);
        await _passwordResetTokenRepository.UpdateAsync(storedToken);
        await _passwordResetTokenRepository.SaveChangesAsync();

        // Revoke existing refresh tokens so old sessions can't outlive a reset.
        var activeRefreshTokens = await _context.RefreshTokens
            .Where(x => x.UserId == user.Id && !x.IsRevoked)
            .ToListAsync();

        foreach (var token in activeRefreshTokens)
        {
            token.IsRevoked = true;
        }

        await _context.SaveChangesAsync();
    }

    // Cryptographically strong, URL-safe token handed to the user.
    private static string GenerateSecureToken()
    {
        var randomBytes = new byte[32];

        using var rng = RandomNumberGenerator.Create();

        rng.GetBytes(randomBytes);

        return Convert.ToBase64String(randomBytes)
            .Replace("+", "-")
            .Replace("/", "_")
            .Replace("=", string.Empty);
    }

    // Only the SHA-256 hash is ever stored, so a DB leak cannot reset passwords.
    private static string HashToken(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));

        return Convert.ToHexString(bytes);
    }

    public async Task LogoutAsync(string refreshToken)
    {
        var token = await _refreshTokenRepository
            .GetByTokenAsync(refreshToken);

        if (token == null)
            throw new Exception("Refresh token not found.");

        token.IsRevoked = true;

        await _refreshTokenRepository.SaveChangesAsync();
    }
}