using Kuadron.Web.Components;
using Kuadron.Web.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<SiteDataService>();
builder.Services.AddRazorComponents();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/404");
    app.UseHsts();
}

app.UseStaticFiles();

// Legacy .html and old slug 301 redirects
var legacyRedirects = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
{
    ["/index.html"] = "/",
    ["/hakkimizda.html"] = "/hakkimizda",
    ["/bayilik.html"] = "/bayilik",
    ["/kariyer.html"] = "/kariyer",
    ["/haberler.html"] = "/haberler",
    ["/yazilim-gelistirme.html"] = "/yazilim-gelistirme",
    ["/urun-gelistirme-ve-pazarlama.html"] = "/urun-gelistirme",
    ["/urun-gelistirme-ve-pazarlama"] = "/urun-gelistirme",
    ["/dijital-donusum-danismanligi.html"] = "/dijital-donusum-ve-yz-danismanligi",
    ["/dijital-donusum-danismanligi"] = "/dijital-donusum-ve-yz-danismanligi",
    ["/cerez-politikasi.html"] = "/cerez-politikasi",
    ["/en/index.html"] = "/en/",
    ["/en/about-us.html"] = "/en/about-us",
    ["/en/franchising.html"] = "/en/franchising",
    ["/en/career.html"] = "/en/career",
    ["/en/news.html"] = "/en/news",
    ["/en/software-development.html"] = "/en/software-development",
    ["/en/product-development-and-marketing.html"] = "/en/product-development",
    ["/en/product-development-and-marketing"] = "/en/product-development",
    ["/en/digital-transformation-consultancy.html"] = "/en/digital-transformation-and-ai-consultancy",
    ["/en/digital-transformation-consultancy"] = "/en/digital-transformation-and-ai-consultancy",
    ["/en/cookie-policy.html"] = "/en/cookie-policy",
};

app.Use(async (context, next) =>
{
    var reqPath = context.Request.Path.Value ?? "/";
    var trimmed = reqPath.Length > 1 ? reqPath.TrimEnd('/') : reqPath;
    if (legacyRedirects.TryGetValue(trimmed, out var target))
    {
        context.Response.Redirect(target, permanent: true);
        return;
    }
    await next();
});

app.UseStatusCodePagesWithReExecute("/404");
app.UseAntiforgery();

app.MapRazorComponents<App>();

app.Run();

