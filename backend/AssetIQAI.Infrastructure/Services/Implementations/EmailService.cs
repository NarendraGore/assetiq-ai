using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using AssetIQAI.Infrastructure.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AssetIQAI.Infrastructure.Services.Implementations;

public class EmailService : IEmailService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(
        HttpClient httpClient,
        IConfiguration configuration,
        ILogger<EmailService> logger)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendPasswordResetEmailAsync(
        string toEmail,
        string recipientName,
        string resetLink)
    {
        var textBody =
            $"Hi {recipientName},\n\n" +
            "We received a request to reset your AssetIQ AI password.\n" +
            $"Use the link below to choose a new password:\n\n{resetLink}\n\n" +
            "This link expires in 1 hour. If you did not request this, " +
            "you can safely ignore this email.";

        await SendMessageAsync(
            toEmail,
            recipientName,
            subject: "Reset your AssetIQ AI password",
            htmlBody: BuildPasswordResetHtmlBody(recipientName, resetLink),
            textBody: textBody);
    }

    public async Task SendRegistrationSuccessEmailAsync(
        string toEmail,
        string recipientName)
    {
        var textBody =
            $"Hi {recipientName},\n\n" +
            "Welcome to AssetIQ AI! Your account has been created successfully.\n" +
            "You can now sign in and start managing your assets and inventory.\n\n" +
            "If you did not create this account, please ignore this email.";

        var frontendBaseUrl =
            _configuration["App:FrontendBaseUrl"] ?? "http://localhost:3000";

        await SendMessageAsync(
            toEmail,
            recipientName,
            subject: "Welcome to AssetIQ AI",
            htmlBody: BuildWelcomeHtmlBody(recipientName, frontendBaseUrl),
            textBody: textBody);
    }

    private async Task SendMessageAsync(
        string toEmail,
        string recipientName,
        string subject,
        string htmlBody,
        string textBody)
    {
        var emailSettings = _configuration.GetSection("Email");

        var enabled = bool.TryParse(emailSettings["Enabled"], out var isEnabled) && isEnabled;
        if (!enabled)
        {
            _logger.LogWarning(
                "Email sending is disabled. Skipping email to {Email}.",
                toEmail);

            return;
        }

        var apiKey = emailSettings["ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            _logger.LogWarning(
                "Email is enabled but Brevo API key is not configured. Skipping email to {Email}.",
                toEmail);

            return;
        }

        var fromEmail = emailSettings["FromEmail"];
        if (string.IsNullOrWhiteSpace(fromEmail))
        {
            _logger.LogWarning(
                "Email is enabled but FromEmail is not configured. Skipping email to {Email}.",
                toEmail);

            return;
        }

        var fromName = emailSettings["FromName"] ?? "AssetIQ AI";

        var payload = new
        {
            sender = new { name = fromName, email = fromEmail },
            to = new[] { new { name = recipientName, email = toEmail } },
            subject,
            htmlContent = htmlBody,
            textContent = textBody
        };

        using var request = new HttpRequestMessage(
            HttpMethod.Post,
            "https://api.brevo.com/v3/smtp/email");

        request.Headers.Add("api-key", apiKey);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        request.Content = new StringContent(
            JsonSerializer.Serialize(payload),
            Encoding.UTF8,
            "application/json");

        using var response = await _httpClient.SendAsync(request);

        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync();

            _logger.LogError(
                "Brevo send failed for {Email}: {StatusCode} {Error}",
                toEmail,
                (int)response.StatusCode,
                errorBody);

            return;
        }

        _logger.LogInformation(
            "Email '{Subject}' sent to {Email}.",
            subject,
            toEmail);
    }

    private static string BuildPasswordResetHtmlBody(string recipientName, string resetLink)
    {
        return $@"
<div style=""font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;"">
  <h2 style=""color: #111827;"">Reset your password</h2>
  <p style=""color: #374151;"">Hi {recipientName},</p>
  <p style=""color: #374151;"">
    We received a request to reset your AssetIQ AI password.
    Click the button below to choose a new one.
  </p>
  <p style=""text-align: center; margin: 32px 0;"">
    <a href=""{resetLink}""
       style=""background-color: #4f46e5; color: #ffffff; padding: 12px 24px;
              border-radius: 8px; text-decoration: none; display: inline-block;"">
      Reset Password
    </a>
  </p>
  <p style=""color: #6b7280; font-size: 13px;"">
    This link expires in 1 hour. If you did not request a password reset,
    you can safely ignore this email.
  </p>
</div>";
    }

    private static string BuildWelcomeHtmlBody(
        string recipientName,
        string frontendBaseUrl)
    {
        var loginUrl = $"{frontendBaseUrl.TrimEnd('/')}/login";

        return $@"
<div style=""font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;"">
  <h2 style=""color: #111827;"">Welcome to AssetIQ AI 🎉</h2>
  <p style=""color: #374151;"">Hi {recipientName},</p>
  <p style=""color: #374151;"">
    Your account has been created successfully. You can now sign in and start
    managing your assets and inventory with AssetIQ AI.
  </p>
  <p style=""text-align: center; margin: 32px 0;"">
    <a href=""{loginUrl}""
       style=""background-color: #4f46e5; color: #ffffff; padding: 12px 24px;
              border-radius: 8px; text-decoration: none; display: inline-block;"">
      Sign In
    </a>
  </p>
  <p style=""color: #6b7280; font-size: 13px;"">
    If you did not create this account, you can safely ignore this email.
  </p>
</div>";
    }
}
