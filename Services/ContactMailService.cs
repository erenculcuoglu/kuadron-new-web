using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;

namespace Kuadron.Web.Services;

public sealed class SmtpOptions
{
    public string Host { get; set; } = "";
    public int Port { get; set; } = 587;
    public bool EnableSsl { get; set; } = true;
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public string FromEmail { get; set; } = "info@kuadron.com";
    public string FromName { get; set; } = "Kuadron Web İletişim";
    public string ToEmail { get; set; } = "info@kuadron.com";
    public bool SaveToPickupWhenUnconfigured { get; set; } = true;
}

public sealed record ContactSubmission(
    string Name,
    string Email,
    string? Phone,
    string? Message,
    string? CompanyCity,
    string? PageUrl,
    string? ClientIp);

public sealed record ContactSendResult(bool Success, string DeliveryMode, string? ErrorMessage = null);

public sealed class ContactMailService
{
    private readonly IOptionsMonitor<SmtpOptions> _optionsMonitor;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<ContactMailService> _logger;
    private readonly SemaphoreSlim _fileLock = new(1, 1);

    public ContactMailService(
        IOptionsMonitor<SmtpOptions> optionsMonitor,
        IWebHostEnvironment env,
        ILogger<ContactMailService> logger)
    {
        _optionsMonitor = optionsMonitor;
        _env = env;
        _logger = logger;
    }

    public async Task<ContactSendResult> SendAsync(ContactSubmission submission, CancellationToken cancellationToken = default)
    {
        var options = _optionsMonitor.CurrentValue;
        var recipient = string.IsNullOrWhiteSpace(options.ToEmail) ? "info@kuadron.com" : options.ToEmail.Trim();
        var senderEmail = !string.IsNullOrWhiteSpace(options.FromEmail)
            ? options.FromEmail.Trim()
            : (!string.IsNullOrWhiteSpace(options.Username) ? options.Username.Trim() : recipient);
        var senderName = string.IsNullOrWhiteSpace(options.FromName) ? "Kuadron Web İletişim" : options.FromName.Trim();

        var cleanName = SanitizeHeader(submission.Name);
        var cleanEmail = SanitizeHeader(submission.Email);
        var formCategory = !string.IsNullOrWhiteSpace(submission.CompanyCity)
            ? $"Bayilik Başvurusu ({SanitizeHeader(submission.CompanyCity)})"
            : "Hızlı İletişim Formu";

        using var mail = new MailMessage
        {
            From = new MailAddress(senderEmail, senderName, Encoding.UTF8),
            Subject = $"[Kuadron Web] {formCategory} — {cleanName}",
            SubjectEncoding = Encoding.UTF8,
            BodyEncoding = Encoding.UTF8,
            IsBodyHtml = true,
            Body = BuildHtmlBody(submission, formCategory, recipient)
        };

        mail.To.Add(new MailAddress(recipient));

        if (MailAddress.TryCreate(cleanEmail, cleanName, out var replyTo))
        {
            mail.ReplyToList.Add(replyTo);
        }

        var plainView = AlternateView.CreateAlternateViewFromString(
            BuildPlainTextBody(submission, formCategory, recipient),
            Encoding.UTF8,
            "text/plain");
        mail.AlternateViews.Add(plainView);

        string deliveryMode;
        string? error = null;

        if (!string.IsNullOrWhiteSpace(options.Host) && !string.IsNullOrWhiteSpace(options.Password))
        {
            try
            {
                using var client = new SmtpClient(options.Host.Trim(), options.Port)
                {
                    EnableSsl = options.EnableSsl,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Timeout = 15000
                };

                if (!string.IsNullOrWhiteSpace(options.Username))
                {
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(options.Username.Trim(), options.Password);
                }

                await client.SendMailAsync(mail, cancellationToken);
                deliveryMode = "smtp";
                _logger.LogInformation("İletişim formu e-postası SMTP üzerinden {Recipient} adresine gönderildi ({Sender}).", recipient, cleanEmail);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                deliveryMode = "smtp-error";
                _logger.LogError(ex, "SMTP e-posta gönderimi başarısız oldu ({Recipient}). Yerel yedek kaydı alınıyor.", recipient);
                await SaveToPickupDirectoryAsync(mail);
            }
        }
        else if (options.SaveToPickupWhenUnconfigured)
        {
            await SaveToPickupDirectoryAsync(mail);
            deliveryMode = "pickup";
            _logger.LogInformation("SMTP sunucusu veya parolası henüz tanımlanmadığı için e-posta App_Data/mail-pickup klasörüne kaydedildi (Alıcı: {Recipient}).", recipient);
        }
        else
        {
            deliveryMode = "unconfigured";
            error = "SMTP sunucu ayarları yapılandırılmamış.";
        }

        await AppendAuditLogAsync(submission, recipient, deliveryMode, error, cancellationToken);

        var success = deliveryMode == "smtp" || (deliveryMode == "pickup" && options.SaveToPickupWhenUnconfigured);
        return new ContactSendResult(success, deliveryMode, error);
    }

    private Task SaveToPickupDirectoryAsync(MailMessage mail)
    {
        var pickupDir = Path.Combine(_env.ContentRootPath, "App_Data", "mail-pickup");
        Directory.CreateDirectory(pickupDir);

        using var pickupClient = new SmtpClient
        {
            DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory,
            PickupDirectoryLocation = pickupDir
        };
        pickupClient.Send(mail);
        return Task.CompletedTask;
    }

    private async Task AppendAuditLogAsync(
        ContactSubmission submission,
        string recipient,
        string deliveryMode,
        string? error,
        CancellationToken cancellationToken)
    {
        try
        {
            var dataDir = Path.Combine(_env.ContentRootPath, "App_Data");
            Directory.CreateDirectory(dataDir);
            var logPath = Path.Combine(dataDir, "contact-submissions.jsonl");

            var entry = new
            {
                timestampUtc = DateTimeOffset.UtcNow.ToString("O"),
                to = recipient,
                deliveryMode,
                error,
                name = submission.Name,
                email = submission.Email,
                phone = submission.Phone,
                companyCity = submission.CompanyCity,
                message = submission.Message,
                pageUrl = submission.PageUrl,
                clientIp = submission.ClientIp
            };

            var line = JsonSerializer.Serialize(entry) + Environment.NewLine;

            await _fileLock.WaitAsync(cancellationToken);
            try
            {
                await File.AppendAllTextAsync(logPath, line, Encoding.UTF8, cancellationToken);
            }
            finally
            {
                _fileLock.Release();
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "İletişim formu yerel günlük dosyasına yazılamadı.");
        }
    }

    private static string SanitizeHeader(string? input)
    {
        if (string.IsNullOrWhiteSpace(input)) return "";
        return input.Replace("\r", " ").Replace("\n", " ").Trim();
    }

    private static string BuildPlainTextBody(ContactSubmission s, string category, string recipient)
    {
        var sb = new StringBuilder();
        sb.AppendLine($"Kuadron Web Sitesi — {category}");
        sb.AppendLine(new string('=', 48));
        sb.AppendLine($"Alıcı          : {recipient}");
        sb.AppendLine($"Tarih (TR)     : {DateTimeOffset.UtcNow.ToOffset(TimeSpan.FromHours(3)):dd.MM.yyyy HH:mm:ss}");
        sb.AppendLine($"İsim Soyisim   : {s.Name}");
        sb.AppendLine($"E-posta        : {s.Email}");
        if (!string.IsNullOrWhiteSpace(s.Phone))
            sb.AppendLine($"Telefon        : {s.Phone}");
        if (!string.IsNullOrWhiteSpace(s.CompanyCity))
            sb.AppendLine($"Firma / Şehir  : {s.CompanyCity}");
        if (!string.IsNullOrWhiteSpace(s.PageUrl))
            sb.AppendLine($"Kaynak Sayfa   : {s.PageUrl}");
        sb.AppendLine();
        sb.AppendLine("Mesaj / Not:");
        sb.AppendLine(new string('-', 48));
        sb.AppendLine(string.IsNullOrWhiteSpace(s.Message) ? "(Belirtilmedi)" : s.Message.Trim());
        return sb.ToString();
    }

    private static string BuildHtmlBody(ContactSubmission s, string category, string recipient)
    {
        static string E(string? val) => WebUtility.HtmlEncode(val ?? "");
        var trTime = DateTimeOffset.UtcNow.ToOffset(TimeSpan.FromHours(3)).ToString("dd.MM.yyyy HH:mm:ss");
        var extraRow = !string.IsNullOrWhiteSpace(s.CompanyCity)
            ? $"<tr><td style=\"padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:600;\">Firma &amp; Şehir</td><td style=\"padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;\">{E(s.CompanyCity)}</td></tr>"
            : "";

        return $"""
        <!DOCTYPE html>
        <html lang="tr">
        <body style="margin:0;padding:24px;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #cbd5e1;border-top:4px solid #fbb040;border-radius:8px;overflow:hidden;">
            <div style="background:#0b1424;color:#ffffff;padding:16px 20px;">
              <strong style="font-size:16px;letter-spacing:0.04em;">KUADRON WEB İLETİŞİM BİLDİRİMİ</strong>
              <div style="font-size:12px;color:#cbd5e1;margin-top:4px;">{E(category)} · {trTime}</div>
            </div>
            <div style="padding:20px;">
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr>
                  <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:600;width:160px;">İsim ve Soyisim</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:700;">{E(s.Name)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:600;">E-posta Adresi</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><a href="mailto:{E(s.Email)}" style="color:#0284c7;text-decoration:none;font-weight:600;">{E(s.Email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:600;">Telefon</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">{(string.IsNullOrWhiteSpace(s.Phone) ? "-" : E(s.Phone))}</td>
                </tr>
                {extraRow}
                <tr>
                  <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:600;">Alıcı Adres</td>
                  <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">{E(recipient)}</td>
                </tr>
              </table>

              <div style="margin-top:18px;">
                <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#475569;margin-bottom:6px;">Mesaj İçeriği</div>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:14px;font-size:14px;line-height:1.6;white-space:pre-wrap;color:#1e293b;">{E(string.IsNullOrWhiteSpace(s.Message) ? "(Mesaj girilmedi)" : s.Message.Trim())}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
        """;
    }
}

