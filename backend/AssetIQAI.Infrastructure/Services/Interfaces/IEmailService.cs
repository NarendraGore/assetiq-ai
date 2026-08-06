namespace AssetIQAI.Infrastructure.Services.Interfaces;

public interface IEmailService
{
    Task SendPasswordResetEmailAsync(
        string toEmail,
        string recipientName,
        string resetLink);

    Task SendRegistrationSuccessEmailAsync(
        string toEmail,
        string recipientName);
}
