using System.Text.Json;
using Kuadron.Web.Models;

namespace Kuadron.Web.Services;

public sealed class SiteDataService
{
    public const string SiteOrigin = "https://www.kuadron.com";

    private readonly SiteContentBundle _siteBundle;
    private readonly PressArchiveBundle _pressBundle;

    public SiteDataService(IWebHostEnvironment env)
    {
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var dataDir = Path.Combine(env.ContentRootPath, "Data");
        _siteBundle = JsonSerializer.Deserialize<SiteContentBundle>(
            File.ReadAllText(Path.Combine(dataDir, "site-content.json")), jsonOptions) ?? new();

        _pressBundle = JsonSerializer.Deserialize<PressArchiveBundle>(
            File.ReadAllText(Path.Combine(dataDir, "press-archive.json")), jsonOptions) ?? new();
    }

    public CompanyInfoModel Company => _siteBundle.Company;
    public IReadOnlyList<RoutePairModel> Routes => _siteBundle.Routes;

    public string DetectLocale(string pathname) =>
        pathname.StartsWith("/en", StringComparison.OrdinalIgnoreCase) ? "en" : "tr";

    public LocaleSiteContent GetLocale(string lang) =>
        _siteBundle.Content.TryGetValue(lang == "en" ? "en" : "tr", out var content)
            ? content
            : _siteBundle.Content["tr"];

    public IReadOnlyList<PressArchiveItem> GetPressArchive(string lang) =>
        lang == "en" ? _pressBundle.En : _pressBundle.Tr;

    public static string NormalizePath(string path)
    {
        if (string.IsNullOrWhiteSpace(path)) return "/";
        var clean = path.Split('?', '#')[0].TrimEnd('/');
        return string.IsNullOrEmpty(clean) ? "/" : clean;
    }

    public static string CanonicalPath(string path)
    {
        var norm = NormalizePath(path);
        return norm == "/" || norm.EndsWith(".html", StringComparison.OrdinalIgnoreCase) ? norm : $"{norm}/";
    }

    public bool HasBilingualAlternate(string pathname)
    {
        var norm = NormalizePath(pathname);
        return _siteBundle.Routes.Any(pair =>
            string.Equals(NormalizePath(pair.Tr), norm, StringComparison.OrdinalIgnoreCase) ||
            string.Equals(NormalizePath(pair.En), norm, StringComparison.OrdinalIgnoreCase));
    }

    public string GetAlternateUrl(string pathname, string targetLang)
    {
        var norm = NormalizePath(pathname);
        foreach (var pair in _siteBundle.Routes)
        {
            if (string.Equals(NormalizePath(pair.Tr), norm, StringComparison.OrdinalIgnoreCase) ||
                string.Equals(NormalizePath(pair.En), norm, StringComparison.OrdinalIgnoreCase))
            {
                return targetLang == "tr" ? pair.Tr : pair.En;
            }
        }
        return targetLang == "tr" ? "/" : "/en/";
    }
}
