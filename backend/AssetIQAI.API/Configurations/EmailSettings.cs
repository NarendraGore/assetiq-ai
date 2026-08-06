namespace AssetIQAI.API.Configurations;

// Documents the shape of the "Email" configuration section used by the
// password-reset flow. The EmailService reads these values from
// IConfiguration directly (matching JwtTokenService), so this class is a
// reference/binding helper and is intentionally kept in the API layer.
public class EmailSettings
{
    public const string SectionName = "Email";

    // When false (or the section is missing), EmailService logs the reset
    // link instead of sending mail, so the app still runs without SMTP creds.
    public bool Enabled { get; set; }

    public string Host { get; set; } = string.Empty;

    public int Port { get; set; } = 587;

    public bool UseSsl { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string FromEmail { get; set; } = string.Empty;

    public string FromName { get; set; } = "AssetIQ AI";
}
