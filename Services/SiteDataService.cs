using System.Text;
using System.Text.Json;
using Kuadron.Web.Models;

namespace Kuadron.Web.Services;

public sealed class SiteDataService
{
    private readonly SiteContentBundle _siteBundle;
    private readonly PressArchiveBundle _pressBundle;
    private readonly List<BlogPostEntry> _blogPosts;
    private readonly Dictionary<string, (string Label, List<BlogPostEntry> Posts)> _tagMap;

    private static readonly Dictionary<string, string> LegacyBlogAliases = new(StringComparer.OrdinalIgnoreCase)
    {
        ["endustri-4-0-nedir-ve-amaci-nedir"] = "endustri-4-0-nedir",
        ["yazilim-gelistirme-yapan-firmalar"] = "yazilim-firmalari",
    };

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

        _blogPosts = JsonSerializer.Deserialize<List<BlogPostEntry>>(
            File.ReadAllText(Path.Combine(dataDir, "blog-posts.json")), jsonOptions) ?? [];

        _tagMap = BuildTagMap(_blogPosts);
    }

    public const string SiteOrigin = "https://www.kuadron.com";

    public CompanyInfoModel Company => _siteBundle.Company;
    public IReadOnlyList<RoutePairModel> Routes => _siteBundle.Routes;
    public IReadOnlyList<BlogPostEntry> BlogPosts => _blogPosts;

    public string DetectLocale(string pathname) =>
        pathname.StartsWith("/en", StringComparison.OrdinalIgnoreCase) ? "en" : "tr";

    public LocaleSiteContent GetLocale(string lang) =>
        _siteBundle.Content.TryGetValue(lang == "en" ? "en" : "tr", out var content)
            ? content
            : _siteBundle.Content["tr"];

    public IReadOnlyList<PressArchiveItem> GetPressArchive(string lang) =>
        lang == "en" ? _pressBundle.En : _pressBundle.Tr;

    public BlogPostEntry? GetBlogPost(string slug)
    {
        var clean = Uri.UnescapeDataString(slug).Trim('/');
        if (LegacyBlogAliases.TryGetValue(clean, out var targetId))
        {
            clean = targetId;
        }
        return _blogPosts.FirstOrDefault(p => string.Equals(p.Id, clean, StringComparison.OrdinalIgnoreCase));
    }

    public (string Label, List<BlogPostEntry> Posts)? GetPostsByTag(string tagSlug)
    {
        var clean = Uri.UnescapeDataString(tagSlug).Trim('/').ToLowerInvariant();
        if (_tagMap.TryGetValue(clean, out var entry))
        {
            return entry;
        }
        var ascii = ToAsciiSlug(clean);
        if (_tagMap.TryGetValue(ascii, out entry))
        {
            return entry;
        }
        return null;
    }

    public List<(string Slug, string Label, int Count)> GetPopularTags(int count = 14)
    {
        var dict = new Dictionary<string, (string Slug, string Label, int Count)>(StringComparer.OrdinalIgnoreCase);
        foreach (var post in _blogPosts)
        {
            foreach (var tag in post.Tags)
            {
                if (dict.TryGetValue(tag.Slug, out var existing))
                {
                    dict[tag.Slug] = (existing.Slug, existing.Label, existing.Count + 1);
                }
                else
                {
                    dict[tag.Slug] = (tag.Slug, tag.Label, 1);
                }
            }
        }
        return dict.Values.OrderByDescending(x => x.Count).Take(count).ToList();
    }

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
        if (norm.StartsWith("/blog", StringComparison.OrdinalIgnoreCase))
        {
            return targetLang == "tr" ? CanonicalPath(norm) : "/en/";
        }
        return targetLang == "tr" ? "/" : "/en/";
    }

    private static Dictionary<string, (string Label, List<BlogPostEntry> Posts)> BuildTagMap(List<BlogPostEntry> posts)
    {
        var map = new Dictionary<string, (string Label, List<BlogPostEntry> Posts)>(StringComparer.OrdinalIgnoreCase);

        void Register(string slug, string label, BlogPostEntry post)
        {
            if (string.IsNullOrWhiteSpace(slug)) return;
            if (map.TryGetValue(slug, out var existing))
            {
                if (!existing.Posts.Any(p => p.Id == post.Id))
                {
                    existing.Posts.Add(post);
                }
            }
            else
            {
                map[slug] = (label, [post]);
            }
        }

        foreach (var post in posts)
        {
            foreach (var tag in post.Tags)
            {
                Register(tag.Slug, tag.Label, post);
                var ascii = ToAsciiSlug(tag.Slug);
                if (!string.IsNullOrEmpty(ascii) && !string.Equals(ascii, tag.Slug, StringComparison.OrdinalIgnoreCase))
                {
                    Register(ascii, tag.Label, post);
                }
            }
        }

        string[] legacySitemapTags =
        [
            "erp", "kosgeb", "hibe", "destek", "program", "saas", "pandemi",
            "bayi-otomasyon", "bayi", "otomasyon", "kalite", "endustri-4-0"
        ];
        foreach (var lt in legacySitemapTags)
        {
            if (!map.ContainsKey(lt))
            {
                map[lt] = (lt.ToUpperInvariant(), posts.Take(6).ToList());
            }
        }

        return map;
    }

    private static string ToAsciiSlug(string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return "";
        var normalized = input.Normalize(NormalizationForm.FormKD)
            .ToLowerInvariant()
            .Replace('ç', 'c')
            .Replace('ğ', 'g')
            .Replace('ı', 'i')
            .Replace('ö', 'o')
            .Replace('ş', 's')
            .Replace('ü', 'u');

        var sb = new StringBuilder();
        var prevDash = false;
        foreach (var ch in normalized)
        {
            if (char.GetUnicodeCategory(ch) == System.Globalization.UnicodeCategory.NonSpacingMark)
                continue;
            if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9'))
            {
                sb.Append(ch);
                prevDash = false;
            }
            else if (!prevDash && sb.Length > 0)
            {
                sb.Append('-');
                prevDash = true;
            }
        }
        return sb.ToString().Trim('-');
    }
}
