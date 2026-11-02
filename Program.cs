using System.Net.Mail;
using Kuadron.Web.Components;
using Kuadron.Web.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection("Smtp"));
builder.Services.AddSingleton<SiteDataService>();
builder.Services.AddSingleton<ContactMailService>();
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

app.MapPost("/api/contact", async (HttpContext http, ContactMailService mailService, CancellationToken ct) =>
{
    if (!http.Request.HasFormContentType)
    {
        return Results.BadRequest(new { ok = false, error = "Invalid form content type." });
    }

    var form = await http.Request.ReadFormAsync(ct);

    // Honeypot spam filter
    if (!string.IsNullOrWhiteSpace(form["_gotcha"]))
    {
        return Results.Ok(new { ok = true, spamFiltered = true });
    }

    var name = form["name"].ToString().Trim();
    var email = form["email"].ToString().Trim();
    var phone = form["phone"].ToString().Trim();
    var message = form["message"].ToString().Trim();
    var companyCity = form["company_city"].ToString().Trim();

    if (name.Length < 2 || name.Length > 120)
    {
        return Results.BadRequest(new { ok = false, error = "Lütfen geçerli bir isim ve soyisim girin." });
    }

    if (!MailAddress.TryCreate(email, out _))
    {
        return Results.BadRequest(new { ok = false, error = "Lütfen geçerli bir e-posta adresi girin." });
    }

    var isModalApplication = !string.IsNullOrWhiteSpace(companyCity);
    if (!isModalApplication && (message.Length < 5 || message.Length > 2000))
    {
        return Results.BadRequest(new { ok = false, error = "Lütfen mesajınızı girin (en az 5 karakter)." });
    }

    var referer = http.Request.Headers.Referer.ToString();
    var clientIp = http.Connection.RemoteIpAddress?.ToString();

    var submission = new ContactSubmission(
        Name: name,
        Email: email,
        Phone: string.IsNullOrWhiteSpace(phone) ? null : phone,
        Message: string.IsNullOrWhiteSpace(message) ? null : message,
        CompanyCity: string.IsNullOrWhiteSpace(companyCity) ? null : companyCity,
        PageUrl: string.IsNullOrWhiteSpace(referer) ? null : referer,
        ClientIp: clientIp);

    var result = await mailService.SendAsync(submission, ct);
    if (!result.Success)
    {
        return Results.Json(new { ok = false, error = result.ErrorMessage ?? "E-posta gönderilemedi." }, statusCode: 502);
    }

    return Results.Ok(new { ok = true, delivery = result.DeliveryMode });
}).DisableAntiforgery();

app.MapRazorComponents<App>();

app.Run();

