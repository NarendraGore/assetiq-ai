using AssetIQAI.Infrastructure.Services.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;

namespace AssetIQAI.Infrastructure.Services.Implementations;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(
        IConfiguration configuration,
        ILogger<EmailService> logger)
    {
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
            textBody: textBody,
            fallbackLogMessage:
                "Password reset link for {Email}: " + resetLink);
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
            textBody: textBody,
            fallbackLogMessage:
                "Registration success email skipped for {Email}.");
    }

    private async Task SendMessageAsync(
        string toEmail,
        string recipientName,
        string subject,
        string htmlBody,
        string textBody,
        string fallbackLogMessage)
    {
        var emailSettings = _configuration.GetSection("Email");

        var enabled = bool.TryParse(emailSettings["Enabled"], out var isEnabled) && isEnabled;
        if (!enabled)
        {
            _logger.LogWarning(
                "Email sending is disabled. " + fallbackLogMessage,
                toEmail);

            return;
        }

        var host = emailSettings["Host"];
        var port = int.TryParse(emailSettings["Port"], out var parsedPort) ? parsedPort : 587;
        var useSsl = bool.TryParse(emailSettings["UseSsl"], out var parsedUseSsl) && parsedUseSsl;
        var username = emailSettings["Username"];
        var password = emailSettings["Password"];

        var fromEmail = emailSettings["FromEmail"];
        if (string.IsNullOrWhiteSpace(fromEmail))
        {
            fromEmail = username;
        }

        var fromName = emailSettings["FromName"] ?? "AssetIQ AI";

        if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(fromEmail))
        {


            _logger.LogWarning(
                "Email is enabled but Host/FromEmail are not configured. " + fallbackLogMessage,
                toEmail);

            return;
        }

        var message = new MimeMessage();

        message.From.Add(new MailboxAddress(fromName, fromEmail));
        message.To.Add(new MailboxAddress(recipientName, toEmail));
        message.Subject = subject;

        message.Body = new BodyBuilder
        {
            HtmlBody = htmlBody,
            TextBody = textBody
        }.ToMessageBody();

        using var client = new SmtpClient();

        var secureOption = (useSsl || port == 465)
            ? SecureSocketOptions.SslOnConnect
            : SecureSocketOptions.StartTls;

        await client.ConnectAsync(host, port, secureOption);

        if (!string.IsNullOrWhiteSpace(username))
        {
            await client.AuthenticateAsync(username, password);
        }

        await client.SendAsync(message);
        await client.DisconnectAsync(true);

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
