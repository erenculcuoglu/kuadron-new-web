namespace Kuadron.Web.Models;

public sealed class SiteContentBundle
{
    public CompanyInfoModel Company { get; set; } = new();
    public List<RoutePairModel> Routes { get; set; } = [];
    public Dictionary<string, LocaleSiteContent> Content { get; set; } = new();
}

public sealed class CompanyInfoModel
{
    public string LegalNameTR { get; set; } = "";
    public string LegalNameEN { get; set; } = "";
    public string Email { get; set; } = "";
    public string ChannelEmail { get; set; } = "";
    public string PhoneDisplay { get; set; } = "";
    public string PhoneHref { get; set; } = "";
    public List<string> AddressLines { get; set; } = [];
    public string CampusLabelTR { get; set; } = "";
    public string CampusLabelEN { get; set; } = "";
    public string MapsUrl { get; set; } = "";
    public JotformLinksModel Jotform { get; set; } = new();
    public List<SocialLinkModel> Social { get; set; } = [];
}

public sealed class JotformLinksModel
{
    public string Franchise { get; set; } = "";
    public string Career { get; set; } = "";
}

public sealed class SocialLinkModel
{
    public string Name { get; set; } = "";
    public string Href { get; set; } = "";
    public string Icon { get; set; } = "";
}

public sealed class RoutePairModel
{
    public string Tr { get; set; } = "";
    public string En { get; set; } = "";
}

public sealed class LocaleSiteContent
{
    public string LangLabel { get; set; } = "";
    public string AltLang { get; set; } = "";
    public string SiteName { get; set; } = "";
    public NavContent Nav { get; set; } = new();
    public HomeContent Home { get; set; } = new();
    public List<ProjectItem> Projects { get; set; } = [];
    public List<ProductItem> Products { get; set; } = [];
    public List<TestimonialItem> Testimonials { get; set; } = [];
    public FeaturedNewsSectionContent FeaturedNewsSection { get; set; } = new();
    public AboutContent About { get; set; } = new();
    public FranchisingContent Franchising { get; set; } = new();
    public CareerContent Career { get; set; } = new();
    public SoftwareDevContent SoftwareDev { get; set; } = new();
    public ProductDevContent ProductDev { get; set; } = new();
    public DigitalTransformationContent DigitalTransformation { get; set; } = new();
    public NewsPageContent NewsPage { get; set; } = new();
    public ContactContent Contact { get; set; } = new();
    public FooterContent Footer { get; set; } = new();
    public CookieBannerContent CookieBanner { get; set; } = new();
}

public sealed class NavContent
{
    public string CorporateLabel { get; set; } = "";
    public List<NavDropdownItem> CorporateItems { get; set; } = [];
    public string ServicesLabel { get; set; } = "";
    public List<NavDropdownItem> ServicesItems { get; set; } = [];
    public List<NavLinkItem> DirectLinks { get; set; } = [];
    public string CtaButton { get; set; } = "";
    public string CtaHref { get; set; } = "";
    public string ThemeSwitchToDark { get; set; } = "";
    public string ThemeSwitchToLight { get; set; } = "";
    public string OpenMenu { get; set; } = "";
    public string CloseMenu { get; set; } = "";
}

public sealed class NavDropdownItem
{
    public string Label { get; set; } = "";
    public string Href { get; set; } = "";
    public string Desc { get; set; } = "";
}

public sealed class NavLinkItem
{
    public string Label { get; set; } = "";
    public string Href { get; set; } = "";
}

public sealed class HomeContent
{
    public string MetaTitle { get; set; } = "";
    public string MetaDescription { get; set; } = "";
    public string HeroTitleLine1 { get; set; } = "";
    public string HeroTitleHighlight { get; set; } = "";
    public string HeroSubtitle { get; set; } = "";
    public List<StatItem> Stats { get; set; } = [];
    public string ServicesEyebrow { get; set; } = "";
    public string ServicesTitle { get; set; } = "";
    public string ServicesDescription { get; set; } = "";
    public List<ServiceCapabilityItem> ServiceList { get; set; } = [];
    public string PillarsEyebrow { get; set; } = "";
    public string PillarsTitle { get; set; } = "";
    public string PillarsDescription { get; set; } = "";
    public List<PillarItem> Pillars { get; set; } = [];
    public string ProjectsAnchor { get; set; } = "";
    public string ProjectsEyebrow { get; set; } = "";
    public string ProjectsTitle { get; set; } = "";
    public string ProjectsSubtitle { get; set; } = "";
    public string ViewAllProjectsLabel { get; set; } = "";
    public string ViewAllProjectsHref { get; set; } = "";
    public string ProductsEyebrow { get; set; } = "";
    public string ProductsTitle { get; set; } = "";
    public string ProductsSubtitle { get; set; } = "";
    public string ViewAllProductsLabel { get; set; } = "";
    public string ViewAllProductsHref { get; set; } = "";
    public string TestimonialsEyebrow { get; set; } = "";
    public string TestimonialsTitle { get; set; } = "";
}

public sealed class StatItem
{
    public string Value { get; set; } = "";
    public string Label { get; set; } = "";
}

public sealed class ServiceCapabilityItem
{
    public string Title { get; set; } = "";
    public string Icon { get; set; } = "";
    public string Category { get; set; } = "";
}

public sealed class PillarItem
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Icon { get; set; } = "";
}

public sealed class ProjectItem
{
    public string Id { get; set; } = "";
    public string Client { get; set; } = "";
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public List<string> Features { get; set; } = [];
    public string Image { get; set; } = "";
    public string? HomeImage { get; set; }
    public string? Url { get; set; }
    public string? CtaLabel { get; set; }
    public bool FeaturedOnHome { get; set; }
    public string CategoryBadge { get; set; } = "";
}

public sealed class ProductItem
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
    public string Tagline { get; set; } = "";
    public string Description { get; set; } = "";
    public List<string> Features { get; set; } = [];
    public string? Image { get; set; }
    public int? ImageWidth { get; set; }
    public int? ImageHeight { get; set; }
    public string? Visual { get; set; }
    public string? Url { get; set; }
    public string? CtaLabel { get; set; }
    public string StatusBadge { get; set; } = "";
    public bool IsNew { get; set; }
    public bool FeaturedOnHome { get; set; }
}

public sealed class TestimonialItem
{
    public string Quote { get; set; } = "";
    public string Author { get; set; } = "";
    public string Role { get; set; } = "";
    public string Avatar { get; set; } = "";
}

public sealed class FeaturedNewsSectionContent
{
    public string Eyebrow { get; set; } = "";
    public string Title { get; set; } = "";
    public string ViewAllLabel { get; set; } = "";
    public string ViewAllHref { get; set; } = "";
    public List<FeaturedNewsCard> Cards { get; set; } = [];
}

public sealed class FeaturedNewsCard
{
    public string Title { get; set; } = "";
    public string Excerpt { get; set; } = "";
    public string Image { get; set; } = "";
    public string Url { get; set; } = "";
    public string Source { get; set; } = "";
    public string CtaLabel { get; set; } = "";
}

public sealed class AboutContent
{
    public string MetaTitle { get; set; } = "";
    public string MetaDescription { get; set; } = "";
    public string Eyebrow { get; set; } = "";
    public string Title { get; set; } = "";
    public string ValuesTitle { get; set; } = "";
    public string ValuesDescription { get; set; } = "";
    public List<string> Principles { get; set; } = [];
    public List<PillarItem> ValueCards { get; set; } = [];
    public List<CultureBlockItem> CultureBlocks { get; set; } = [];
}

public sealed class CultureBlockItem
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Image { get; set; } = "";
}

public sealed class FranchisingContent
{
    public string MetaTitle { get; set; } = "";
    public string MetaDescription { get; set; } = "";
    public string Eyebrow { get; set; } = "";
    public string Title { get; set; } = "";
    public string IntroTitle { get; set; } = "";
    public string IntroDescription { get; set; } = "";
    public List<FaqItem> Faqs { get; set; } = [];
    public string BenefitsTitle { get; set; } = "";
    public List<PillarItem> Benefits { get; set; } = [];
    public string CtaBannerTitle { get; set; } = "";
    public string CtaBannerSubtitle { get; set; } = "";
    public string CtaButtonLabel { get; set; } = "";
    public string BannerImage { get; set; } = "";
}

public sealed class FaqItem
{
    public string Question { get; set; } = "";
    public string Answer { get; set; } = "";
}

public sealed class CareerContent
{
    public string MetaTitle { get; set; } = "";
    public string MetaDescription { get; set; } = "";
    public string Eyebrow { get; set; } = "";
    public string Title { get; set; } = "";
    public string Subtitle { get; set; } = "";
    public string OpenPositionsTitle { get; set; } = "";
    public List<CareerPositionItem> Positions { get; set; } = [];
    public string HrTitle { get; set; } = "";
    public string HrDescription { get; set; } = "";
    public List<string> HrTraits { get; set; } = [];
    public string HrImage { get; set; } = "";
    public string CvCtaTitle { get; set; } = "";
    public string CvCtaSubtitle { get; set; } = "";
    public string CvCtaButton { get; set; } = "";
}

public sealed class CareerPositionItem
{
    public string Title { get; set; } = "";
    public string Location { get; set; } = "";
    public string Badge { get; set; } = "";
    public string? ExternalUrl { get; set; }
}

public sealed class SoftwareDevContent
{
    public string MetaTitle { get; set; } = "";
    public string MetaDescription { get; set; } = "";
    public string Eyebrow { get; set; } = "";
    public string Title { get; set; } = "";
    public string Lead { get; set; } = "";
    public string WorkflowTitle { get; set; } = "";
    public string WorkflowSubtitle { get; set; } = "";
    public List<WorkflowStep> Steps { get; set; } = [];
    public string ProjectsTitle { get; set; } = "";
}

public sealed class ProductDevContent
{
    public string MetaTitle { get; set; } = "";
    public string MetaDescription { get; set; } = "";
    public string Eyebrow { get; set; } = "";
    public string Title { get; set; } = "";
    public string Lead { get; set; } = "";
    public string WorkflowTitle { get; set; } = "";
    public string WorkflowSubtitle { get; set; } = "";
    public List<WorkflowStep> Steps { get; set; } = [];
    public string ProductsTitle { get; set; } = "";
}

public sealed class DigitalTransformationContent
{
    public string MetaTitle { get; set; } = "";
    public string MetaDescription { get; set; } = "";
    public string Eyebrow { get; set; } = "";
    public string Title { get; set; } = "";
    public string Lead { get; set; } = "";
    public string WorkflowTitle { get; set; } = "";
    public string WorkflowSubtitle { get; set; } = "";
    public List<WorkflowStep> Steps { get; set; } = [];
}

public sealed class WorkflowStep
{
    public string Number { get; set; } = "";
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
}

public sealed class NewsPageContent
{
    public string MetaTitle { get; set; } = "";
    public string MetaDescription { get; set; } = "";
    public string Eyebrow { get; set; } = "";
    public string Title { get; set; } = "";
    public string Subtitle { get; set; } = "";
    public string SearchPlaceholder { get; set; } = "";
    public string SearchLabel { get; set; } = "";
    public string AllYearsLabel { get; set; } = "";
    public string ReadLabel { get; set; } = "";
    public string EmptyLabel { get; set; } = "";
}

public sealed class ContactContent
{
    public string Anchor { get; set; } = "";
    public string Eyebrow { get; set; } = "";
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string FormTitle { get; set; } = "";
    public string NameLabel { get; set; } = "";
    public string NamePlaceholder { get; set; } = "";
    public string NameError { get; set; } = "";
    public string PhoneLabel { get; set; } = "";
    public string PhonePlaceholder { get; set; } = "";
    public string PhoneError { get; set; } = "";
    public string EmailLabel { get; set; } = "";
    public string EmailPlaceholder { get; set; } = "";
    public string EmailError { get; set; } = "";
    public string MessageLabel { get; set; } = "";
    public string MessagePlaceholder { get; set; } = "";
    public string MessageError { get; set; } = "";
    public string SubmitLabel { get; set; } = "";
    public string SubmittingLabel { get; set; } = "";
    public string SuccessMessage { get; set; } = "";
    public string FallbackNotice { get; set; } = "";
    public string AddressTitle { get; set; } = "";
    public string MapLabel { get; set; } = "";
}

public sealed class FooterContent
{
    public string Summary { get; set; } = "";
    public string CorporateTitle { get; set; } = "";
    public List<NavLinkItem> CorporateLinks { get; set; } = [];
    public string ServicesTitle { get; set; } = "";
    public List<NavLinkItem> ServicesLinks { get; set; } = [];
    public string CompletedProjectsTitle { get; set; } = "";
    public List<NavLinkItem> CompletedProjects { get; set; } = [];
    public string ContactTitle { get; set; } = "";
    public string Copyright { get; set; } = "";
}

public sealed class CookieBannerContent
{
    public string Text { get; set; } = "";
    public string LinkLabel { get; set; } = "";
    public string LinkHref { get; set; } = "";
    public string AcceptLabel { get; set; } = "";
}

public sealed class PressArchiveBundle
{
    public List<PressArchiveItem> Tr { get; set; } = [];
    public List<PressArchiveItem> En { get; set; } = [];
}

public sealed class PressArchiveItem
{
    public string Day { get; set; } = "";
    public string Month { get; set; } = "";
    public string Year { get; set; } = "";
    public string Source { get; set; } = "";
    public string Title { get; set; } = "";
    public string Url { get; set; } = "";
}

public sealed class BlogPostEntry
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string MetaTitle { get; set; } = "";
    public string Description { get; set; } = "";
    public string PubDate { get; set; } = "";
    public string DisplayDate { get; set; } = "";
    public int ReadingTime { get; set; }
    public string Author { get; set; } = "";
    public string AuthorAvatar { get; set; } = "";
    public string CoverImage { get; set; } = "";
    public List<BlogTagItem> Tags { get; set; } = [];
    public List<BlogTocItem> TocHeadings { get; set; } = [];
    public string ContentHtml { get; set; } = "";
}

public sealed class BlogTagItem
{
    public string Slug { get; set; } = "";
    public string Label { get; set; } = "";
}

public sealed class BlogTocItem
{
    public string Slug { get; set; } = "";
    public string Text { get; set; } = "";
}
