# Kuadron Kurumsal Web Uygulaması (.NET 8 Blazor SSR)

**Kuadron Bilişim Teknolojileri A.Ş.** kurumsal web sitesi, **C# / ASP.NET Core 8 Blazor Web App (Server-Side Rendering)** mimarisiyle geliştirilmiştir (`klinitra.com` ile birebir aynı teknoloji yığını).

## Teknoloji Yığını

- **Framework:** ASP.NET Core 8.0 (`Microsoft.NET.Sdk.Web`, `.NET 8`)
- **UI Mimarisi:** Blazor Razor Components (`Components/Pages/*.razor`, `Components/Shared/*.razor`, `Components/Layout/MainLayout.razor`)
- **Veri ve Servis Katmanı:** `Services/SiteDataService.cs`, `Models/SiteModels.cs` ve `Data/*.json` (Türkçe `/` ve İngilizce `/en/` çift dilli içerik, basın arşivi ve blog motoru)
- **Statik Varlıklar:** `wwwroot/css/site.css`, `wwwroot/js/kuadron-site.js`, `wwwroot/uploads/`, `wwwroot/assets/`

## Geliştirme ve Çalıştırma

```bash
# Projeyi derleme
dotnet build

# Geliştirme sunucusunu başlatma (http://localhost:4321)
dotnet run --urls "http://localhost:4321"

# Production (Release) yayını alma
dotnet publish -c Release -o ./publish
```
