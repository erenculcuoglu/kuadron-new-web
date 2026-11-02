import type { Locale, ProjectItem, ProductItem, TestimonialItem, FeaturedNewsCard, WorkflowStep } from './types';

export const SITE_CONTENT = {
  tr: {
    langLabel: 'EN',
    altLang: 'en' as Locale,
    siteName: 'Kuadron Bilişim Teknolojileri',
    nav: {
      corporateLabel: 'Kurumsal',
      corporateItems: [
        { label: 'Hakkımızda', href: '/hakkimizda', desc: 'Değerlerimiz, kültürümüz ve OSTİM Teknopark vizyonumuz' },
        { label: 'Bayilik', href: '/bayilik', desc: 'TORK ve Reportql iş ortaklığı ekosistemine katılın' },
        { label: 'Kariyer', href: '/kariyer', desc: 'Açık pozisyonlar ve insan kaynakları politikamız' },
        { label: 'Haberler', href: '/haberler', desc: 'Basında Kuadron, ürün lansmanları ve sektörel yansımalar' },
        { label: 'Blog', href: '/blog', desc: 'ERP, CRM, dijital dönüşüm ve yazılım dünyasından rehberler' },
      ],
      servicesLabel: 'Hizmetlerimiz',
      servicesItems: [
        { label: 'Yazılım Geliştirme', href: '/yazilim-gelistirme', desc: 'Çevik prensiplerle kuruma özel web, mobil ve masaüstü sistemler' },
        { label: 'Ürün Geliştirme ve Pazarlama', href: '/urun-gelistirme-ve-pazarlama', desc: 'Fikirden ticarileştirmeye SaaS ve bulut yazılım ürünleri' },
        { label: 'Dijital Dönüşüm Danışmanlığı', href: '/dijital-donusum-danismanligi', desc: 'Adım adım e-Dönüşüm yol haritası, güvenlik ve süreç mimarisi' },
      ],
      directLinks: [
        { label: 'Referanslar', href: '/#referanslar' },
        { label: 'Blog', href: '/blog' },
        { label: 'İletişim', href: '/#iletisim' },
      ],
      ctaButton: 'İletişime Geçin',
      ctaHref: '/#iletisim',
      themeSwitchToDark: 'Koyu temaya geç',
      themeSwitchToLight: 'Açık temaya geç',
      openMenu: 'Menüyü aç',
      closeMenu: 'Menüyü kapat',
    },
    home: {
      metaTitle: 'Kuadron Bilişim Teknolojileri | İş Hayatına Değer Katan Yazılım Çözümleri',
      metaDescription: 'İş yazılımlarında 15 yılı aşkın sektör tecrübemizle ürün ve proje geliştiriyoruz.',
      heroBadge: 'OSTİM Teknopark • 15+ Yıl Sektör Tecrübesi',
      heroTitleLine1: 'İş Hayatına Değer Katan',
      heroTitleHighlight: 'Yazılım Çözümleri',
      heroSubtitle: 'İş yazılımlarında 15 yılı aşkın sektör tecrübemizle ürün ve proje geliştiriyoruz.',
      newsletterPlaceholder: 'E-posta adresiniz',
      newsletterLabel: 'E-bülten e-posta adresi',
      newsletterButton: 'Kaydol',
      newsletterHint: 'Yeni ürün duyuruları ve dijital dönüşüm bültenimiz için kaydolun.',
      newsletterSuccess: 'E-posta adresiniz başarıyla kaydedildi!',
      videoPauseLabel: 'Tanıtım videosunu duraklat',
      videoPlayLabel: 'Tanıtım videosunu oynat',
      stats: [
        { value: '15+ Yıl', label: 'İş Yazılımları Deneyimi' },
        { value: 'OSTİM', label: 'Teknopark Ar-Ge Merkezi' },
        { value: '4691', label: 'Teknoloji Geliştirme Kanunu' },
        { value: 'Uçtan Uca', label: 'Web • Mobil • Bulut Çözümler' },
      ],
      servicesEyebrow: 'Yetkinliklerimiz',
      servicesTitle: 'Hizmetlerimiz',
      servicesDescription:
        'Ankara OSTİM Teknopark\'ta, 4691 sayılı "Teknoloji Geliştirme Bölgeleri Kanunu" kapsamında faaliyet gösteren Kuadron Bilişim, işe özel web, mobil ve masaüstü yazılımlar geliştirilerek şirketlerin dijital dönüşüm süreçlerine öncülük eder.',
      serviceList: [
        { title: 'ERP Yazılım', icon: 'layers', category: 'Kurumsal Kaynak' },
        { title: 'CRM Yazılım', icon: 'users', category: 'Müşteri İlişkileri' },
        { title: 'IT Danışmanlığı', icon: 'compass', category: 'Strateji & Mimari' },
        { title: 'Mobil Uygulama Geliştirme', icon: 'smartphone', category: 'iOS & Android' },
        { title: 'Kalite Yönetim Sistemleri', icon: 'award', category: 'Standart & Denetim' },
        { title: 'Bayi Otomasyon Sistemi', icon: 'network', category: 'B2B Kanal Yönetimi' },
        { title: 'İnsan Kaynakları Yazılımları', icon: 'briefcase', category: 'İK & Süreç' },
        { title: 'İşe Özel Yazılım Geliştirme', icon: 'code', category: 'Terzi İşi Mimari' },
        { title: 'Bulut Tabanlı Yazılımlar (Bayilik Anlaşmaları)', icon: 'cloud', category: 'SaaS & PaaS' },
        { title: 'Start-up Projelerine Özel Yazılım Geliştirme', icon: 'rocket', category: 'MVP & Ölçekleme' },
        { title: 'Büyük Ölçekli Şirketler için Yazılım Geliştirme (B2B ve B2E)', icon: 'building', category: 'Kurumsal Dönüşüm' },
      ],
      pillarsEyebrow: 'Yaklaşımımız',
      pillarsTitle: 'Rekabete odaklanmak yerine müşteri ihtiyaçlarını merkeze alıyoruz.',
      pillarsDescription:
        'Müşterilerimizin bizimle temas ettiği tüm noktalarda yüksek kalite anlayışını benimsiyor, toplam marka değerimizi maksimize etmek için var gücümüzle çalışıyoruz.',
      pillars: [
        {
          title: 'Müşteri Odaklı Yaklaşım',
          description: 'Müşterilerimizle direkt temas halinde olmaya özen gösteriyoruz.',
          icon: 'users',
        },
        {
          title: 'Kullanıcı Dostu Yazılımlar',
          description: 'Kullanımı kolay ve arayüzü yalın uygulamalar geliştiriyoruz.',
          icon: 'smartphone',
        },
        {
          title: 'İşletmeye Özel Çözümler',
          description: 'Analiz ekibimizin sıkı çalışması ile işinize özel çözüm önerileri sunuyoruz.',
          icon: 'code',
        },
        {
          title: 'Bütünsel Yaklaşım',
          description: 'Dijitalleşmenin her kademeye yayılmasını sağlıyor, departmanlar arası verimliliği artırıyoruz.',
          icon: 'layers',
        },
      ],
      projectsAnchor: 'referanslar',
      projectsEyebrow: 'Referans Projelerimiz',
      projectsTitle: 'Kamu ve Özel Sektörde Ölçeklenebilir Sistemler',
      projectsSubtitle: 'Federasyonlardan yüzlerce şubeli kurumlara kadar yüksek güvenlikli, sürdürülebilir dijital altyapılar inşa ediyoruz.',
      viewAllProjectsLabel: 'Tüm Projeleri İncele',
      viewAllProjectsHref: '/yazilim-gelistirme',
      productsEyebrow: 'Yazılım Ürünlerimiz',
      productsTitle: 'Kendi Ar-Ge Gücümüzle Geliştirdiğimiz Bulut Ürünler',
      productsSubtitle: 'Yatırım maliyetine katlanmadan, platformdan bağımsız çalışmayı sağlayan tescilli yazılım çözümlerimiz.',
      viewAllProductsLabel: 'Ürün Geliştirme Sürecimiz',
      viewAllProductsHref: '/urun-gelistirme-ve-pazarlama',
      testimonialsEyebrow: 'Müşteri Deneyimleri',
      testimonialsTitle: 'Bizi bir de müşterilerimizden dinleyin!',
    },
    projects: [
      {
        id: 'sutopu-sys',
        client: 'Türkiye Sutopu Federasyonu',
        title: 'Sutopu Yönetim Sistemi (SYS)',
        description:
          'Hayata geçecek sistem üzerinden federasyonun düzenlediği müsabakaların daha rahat izlenebilmesi ve yönetilmesinin yanında oyun istatistiklerinin kolayca raporlanması hedeflenmektedir.',
        features: [
          'Hakem, Sporcu, Antrenör, Personel Yönetimi',
          'Müsabaka Yönetimi',
          'Ceza Modülü',
          'Karar Destek Modülü',
          'Web ve Mobil Uyumlu',
          'Raporlama',
        ],
        image: '/uploads/su-topu-fed.jpg',
        homeImage: '/uploads/su-topu-fed.jpg',
        url: 'https://sutopu.gov.tr/',
        ctaLabel: 'Detaylı Bilgi',
        featuredOnHome: true,
        categoryBadge: 'Spor Federasyonu Otomasyonu',
      },
      {
        id: 'tarim-kredi-intranet',
        client: 'Türkiye Tarım Kredi Kooperatifleri',
        title: 'İntranet Projesi',
        description:
          "Türkiye'de 800 binden fazla iş ortağı ile yüzlerce noktadan hizmet veren Tarım Kredi marketlerin iç iletişimini güçlendirmeyi hedefleyen intranet projesi ile işte verimlilik kat ve kat artacak.",
        features: [
          'Kullanıcı Yönetimi ve Yetkilendirme',
          'Duyuru/Haber Modülü',
          'İnsan Kaynakları Süreçleri Modülü',
          'Talep Yönetimi Modülü',
        ],
        image: '/uploads/tarim-kredi-kooperatifi.jpg',
        homeImage: '/uploads/tarim-kredi-kooperatifi.jpg',
        url: 'https://www.tarimkredi.org.tr/',
        ctaLabel: 'Detaylı Bilgi',
        featuredOnHome: true,
        categoryBadge: 'Kurumsal İntranet & B2E',
      },
      {
        id: 'parkim-crm',
        client: 'Parkim Parfüm Plastik ve Kimya',
        title: 'CRM Sistemi',
        description:
          "Parkim'in iş dinamikleri özelinde yapılan analiz neticesinde firmanın müşterilere verdiği teklif ve sipariş süreçleri Mikro ile entegre çalışacak şekilde geliştiriliyor.",
        features: ['Mikro Entegrasyonu', 'CRM', 'İş Takibi', 'İç İletişim'],
        image: '/uploads/prj-parkim-crm-min.jpg',
        url: 'http://www.parkimgroup.com/',
        ctaLabel: 'Detaylı Bilgi',
        featuredOnHome: false,
        categoryBadge: 'ERP Entegreli CRM',
      },
      {
        id: 'cinigaz-kys',
        client: 'Kütahya Çini Gaz Dağıtım',
        title: 'Kalite Yönetim Sistemi',
        description:
          'Kütahya Çini Gaz’ın abonelerine verdiği hizmeti daha tutarlı ve sürdürülebilir kılması amacıyla çalışmalarımız devam ediyor.',
        features: ['Kalite Yönetimi ve Planlama', 'Kalite Güvence ve Kontrol'],
        image: '/uploads/kutahya-cini-gaz--min.jpg',
        homeImage: '/uploads/kutahya-cini-gaz.jpg',
        url: 'https://www.cinigaz.com/',
        ctaLabel: 'Detaylı Bilgi',
        featuredOnHome: true,
        categoryBadge: 'Kalite Yönetim Sistemi',
      },
      {
        id: 'abb-veri-toplama',
        client: 'Ankara Büyükşehir Belediyesi',
        title: 'Veri Toplama Uygulaması',
        description:
          'ABB iştiraklerinde toplanan verinin merkeze aktarılarak belediyenin data odaklı bir yapıya geçmesi için veri toplama uygulaması hayata geçirildi.',
        features: ['Veri Toplama', 'Raporlama', 'Data Odaklı Çalışma', 'Merkezi Yönetim'],
        image: '/uploads/prj-abb-veri-toplama---min.jpg',
        url: 'https://www.ankara.bel.tr',
        ctaLabel: 'Detaylı Bilgi',
        featuredOnHome: false,
        categoryBadge: 'Kamu Veri Mimarisi',
      },
      {
        id: 'tigem-bayi-otomasyon',
        client: 'TİGEM',
        title: 'Bayi Otomasyon Sistemi',
        description:
          'Hayata geçirilen yazılım ile TİGEM, 81 ile yayılmış 280’in üzerinde bayi ve 14 tarım işletmesine yönelik tohum satışını online ortamda rahatlıkla yönetiyor.',
        features: ['Bulut Tabanlı Teknoloji', 'Yüksek Güvenlik', 'Yalın Arayüz', 'Mobil Uyumlu'],
        image: '/uploads/prj-bayi-otomaton-tigem-min.jpg',
        homeImage: '/uploads/tigem-bayi-otomasyon.jpg',
        url: 'https://www.tigem.gov.tr/',
        ctaLabel: 'Detaylı Bilgi',
        featuredOnHome: true,
        categoryBadge: 'Ulusal Bayi Ağı Otomasyonu',
      },
      {
        id: 'tigem-at-ihale',
        client: 'TİGEM',
        title: 'Elektronik Ortamda At İhale Sistemi',
        description:
          'Uygulama, TİGEM tarafından üretilen safkan atların elektronik ortamda satışlarının yapılması için kodlandı ve kabulü gerçekleştirildi.',
        features: ['İhale Yönetimi', 'Satış Yönetimi', 'Talep Toplama Ekranı'],
        image: '/uploads/prj-at-ihale-sistemi-tigem-min.jpg',
        url: 'https://www.tigem.gov.tr/',
        ctaLabel: 'Detaylı Bilgi',
        featuredOnHome: false,
        categoryBadge: 'E-İhale & Satış Platformu',
      },
    ] as ProjectItem[],
    products: [
      {
        id: 'ozbi',
        name: 'OzBI',
        tagline: 'ERP Verinizle Çalışan Yapay Zeka',
        description: 'Logo, Mikro ve SQL verilerinize doğal dilde sorular sorun. OzBI ile tablo, grafik ve analiz alın. Kurulum yapısını kurumunuzun ihtiyacına göre seçin.',
        features: ['Doğal Dilde Sorgu', 'Logo ve Mikro Entegrasyonu', 'Tablo ve Grafik', 'Yerel veya Hibrit Kurulum'],
        visual: 'ozbi-flow',
        url: 'https://www.ozbiapp.com.tr/',
        ctaLabel: 'OzBI’ı Keşfedin',
        statusBadge: 'Yeni Ürün / Yapay Zeka',
        isNew: true,
        featuredOnHome: true,
      },
      {
        id: 'strife',
        name: 'Strife',
        tagline: 'Spor Etkinlikleri ve Müsabaka Yönetimi',
        description: 'Tek veya çok branşlı spor organizasyonlarını tek platformdan yönetin. Kulüp ve sporcu kayıtlarını, akreditasyonu, turnuvaları ve maç sonuçlarını birlikte takip edin.',
        features: ['Katılımcı ve Akreditasyon', 'Turnuva, Kura ve Fikstür', 'Skor ve Maç İstatistikleri', 'Hakem ve Görevli Yönetimi', 'API ve Widget ile Sonuç Yayını'],
        image: '/uploads/products/strife-tournament.png',
        imageWidth: 2560,
        imageHeight: 1952,
        url: '/#iletisim',
        ctaLabel: 'Demo Talep Edin',
        statusBadge: 'Spor Yönetim Platformu',
        featuredOnHome: true,
      },
      {
        id: 'tork',
        featuredOnHome: true,
        name: 'TORK',
        tagline: 'Müşteri Odaklı Satış ve İş Yönetimi Yazılımı',
        description:
          'TORK satış, finans ve iş takibi özellikleri ile KOBİ’lerin günlük işlerini rahatlıkla yönetmesine imkan sağlayan, müşteri odaklı bir satış ve iş yönetimi yazılımıdır.',
        features: ['CRM', 'Finans', 'İş Takibi', 'Rapor'],
        image: '/uploads/prj-torkapp.jpg',
        url: 'https://torkapp.com',
        ctaLabel: 'Detaylı Bilgi',
        statusBadge: 'Bulut SaaS Ürün',
      },
      {
        id: 'reportql',
        featuredOnHome: true,
        name: 'Reportql',
        tagline: 'Veriye Her Yerden Erişin',
        description:
          'İşletmelerin yerel ve bulut ortamında yer alan veriye her an erişimine imkan sağlayan kolay kullanımlı rapor uygulamasıdır.',
        features: [
          'Veriye Her Yerden Erişim',
          'Online Raporlar',
          'Farklı Çözümlerle Uyumlu',
          '4 Adımda Kolay Rapor Oluşturma',
        ],
        image: '/uploads/prj-reportql.jpg',
        url: 'https://www.reportql.com/',
        ctaLabel: 'Detaylı Bilgi',
        statusBadge: 'Veri Hazırlama & BI',
      },
      {
        id: 'kys',
        name: 'KYS',
        tagline: 'Kalite Yönetim ve Planlama Sistemi',
        description:
          'Şirketlerin iş süreçleri özelinde kalite standartlarının karşılanıp karşılanmadığının tespiti ve müşteri memnuniyetinin inşa edilmesi için KYS yazılım geliştirme süreci devam ediyor.',
        features: ['Kalite Planlama', 'Kalite Kontrol'],
        image: '/uploads/prj-kys.jpg',
        statusBadge: 'Kurumsal Kalite Platformu',
      },
    ] as ProductItem[],
    testimonials: [
      {
        quote:
          'Kuadron’un geliştirdiği atçılık sistemi, kurumumuz tarafından üretilen safkan atların elektronik ortamda ihale ve satış süreçlerinin rahatça organize etmemiz için çok fayda sağladı. Emeği geçen proje ve yazılım geliştirme ekibine teşekkür ederiz.',
        author: 'TİGEM',
        role: 'TİGEM - Atçılık Daire Başkanlığı',
        avatar: '/uploads/refs/tigem.png',
      },
      {
        quote:
          'İşletmemizde kaynaklarımızı yönetmek için eskiden word, excel gibi araçlar kullanırdık fakat süreçler, karmaşık ve zorlayıcı bir hal alırdı. Kuadron’un bize sunduğu satış odaklı iş yönetim sistemini (TORK) deneyimledikten sonra iş süreçlerimiz çok kolaylaştı. Arta kalan zamanı artık işimizi geliştirmeye ayırabiliyoruz.',
        author: 'Orçun Çankaya',
        role: 'Argesan Kalıp San. Tic. - Yönetim Kurulu Üyesi',
        avatar: '/uploads/refs/orcun-cankaya.jpeg',
      },
      {
        quote:
          'CRM programı sayesinde satış ekibimizde kimin hangi satışla ilgilendiğini, satışla ilgili atılacak bir sonraki adımı gibi konuları takip edebiliyoruz. Müşteri adaylarımızı değerlendirip, satış aşamalarını kuşbakışı ekranda inceleyerek tekliflerimizin satışa dönüşme oranını önemli ölçüde arttırdık.',
        author: 'Necati Yazgan',
        role: 'Conpromac - Yönetim Kurulu Üyesi',
        avatar: '/uploads/refs/necati-yazgan.jpeg',
      },
      {
        quote:
          'Bayilerimizle aramızdaki iş süreçlerini güçlendirerek nihai tüketicimize çok daha hızlı ve sonuç odaklı hizmet vermeye başladık. Bayilerin sipariş girişlerini, stok ve cari hesap takiplerini artık çok daha kolay bir şekilde yapabiliyoruz.',
        author: 'Tunç Öztürk',
        role: 'Teatub - Yönetici',
        avatar: '/uploads/refs/tunc-ozturk.jpg',
      },
      {
        quote:
          'Kuadron’un yaptığı iş analizi neticesinde ortaya çıkan ERP sistemi ile pandemide işletmemizin hemen hemen tüm kaynaklarını mekandan bağımsız yönetme imkanına sahip olduk. Muhasebe çalışanları mobilden dahi fatura kesebiliyor. Bu dönemde satış ekibinin etkin CRM kullanımı sayesinde de ciro artışı sağladık.',
        author: 'İsmail Hakkı Yağcızeybek',
        role: 'LSK Yapısal Ahşap - Yönetici',
        avatar: '/uploads/refs/ismail-hakki.jpg',
      },
      {
        quote:
          'İşletmedeki en büyük problemimiz satış ekibi arasındaki koordinasyon eksikliği idi. Kuadron’un işletmemiz özelinde yaptığı detaylı analiz ile geliştirdiği CRM uygulaması sayesinde şuan işimizle ilgili her türlü bilgiye anında ulaşıyor, ürün/hizmet bazında detaylı raporlama sayesinde veriye dayalı karar alıyoruz.',
        author: 'Fatih Beşel',
        role: 'IOTISS Akıllı İş Çözümleri A.Ş. - Satış Müdürü',
        avatar: '/uploads/refs/fatih-b.jpeg',
      },
      {
        quote:
          'ERP programı sayesinde işletmemizin muhasebe, crm, proje yönetimi, satınalma, stok ve üretim gibi faaliyetlerini bir arada takip etme ve yönetme imkanımız oldu. Kaynaklarımızı efektif bir şekilde planlayarak verimliliğimizi arttırdık. Oryantasyon ve eğitim süreçlerinde her daim yanımızda olan Kuadron ekibine çok teşekkür ederim.',
        author: 'Burak Sivrikaya',
        role: 'Çözüm İş Grup - Yönetici',
        avatar: '/uploads/refs/burak-sivrikaya.jpeg',
      },
      {
        quote:
          'Müşterilerimizle proje bazlı işler yürüten bir firmayız. Kuadron Bilişim ile geliştirdiğimiz Proje Yönetim Sistemi sayesinde yürütmekte olduğumuz her bir proje için maliyet kontrolü yapabiliyor, takip gerektiren konuları da profesyonel bir şekilde çalışan bazında planlayabilme imkanına sahip olduk.',
        author: 'Ruhi Gönüllü',
        role: 'Mavion Bilişim Teknolojileri - Genel Müd.Yrd.',
        avatar: '/uploads/refs/ruhi-gonullu.jpeg',
      },
    ] as TestimonialItem[],
    featuredNewsSection: {
      eyebrow: 'Basında Kuadron',
      title: 'Öne Çıkan Haberler',
      viewAllLabel: 'Tüm Haberleri Gör',
      viewAllHref: '/haberler',
      cards: [
        {
          title: 'Kuadron, Reportql ile İBB Tech Istanbul Demo Day sahnesinde yer aldı.',
          excerpt: "İstanbul Büyükşehir Belediyesi'nin liderliğindeki Tech Istanbul, genç yeteneklere destek sağlayarak...",
          image: '/uploads/news/ibb-tech.jpg',
          url: 'https://webrazzi.com/2024/03/07/ibb-tech-istanbul-demo-day-sahnesi-nde-yer-alan-16-girisim/',
          source: 'Webrazzi',
          ctaLabel: 'Devamını oku',
        },
        {
          title: "Beş liderden 3'ü verinin stratejik olarak önemli olduğunu düşünüyor",
          excerpt: 'Veriden tam anlamıyla yararlanmak ve eyleme dönüştürülebilir içgörüler üretmek iş dünyasında başarının...',
          image: '/uploads/news/haber-94-min.jpg',
          url: 'https://www.dha.com.tr/ekonomi/bes-liderden-3u-verinin-stratejik-olarak-onemli-oldugunu-dusunuyor-2183518',
          source: 'DHA',
          ctaLabel: 'Devamını oku',
        },
        {
          title: 'Kuadron, veri hazırlama uygulaması Reportql’i duyurdu',
          excerpt: 'Veri analitiği, büyük veri ve iş zekası uygulamalarıyla verinin strateji geliştirmedeki önemi anlaşılsa da, veriyi...',
          image: '/uploads/news/go-gm1.jpg',
          url: 'https://www.ntv.com.tr/teknoloji/kuadron-veri-hazirlama-uygulamasi-reportqli-duyurdu,zwrFgDx3UEiYsAyhCHCiKQ',
          source: 'NTV Teknoloji',
          ctaLabel: 'Devamını oku',
        },
        {
          title: '“Dijital dönüşüm yerli iş yönetimi uygulamalarına talebi artırdı"',
          excerpt: 'Küresel iş yönetimi yazılım pazarının 2025’e kadar her yıl ortalama %9...',
          image: '/uploads/news/dha-tork.jpg',
          url: 'https://www.ntv.com.tr/ekonomi/eren-culcuoglu-dijital-donusum-yerli-is-yonetimi-uygulamalarina-talebi-artirdi,h6WQpxlju0qbm_9egEVlag',
          source: 'NTV Ekonomi',
          ctaLabel: 'Devamını oku',
        },
      ] as FeaturedNewsCard[],
    },
    about: {
      metaTitle: 'Hakkımızda | Kuadron Bilişim Teknolojileri',
      metaDescription:
        'Müşterilerimizin bizimle temas ettiği tüm noktalarda yüksek kalite anlayışını benimsiyor, toplam marka değerimizi maksimize etmek için var gücümüzle çalışıyoruz.',
      eyebrow: 'Kurumsal',
      title: 'Hakkımızda',
      valuesTitle: 'Değerlerimiz',
      valuesDescription:
        '15 yılı aşkın sektör tecrübemiz, bize rekabete odaklanmak yerine müşteri ihtiyaçlarını merkeze almayı öğretti. Müşterilerimizin bizimle temas ettiği tüm noktalarda yüksek kalite anlayışını benimsiyor, toplam marka değerimizi maksimize etmek için var gücümüzle çalışıyoruz.',
      principles: [
        'İşe yarar, minimalist teknolojiler üretmek',
        'Problem yerine çözüme odaklanmak',
        'Rekabetten ziyade müşteri merkezli çalışmak',
        'İnsanı kaynak olarak değil kıymet olarak görmek',
      ],
      valueCards: [
        {
          title: 'Önce Dinle',
          description:
            'İletişimin tek değil iki kanallı ilerlemesi gerektiğini düşünüyor, diyaloğun başına her zaman dinlemeyi koyuyoruz.',
          icon: 'users',
        },
        {
          title: 'Müşteri Odaklılık',
          description:
            'Müşteri taleplerini doğru anlamak, ihtiyaca yönelik çözüm önerileri sunmak ve mutlu müşteriler yaratmak en temel amacımız.',
          icon: 'award',
        },
        {
          title: 'Sürdürülebilir Büyüme',
          description:
            'Emek ve sermaye verimliliğinin doğru zamanda, doğru proje ve ürüne yapılan yatırımla gerçekleşeceğine inanıyor, istikrarlı büyümenin bilinçli stratejilerle şekilleneceğini düşünüyoruz.',
          icon: 'chart',
        },
      ],
      cultureBlocks: [
        {
          title: 'Tüm başarıların arkasında ekip ruhu ile çalışmak yatıyor.',
          description:
            'Dahil olduğumuz her işte birlik, bütünlük, anlayış ve yaratıcılık ilkeleriyle hareket ediyoruz. Bu değerler ile alınan her kararda ekip olarak hareket etmeye özen gösteriyoruz.',
          image: '/uploads/site/kuadron-ekip-ruhu.jpg',
        },
        {
          title: 'Takımda görev alan her çalışanın kendi potansiyelini ortaya çıkarmasına destek oluyoruz.',
          description:
            'İnsan kaynağımızın departman bağımsız olarak gelişimine destek veriyor, liyakata dayalı, çalışanın beceri ve yetkinlik kazanarak yükselmesi gerektiğine inanıyoruz.',
          image: '/uploads/site/kuadron-takim-gorev.jpg',
        },
      ],
    },
    franchising: {
      metaTitle: 'Bayilik | Kuadron Bilişim Teknolojileri',
      metaDescription:
        'Çalışma hayatının gelişen ihtiyaçlarına değer katan bulut tabanlı ürünlerimizle işinizi daha ileriye taşıyoruz. Bayilik başvurunuzu hemen bugün yapın!',
      eyebrow: 'İş Ortaklığı Ekosistemi',
      title: 'Bayilik',
      introTitle: 'Sizinle tanışmak için sabırsızlanıyoruz!',
      introDescription:
        'Çalışma hayatının gelişen ihtiyaçlarına değer katan ürünlerimizle işinizi daha ileriye taşıyacak olmanın heyecanı içerisindeyiz.',
      faqs: [
        {
          question: 'Hangi ürünler için bayilik başvurusu yapabilirim?',
          answer:
            'Marka tescili Kuadron Bilişime ait TORK ve Reportql yazılım ürünleri için bayilik başvurusu yapabilirsiniz. Detaylı bilgi için lütfen 0312 503 20 51 veya info@kuadron.com üzerinden iletişime geçiniz.',
        },
        {
          question: 'Ürünlerin satış modeli nedir?',
          answer:
            'TORK ve Reportql lisanslanabilir iş modeli ile bayiye yıllık tekrarlayan gelir avantajı sağlar. Karlılık oranları ve detaylı bilgi için lütfen 0312 503 20 51 veya info@kuadron.com üzerinden iletişime geçiniz.',
        },
        {
          question: 'Ürünlerin pazarlanmasına yönelik destek veriyor musunuz?',
          answer:
            'Medya ve basın ilişkileri, grafik tasarım süreçleri, görsel iletişim, etkinlik yönetimi, dijital pazarlama ve kampanya yönetimi ile ilgili destekler Kuadron Kurumsal İletişim Direktörlüğü tarafından yönetilir. Bayilik sürecini tamamlayan iş ortaklarına yukarıdaki konularda destek sağlanır. Detaylı bilgi için kurumsaliletisim@kuadron.com adresine mail gönderebilirsiniz.',
        },
        {
          question: 'Ürün destek ve eğitim çalışmaları gerçekleştiriyor musunuz?',
          answer:
            'Evet. Talep doğrultusunda düzenlenen webinarlar ile online destek eğitimlerimize katılabilirsiniz. Detaylı bilgi için destek@kuadron.com adresine mail gönderiniz.',
        },
      ],
      benefitsTitle: 'İş Ortaklarımıza Sunduğumuz Avantajlar',
      benefits: [
        {
          title: 'Son Teknoloji Ürünleri',
          description: 'Yeni nesil yazılımlarımızla işletmelerin günlük iş süreçlerinde fark yaratmasına katkı sağlayın.',
          icon: 'rocket',
        },
        {
          title: 'Destek ve Eğitim',
          description: 'Kuadron Akademi koordinasyonunda düzenlenen webinar ve eğitimlerle kişisel gelişiminiz her daim ön planda.',
          icon: 'award',
        },
        {
          title: 'Çözüm Geliştirme',
          description: "Kuadron'un geliştirdiği ürünlerle uyumlu çalışan, sektörel ve dikey çözümler özelinde ortaklık yapalım.",
          icon: 'code',
        },
        {
          title: 'Müşteri Sadakat Yönetimi',
          description: 'Müşteri memnuniyetini ölçmek için anket çalışmaları yapıyor, iş ortaklarımızla veriye dayalı analizler paylaşıyoruz.',
          icon: 'chart',
        },
        {
          title: 'Pazarlama',
          description: 'Ürünlerimizin görünür olmasını sağlayarak, yarattığımız katma değerin doğru hedef kitle ile buluşmasına özen gösteriyoruz.',
          icon: 'compass',
        },
        {
          title: 'Dijital Dönüşüm',
          description: 'İşletmelerin dijital dönüşüm süreçlerini ağrısız bir şekilde geçirmeleri için iş ortaklarımızla omuz omuza ilerliyoruz.',
          icon: 'layers',
        },
      ],
      ctaBannerTitle: 'Bizimle iletişime geçin!',
      ctaBannerSubtitle: 'Aşağıda yer alan butonu kullanarak bayilik başvurunuzu hemen iletebilirsiniz.',
      ctaButtonLabel: 'Bayilik Başvuru Formu',
      bannerImage: '/assets/img/bayi-iletisim1.jpg',
    },
    career: {
      metaTitle: 'Kariyer | Kuadron Bilişim Teknolojileri',
      metaDescription: 'Kuadron ekibinin bir parçası olmak için açık pozisyonlara hemen göz atın!',
      eyebrow: 'Kariyer Fırsatları',
      title: 'Kariyer',
      subtitle: 'Ekibimize Katılın!',
      openPositionsTitle: 'Açık Pozisyonlar',
      positions: [
        {
          title: 'Full-Stack Developer',
          location: 'Ankara, Remote',
          badge: 'Mühendislik',
        },
        {
          title: 'Senior Software Engineer',
          location: 'Ankara, Hybrid',
          badge: 'Mühendislik',
          externalUrl:
            'https://www.linkedin.com/jobs/view/1344628594/?refId=yKOn2SEgzA2JSkmLQBI7EQ%3D%3D&trackingId=pi0bSrlVMOwXF1m5hrKLsQ%3D%3D',
        },
        {
          title: 'Senior Product Marketing Manager',
          location: 'Ankara, Tam Zamanlı/Remote',
          badge: 'Ürün & Pazarlama',
        },
      ],
      hrTitle: 'İnsan Kaynakları Politikamız',
      hrDescription:
        'Faaliyette olduğumuz iş yazılımları sektöründe bugün ulaştığımız kalite ve başarı anlayışını çalışanlarımıza borçluyuz. İnsanı “kaynak” değil “kıymet” olarak gören politikamız; ailemize yeni katılan veya bugünlere gelmemizde emeği geçen çalışanlarımızın tecrübelerini harmanlayarak ekip ruhu içerisinde, kaynakları verimli kullanan bir çalışan profili oluşturmayı hedefliyoruz.',
      hrTraits: [
        'Şeffaf',
        'İçsel Odaklı',
        'Katılımcı',
        'Üretken',
        'Yenilikçi',
        'Sürekli Öğrenen',
        'Çevresine Duyarlı',
      ],
      hrImage: '/uploads/site/human-resources-img.jpg',
      cvCtaTitle: 'Özgeçmişini Gönder!',
      cvCtaSubtitle: 'İlgilendiğiniz pozisyonla birlikte CV’nizi hemen bizimle paylaşın.',
      cvCtaButton: 'Şimdi Başvur',
    },
    softwareDev: {
      metaTitle: 'Yazılım Geliştirme | Kuadron Bilişim Teknolojileri',
      metaDescription: 'Kuadron, çevik (agile) yazılım geliştirme prensipleri çerçevesinde kodlamaya özen gösterir.',
      eyebrow: 'Hizmetlerimiz',
      title: 'Yazılım Geliştirme',
      lead:
        'Kuadron, çevik (agile) yazılım geliştirme prensipleri çerçevesinde kodlamaya özen gösterir. Geliştirme hizmeti, şirketlerin iş dinamiklerine özel sistem tasarımının yapılması, yazılımın devamlılığı ve gerektiğinde güncellemesi şeklinde özetlenebilir.',
      workflowTitle: 'Sorunsuz İş Akışı',
      workflowSubtitle:
        'İş süreçlerinizi titizlikle analiz ediyor, gerekli olan sistem tasarımını gelecekteki ihtiyaçlarınızı ön görerek dizayn ediyoruz.',
      steps: [
        {
          number: '01',
          title: 'Analiz ve Tasarım',
          description: 'İş dinamiklerinizi analiz ederek şirketiniz için en uygun sistem tasarımını ortaya çıkarıyoruz.',
        },
        {
          number: '02',
          title: 'Yazılım Geliştirme',
          description: 'Yazılım mühendislerimiz son teknolojiyi kullanarak iteratif geliştirme prensibi ile projeyi kodlar.',
        },
        {
          number: '03',
          title: 'Test Süreci',
          description: 'Test ekibimiz yazılımdaki hataları tespit etmek üzere proje üzerinde çeşitli denemeler yapar.',
        },
        {
          number: '04',
          title: 'Teslim',
          description: 'Geliştirme ve test süreci tamamlanan proje için son onay alınarak teslim aşamasına geçilir.',
        },
      ] as WorkflowStep[],
      projectsTitle: 'Projeler',
    },
    productDev: {
      metaTitle: 'Ürün Geliştirme ve Pazarlama | Kuadron Bilişim Teknolojileri',
      metaDescription:
        'Şirketlerin yatırım maliyetine katlanmadan platformdan bağımsız şekilde iş yapmalarına imkan sağlayan teknolojiler geliştiriyoruz.',
      eyebrow: 'Hizmetlerimiz',
      title: 'Ürün Geliştirme ve Pazarlama',
      lead:
        'Şirketlerin yatırım maliyetine katlanmadan (lisans/sunucu maliyeti, eğitim, destek, güncelleme) platformdan bağımsız bir şekilde minimum ödemelerle iş yapmalarına imkan sağlayan teknolojiler geliştiriyoruz.',
      workflowTitle: 'Fikirden Ürünleşmeye',
      workflowSubtitle:
        'Yazılım ürünün fikir aşamasından pazara sunulmasına kadar geçen tüm süreçleri titizlikle dizayn ediyoruz.',
      steps: [
        {
          number: '01',
          title: 'Fikir ve Planlama',
          description: 'Ürün potansiyeli yüksek iş fikirleri değerlendirilir, işletmeler için en uygun çözümler bulunur.',
        },
        {
          number: '02',
          title: 'Analiz, Prototip ve Test',
          description: 'İş planı tamamlanan ürün için prototip (MVP) oluşturarak test süreçleri işletilir.',
        },
        {
          number: '03',
          title: 'Pazar Testi',
          description: 'Pazarlama ekibi fiyat politikası, pazar araştırma ve markalaşma süreçlerini yürütür.',
        },
        {
          number: '04',
          title: 'Ticarileştirme',
          description: 'Satış ortaklarımız nihai ürünün ticari faaliyetlerine katkı sağlayarak ürünü pazara sunar.',
        },
      ] as WorkflowStep[],
      productsTitle: 'Ürünler',
    },
    digitalTransformation: {
      metaTitle: 'Dijital Dönüşüm Danışmanlığı | Kuadron Bilişim Teknolojileri',
      metaDescription:
        'Dijital dönüşüme adapte olmanız için şirketiniz için yol haritası belirliyor, dijitalleşme sürecinizi titizlikle dizayn ediyoruz.',
      eyebrow: 'Hizmetlerimiz',
      title: 'Dijital Dönüşüm Danışmanlığı',
      lead:
        'Dijitalleşme, şirketler için bir seçim olmaktan çıkıp zorunluluk haline geldi. Dijitalleşmeyi başaramayan firmalar yeni çağın gerekliliklerine adapte olamadıklarından dolayı birçok kayıp yaşıyorlar.',
      workflowTitle: 'Adım Adım e-Dönüşüm',
      workflowSubtitle:
        'Dijital dönüşüme adapte olmanız için şirketiniz için yol haritası belirliyor, dijitalleşme sürecinizi titizlikle dizayn ediyoruz.',
      steps: [
        {
          number: '01',
          title: 'Hazırlık Aşaması',
          description: 'Dijital dönüşüm bir yolculuk. İşletmenizi dönüşüme hazırlayarak ihtiyaç analizi yapıyoruz.',
        },
        {
          number: '02',
          title: 'Dijital Kültür Oluşturma',
          description: 'Dijitalleşmenin her kademeye yansıması için çalışıyor, bütünsel yaklaşımla departmanlar arası verimliliği artırıyoruz.',
        },
        {
          number: '03',
          title: 'Mevzuat ve Ağ Güvenliği',
          description: 'Kağıt evrakları dijitale aktarıyor, siber saldırılara karşı banka seviyesi güvenlik protokolleri uyguluyoruz.',
        },
        {
          number: '04',
          title: 'Müşteri Deneyimi',
          description: 'Dijital dönüşüm ile müşteriye farklı bir deneyim yaşatarak işte verimlilik artışı sağlayın.',
        },
      ] as WorkflowStep[],
    },
    newsPage: {
      metaTitle: 'Haberler | Kuadron Bilişim Teknolojileri',
      metaDescription: 'Kuadron Bilişim Teknolojileri basın yansımaları, medya haberleri ve duyurular.',
      eyebrow: 'Basın Arşivi',
      title: 'Haberler',
      subtitle: 'Ulusal medya, ekonomi ve teknoloji basınında Kuadron, TORK ve Reportql haberleri.',
      searchPlaceholder: 'Haber başlığı veya yayın ara (örn. Reportql, TORK, NTV, Webrazzi)...',
      searchLabel: 'Haberlerde ara',
      allYearsLabel: 'Tümü',
      readLabel: 'DETAY',
      emptyLabel: 'Aramanızla eşleşen haber bulunamadı.',
    },
    contact: {
      anchor: 'iletisim',
      eyebrow: 'İletişim',
      title: 'Bizimle İletişime Geçin',
      description:
        'e-Dönüşüm veya iş yazılımları ile ilgili şirketinizin verimliliğini artıracak tüm soruları gönül rahatlığı ile bize sorabilirsiniz.',
      formTitle: 'Hızlı İletişim Formu',
      jotformButton: 'Detaylı İletişim Formunu Aç',
      nameLabel: 'İsim ve Soyisim',
      namePlaceholder: 'Adınız Soyadınız',
      nameError: 'Lütfen adınızı ve soyadınızı girin.',
      phoneLabel: 'Telefon',
      phonePlaceholder: '05XX XXX XX XX',
      phoneError: 'Lütfen geçerli bir telefon numarası girin.',
      emailLabel: 'E-posta Adresi',
      emailPlaceholder: 'ornek@sirketiniz.com',
      emailError: 'Lütfen geçerli bir e-posta adresi girin.',
      messageLabel: 'Mesajınız',
      messagePlaceholder: 'Projeniz veya sorularınız hakkında kısaca bilgi verin...',
      messageError: 'Lütfen mesajınızı yazın.',
      submitLabel: 'Gönder',
      submittingLabel: 'Gönderiliyor...',
      successMessage: 'Mesajınız alındı! Ekibimiz en kısa sürede sizinle iletişime geçecektir.',
      fallbackNotice: 'Mesaj henüz gönderilmedi. E-posta uygulamanızdan gönderin veya detaylı iletişim formunu açın.',
      addressTitle: 'Merkez Ofis',
      mapLabel: 'Haritada Görüntüle',
    },
    footer: {
      summary:
        'Ankara OSTİM Teknopark’ta faaliyet gösteren Kuadron Bilişim, işletmelere özel yazılım projeleri ve bulut tabanlı iş yönetimi ürünleri geliştirir.',
      corporateTitle: 'Kurumsal',
      corporateLinks: [
        { label: 'Hakkımızda', href: '/hakkimizda' },
        { label: 'Bayilik', href: '/bayilik' },
        { label: 'Kariyer', href: '/kariyer' },
        { label: 'Haberler', href: '/haberler' },
        { label: 'Blog', href: '/blog' },
        { label: 'Çerez Politikası', href: '/cerez-politikasi' },
      ],
      servicesTitle: 'Hizmetlerimiz',
      servicesLinks: [
        { label: 'Yazılım Geliştirme', href: '/yazilim-gelistirme' },
        { label: 'Ürün Geliştirme ve Pazarlama', href: '/urun-gelistirme-ve-pazarlama' },
        { label: 'Dijital Dönüşüm Danışmanlığı', href: '/dijital-donusum-danismanligi' },
      ],
      completedProjectsTitle: 'Tamamlanan Projeler',
      completedProjects: [
        { label: 'Kütahya Çinigaz - KYS', href: 'https://www.cinigaz.com/' },
        { label: 'Parkim Grup - CRM Sistemi', href: 'http://www.parkimgroup.com/tr/index' },
        { label: 'TİGEM - Online At İhale Sistemi', href: 'https://www.tigem.gov.tr/' },
        { label: 'ARGESAN - CRM Sistemi', href: 'https://www.argesan.com.tr/' },
      ],
      contactTitle: 'İletişim',
      copyright: '© 2017–2026 Kuadron Bilişim Teknolojileri Ltd. Şti. Tüm hakları saklıdır.',
    },
    cookieBanner: {
      text: 'Site kullanımını ölçmemize izin verir misiniz? İzleme kodu yalnızca kabul ederseniz yüklenir.',
      linkLabel: 'Çerez politikamız için tıklayın.',
      linkHref: '/cerez-politikasi',
      acceptLabel: 'İzlemeye izin ver',
    },
  },
  en: {
    langLabel: 'TR',
    altLang: 'tr' as Locale,
    siteName: 'Kuadron Information Technologies Inc.',
    nav: {
      corporateLabel: 'Corporate',
      corporateItems: [
        { label: 'About Us', href: '/en/about-us', desc: 'Our values, team culture, and OSTİM Technopark vision' },
        { label: 'Franchising', href: '/en/franchising', desc: 'Partner with Kuadron for recurring SaaS/PaaS growth' },
        { label: 'Career', href: '/en/career', desc: 'Open roles and our human-first talent philosophy' },
        { label: 'News', href: '/en/news', desc: 'Press coverage, milestones, and industry insights' },
      ],
      servicesLabel: 'Our Services',
      servicesItems: [
        { label: 'Software Development', href: '/en/software-development', desc: 'Agile web, mobile, and enterprise systems tailored to your business' },
        { label: 'Product Development and Marketing', href: '/en/product-development-and-marketing', desc: 'Cloud-native business products from MVP to commercialization' },
        { label: 'Digital Transformation Consultancy', href: '/en/digital-transformation-consultancy', desc: 'Step-by-step digitalization roadmap, security, and culture' },
      ],
      directLinks: [
        { label: 'References', href: '/en/#references' },
        { label: 'Blog (TR)', href: '/blog' },
        { label: 'Contact Us', href: '/en/#contact-us' },
      ],
      ctaButton: 'Contact Us',
      ctaHref: '/en/#contact-us',
      themeSwitchToDark: 'Switch to dark theme',
      themeSwitchToLight: 'Switch to light theme',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
    home: {
      metaTitle: 'Kuadron Information Technologies Inc. | Adding Value into Businesses',
      metaDescription: 'We develop products and projects with our 15 years of experience in business management solutions.',
      heroBadge: 'OSTİM Technopark • 15+ Years of Experience',
      heroTitleLine1: 'Adding Value into',
      heroTitleHighlight: 'Businesses',
      heroSubtitle: 'We develop products and projects over 15 years of experience in business management solutions.',
      newsletterPlaceholder: 'Your email address',
      newsletterLabel: 'Newsletter email address',
      newsletterButton: 'Subscribe',
      newsletterHint: 'Subscribe for product updates and digital transformation insights.',
      newsletterSuccess: 'Your email address has been subscribed!',
      videoPauseLabel: 'Pause showcase video',
      videoPlayLabel: 'Play showcase video',
      stats: [
        { value: '15+ Years', label: 'Enterprise Software Expertise' },
        { value: 'OSTİM', label: 'Technopark R&D Center' },
        { value: 'SaaS & B2B', label: 'Cloud & Custom Platforms' },
        { value: 'End-to-End', label: 'Web • Mobile • Desktop' },
      ],
      servicesEyebrow: 'Capabilities',
      servicesTitle: 'Our Services',
      servicesDescription:
        'Kuadron develops web, mobile and desktop applications specifically for businesses and leads the digital transformation processes regardless of the companies level of technology usage.',
      serviceList: [
        { title: 'ERP', icon: 'layers', category: 'Enterprise Resource' },
        { title: 'CRM', icon: 'users', category: 'Customer Relations' },
        { title: 'IT Consultancy', icon: 'compass', category: 'Strategy & Architecture' },
        { title: 'Mobile Application Development', icon: 'smartphone', category: 'iOS & Android' },
        { title: 'Quality Management System', icon: 'award', category: 'Standards & Audit' },
        { title: 'Franchise Automation System', icon: 'network', category: 'Dealer Network' },
        { title: 'Human Resources System', icon: 'briefcase', category: 'HR Operations' },
        { title: 'Tailor Made Software Development', icon: 'code', category: 'Custom Engineering' },
        { title: 'Cloud Based Software (Franchising)', icon: 'cloud', category: 'SaaS & PaaS' },
        { title: 'Software Development for Start-up Projects', icon: 'rocket', category: 'MVP & Scale' },
        { title: 'Software Development for B2B & B2E', icon: 'building', category: 'Enterprise Systems' },
      ],
      pillarsEyebrow: 'Our Philosophy',
      pillarsTitle: 'Instead of focusing on competition, we pay attention on customer needs',
      pillarsDescription:
        'We adopt a high quality approach at all touch points when we contact our customers and work so hard to maximize our brand value.',
      pillars: [
        {
          title: 'Customer-Focused',
          description: 'We pay attention to stay connected with our customers.',
          icon: 'users',
        },
        {
          title: 'User-Friendly Solutions',
          description: 'We develop applications with a simple interface and are easy to use.',
          icon: 'smartphone',
        },
        {
          title: 'Special Solutions for Business',
          description: 'We offer job-specific solutions with the hard work of our analysis team.',
          icon: 'code',
        },
        {
          title: 'Holistic Approach',
          description: 'We provide the spread of digitalization to all levels and increase efficiency between departments.',
          icon: 'layers',
        },
      ],
      projectsAnchor: 'references',
      projectsEyebrow: 'Case Studies & References',
      projectsTitle: 'Mission-Critical Platforms Across Public & Private Sectors',
      projectsSubtitle: 'From national federations to nationwide enterprise networks, we deliver secure, scalable digital systems.',
      viewAllProjectsLabel: 'Explore All Projects',
      viewAllProjectsHref: '/en/software-development',
      productsEyebrow: 'Our Products',
      productsTitle: 'Cloud-Native Business Software Built In-House',
      productsSubtitle: 'Platform-independent technologies enabling companies to operate without heavy upfront infrastructure costs.',
      viewAllProductsLabel: 'Product Development Process',
      viewAllProductsHref: '/en/product-development-and-marketing',
      testimonialsEyebrow: 'Client Stories',
      testimonialsTitle: 'Listen to what our customers say!',
    },
    projects: [
      {
        id: 'sutopu-sys',
        client: 'Turkish Water Polo Federation',
        title: 'Water Polo Management System',
        description:
          'It is aimed to monitor and manage the competitions organized by the federation more easily through the system to be implemented, as well as to easily report game statistics.',
        features: [
          'Referee, Athlete, Coach, Personnel Management',
          'Competition Management',
          'Punishment Module',
          'Decision Support Module',
          'Web and mobile compatible',
          'Reporting',
        ],
        image: '/uploads/su-topu-fed.jpg',
        homeImage: '/uploads/su-topu-fed.jpg',
        url: 'https://sutopu.gov.tr/',
        ctaLabel: 'More Info',
        featuredOnHome: true,
        categoryBadge: 'Sports Federation Platform',
      },
      {
        id: 'tarim-kredi-intranet',
        client: 'Turkey Agricultural Credit Cooperatives',
        title: 'Intranet Project',
        description:
          'Agricultural Credit Cooperatives provide service from hundreds of points in Turkey. With the implementation of the intranet project, complex business issues and internal communication processes become much more powerful and productivity at work will increase exponentially.',
        features: [
          'User Management and Authorization',
          'Announcement/News Module',
          'Human Resources Processes Module',
          'Demand Management Module',
        ],
        image: '/uploads/tarim-kredi-kooperatifi.jpg',
        homeImage: '/uploads/tarim-kredi-kooperatifi.jpg',
        url: 'https://www.tarimkredi.org.tr/',
        ctaLabel: 'More Info',
        featuredOnHome: true,
        categoryBadge: 'Enterprise Intranet & B2E',
      },
      {
        id: 'parkim-crm',
        client: 'Parkim Perfume Plastic and Chemistry',
        title: 'CRM System',
        description:
          "As a result of the analysis made specifically for Parkim's business dynamics, the company's offer and order processes to customers are developed in a way that integrates with Mikro.",
        features: ['Mikro Integration', 'CRM', 'Work Flow', 'Internal Communication'],
        image: '/uploads/prj-parkim-crm-min.jpg',
        url: 'http://www.parkimgroup.com/',
        ctaLabel: 'More Info',
        featuredOnHome: false,
        categoryBadge: 'ERP-Integrated CRM',
      },
      {
        id: 'cinigaz-kys',
        client: 'Kütahya Çinigas Distribution',
        title: 'Quality Management System',
        description:
          'We continue our work on Kütahya Çinigaz to make its service to its subscribers more consistent and sustainable.',
        features: ['Quality Management and Planning', 'Quality Assurance and Control'],
        image: '/uploads/kutahya-cini-gaz--min.jpg',
        homeImage: '/uploads/kutahya-cini-gaz.jpg',
        url: 'https://www.cinigaz.com/',
        ctaLabel: 'More Info',
        featuredOnHome: true,
        categoryBadge: 'Quality Management System',
      },
      {
        id: 'abb-veri-toplama',
        client: 'Ankara Metropolitan Municipality',
        title: 'Data Collecting Application',
        description:
          'A data collection application was implemented in order to transfer the data collected in ABB subsidiaries to the center and move the municipality to a data-oriented structure.',
        features: ['Data Collecting', 'Reporting', 'Data-Oriented Work', 'Central Management'],
        image: '/uploads/prj-abb-veri-toplama---min.jpg',
        url: 'https://www.ankara.bel.tr',
        ctaLabel: 'More Info',
        featuredOnHome: false,
        categoryBadge: 'Public Data Architecture',
      },
      {
        id: 'tigem-bayi-otomasyon',
        client: 'TİGEM',
        title: 'Franchise / Dealer Automation System',
        description:
          'TİGEM can easily manage its seed sales to more than 280 dealers and 14 agricultural enterprises spread over 81 provinces in the online environment.',
        features: ['Cloud Based Technology', 'High Security', 'Simple Interface', 'Mobile Compatible'],
        image: '/uploads/prj-bayi-otomaton-tigem-min.jpg',
        homeImage: '/uploads/tigem-bayi-otomasyon.jpg',
        url: 'https://www.tigem.gov.tr/',
        ctaLabel: 'More Info',
        featuredOnHome: true,
        categoryBadge: 'Nationwide Dealer Network',
      },
      {
        id: 'tigem-at-ihale',
        client: 'TİGEM',
        title: 'Electronic Horse Tender System',
        description:
          'The application was coded and accepted for the electronic sales of purebred horses produced by TİGEM.',
        features: ['Tender Management', 'Sales Management', 'Request Collection Screen'],
        image: '/uploads/prj-at-ihale-sistemi-tigem-min.jpg',
        url: 'https://www.tigem.gov.tr/',
        ctaLabel: 'More Info',
        featuredOnHome: false,
        categoryBadge: 'E-Tender & Auction Platform',
      },
    ] as ProjectItem[],
    products: [
      {
        id: 'ozbi',
        name: 'OzBI',
        tagline: 'AI for Your ERP Data',
        description: 'Ask questions about your Logo, Mikro and SQL data in plain language. Get tables, charts and analysis with OzBI. Choose a deployment that fits your organisation.',
        features: ['Natural Language Queries', 'Logo and Mikro Integration', 'Tables and Charts', 'Local or Hybrid Deployment'],
        visual: 'ozbi-flow',
        url: 'https://www.ozbiapp.com.tr/',
        ctaLabel: 'Explore OzBI',
        statusBadge: 'New Product / AI',
        isNew: true,
        featuredOnHome: true,
      },
      {
        id: 'strife',
        name: 'Strife',
        tagline: 'Sports Event and Competition Management',
        description: 'Manage single-sport and multi-sport events in one platform. Track club and athlete registrations, accreditation, tournaments and match results together.',
        features: ['Participants and Accreditation', 'Tournaments, Draws and Fixtures', 'Scores and Match Statistics', 'Referees and Officials', 'Results via API and Widgets'],
        image: '/uploads/products/strife-tournament.png',
        imageWidth: 2560,
        imageHeight: 1952,
        url: '/en/#contact-us',
        ctaLabel: 'Request a Demo',
        statusBadge: 'Sports Management Platform',
        featuredOnHome: true,
      },
      {
        id: 'tork',
        featuredOnHome: true,
        name: 'TORK',
        tagline: 'Business Management Software',
        description:
          'TORK is a business management software that allows SMEs to easily manage their daily works with its CRM, finance, advanced report tool and to do features.',
        features: ['CRM', 'Finance', 'Work Follow', 'Report'],
        image: '/uploads/prj-torkapp.jpg',
        url: 'https://torkapp.com',
        ctaLabel: 'More Info',
        statusBadge: 'Cloud SaaS Product',
      },
      {
        id: 'reportql',
        featuredOnHome: true,
        name: 'Reportql',
        tagline: 'Access Data Anywhere',
        description:
          'It is an easy-to-use report application that allows businesses to access data in local and cloud at any time.',
        features: [
          'Access to Data Anywhere',
          'Online Reports',
          'Compatible with Different Solutions',
          'Easy Report Generation in 4 Steps',
        ],
        image: '/uploads/prj-reportql.jpg',
        url: 'https://www.reportql.com/',
        ctaLabel: 'More Info',
        statusBadge: 'Data Preparation & BI',
      },
      {
        id: 'kys',
        name: 'KYS',
        tagline: 'Quality Management and Planning System',
        description:
          'The KYS software development process continues in order to determine whether the quality standards are met in the business processes of the companies and to build customer satisfaction.',
        features: ['Quality Planning', 'Quality Control'],
        image: '/uploads/prj-kys.jpg',
        statusBadge: 'Enterprise Quality Platform',
      },
    ] as ProductItem[],
    testimonials: [
      {
        quote:
          'With the system developed by Kuadron, we can easily manage the tender and sales processes of thoroughbred horses in an electronic environment. We would like to thank the project and software development team for their successful work.',
        author: 'TİGEM',
        role: 'TİGEM - Equestrian Department',
        avatar: '/uploads/refs/tigem.png',
      },
      {
        quote:
          'We used to use tools like Word or Excel to manage resources in our business. Therefore, processes would become complex and challenging. After experiencing TORK, it has become much more convenient to manage daily operations. Now we can devote the remaining time to growing our business.',
        author: 'Orçun Çankaya',
        role: 'Argesan Kalıp San. Tic. - Board Member',
        avatar: '/uploads/refs/orcun-cankaya.jpeg',
      },
      {
        quote:
          'Our sales team can prepare professional offers and track customer feedback online with TORK CRM. We can easily follow the stages of the sale and the next step to be taken on the kanban board. So, we significantly increased the conversion rate of our offers.',
        author: 'Necati Yazgan',
        role: 'Conpromac - Board Member',
        avatar: '/uploads/refs/necati-yazgan.jpeg',
      },
      {
        quote:
          "By strengthening the business processes between us and our dealers, we started to provide faster and result-oriented service to our end consumers. We can now manage stock and current account follow-ups much more easy with TORK's Mikro Software integration.",
        author: 'Tunç Öztürk',
        role: 'Teatub - Manager',
        avatar: '/uploads/refs/tunc-ozturk.jpg',
      },
      {
        quote:
          'During the pandemic, we had the chance to manage almost all the resources of our business with TORK, independently of the location. With the improvements that we experienced in offer, order, stock management and e-invoice processes, our business spent the pandemic period making profit instead of losing turnover.',
        author: 'İsmail Hakkı Yağcızeybek',
        role: 'LSK Yapısal Ahşap - Manager',
        avatar: '/uploads/refs/ismail-hakki.jpg',
      },
      {
        quote:
          'Our biggest challenge was the lack of coordination between the sales team. CRM application which was developed by Kuadron specifically for our business, we now have instant access to all kinds of information about our works, and now we can make data-oriented decisions by making detailed reports of our product/services.',
        author: 'Fatih Beşel',
        role: 'IOTISS Akıllı İş Çözümleri A.Ş. - Sales Manager',
        avatar: '/uploads/refs/fatih-b.jpeg',
      },
      {
        quote:
          'With the implementation of the ERP program, we had the opportunity to monitor and manage the activities of our business such as accounting, CRM, project management, purchasing, stock and production. We have increased our productivity by effectively planning our resources. I would like to thank the Kuadron team, who are always with us during the orientation and training period.',
        author: 'Burak Sivrikaya',
        role: 'Çözüm İş Grup - Manager',
        avatar: '/uploads/refs/burak-sivrikaya.jpeg',
      },
      {
        quote:
          'We are a company that carries out project-based business. So, we need software that runs our work. Thanks to the Project Management System (PMS) which we developed with Kuadron, we were able to control costs for each project we carry out, and we had the opportunity to plan the issues that require follow-up on employee basis.',
        author: 'Ruhi Gönüllü',
        role: 'Mavion Bilişim Teknolojileri - General Manager Assistant',
        avatar: '/uploads/refs/ruhi-gonullu.jpeg',
      },
    ] as TestimonialItem[],
    featuredNewsSection: {
      eyebrow: 'In The Press',
      title: 'Featured News',
      viewAllLabel: 'View All News',
      viewAllHref: '/en/news',
      cards: [
        {
          title: 'Gökhan Öziç became the CEO of Kuadron Tech.',
          excerpt: 'Gökhan Öziç who has signed important projects in information technologies industry, became the new CEO of the company.',
          image: '/uploads/news/go-gm1.jpg',
          url: 'https://sanayigazetesi.com.tr/gokhan-ozic-kuadron-bilisimin-yeni-genel-muduru-oldu/',
          source: 'Sanayi Gazetesi',
          ctaLabel: 'Read more',
        },
        {
          title: 'Kuadron developed a new generation Business Management Solution.',
          excerpt: 'TORK has been developed by Kuadron Bilişim as a new generation BMS.',
          image: '/uploads/news/hurriyet.jpg',
          url: 'https://www.hurriyet.com.tr/teknoloji/yeni-nesil-sirket-yonetim-uygulamasi-gelistirdi-41146021',
          source: 'Hürriyet',
          ctaLabel: 'Read more',
        },
        {
          title: 'Digital transformation has increased the demand for domestic business management solutions.',
          excerpt: 'By 2025, the global business management software market will average 9% each year.',
          image: '/uploads/news/dha-tork.jpg',
          url: 'https://www.ntv.com.tr/ekonomi/eren-culcuoglu-dijital-donusum-yerli-is-yonetimi-uygulamalarina-talebi-artirdi,h6WQpxlju0qbm_9egEVlag',
          source: 'NTV',
          ctaLabel: 'Read more',
        },
        {
          title: 'Domestic business management solutions are preparing to open to global markets.',
          excerpt: 'Eren Çulcuoğlu, Sales and Marketing Director of the business software startup torkapp.com...',
          image: '/uploads/news/news-haberler.jpg',
          url: 'https://www.haberler.com/is-yazilimi-pazari-2025-e-kadar-160-milyar-dolar-14633783-haberi/',
          source: 'Haberler.com',
          ctaLabel: 'Read more',
        },
      ] as FeaturedNewsCard[],
    },
    about: {
      metaTitle: 'About Us | Kuadron Information Technologies Inc.',
      metaDescription:
        'We adopt a high quality approach at all points where our customers interact with us, and we work hard to maximize our total brand value.',
      eyebrow: 'Corporate',
      title: 'About Us',
      valuesTitle: 'Our Values',
      valuesDescription:
        'More than 15 years of work experience has taught us to put customer needs at the center instead of focusing on competition. We adopt a high quality approach at all points where our customers interact with us, and we work so hard to maximize our total brand value.',
      principles: [
        'Producing useful and minimalist technologies',
        'Focusing on the solution rather than a problem',
        'Working customer-centric rather than competing',
        'Seeing human as a value, not a resource',
      ],
      valueCards: [
        {
          title: 'Listen First',
          description:
            'We think that communication should progress within two channels, and we always put listening at the beginning of the dialogue.',
          icon: 'users',
        },
        {
          title: 'Customer Focused',
          description:
            'Our main goal is to understand customer demands correctly and offer solutions just for needs and to create happy customers.',
          icon: 'award',
        },
        {
          title: 'Sustainable Growth',
          description:
            'We believe that labor and capital efficiency will be achieved at the right time, right project and investment in the right product. Thus, stable growth will be shaped by conscious strategies.',
          icon: 'chart',
        },
      ],
      cultureBlocks: [
        {
          title: 'Working with team spirit lies behind all successes.',
          description:
            'We act with the principles of unity, integrity, understanding and creativity in every business we are involved in. We take care to act as a team in every decision taken with these values.',
          image: '/uploads/site/kuadron-ekip-ruhu.jpg',
        },
        {
          title: 'We support each employee in the team to reveal their own potential.',
          description:
            'We support the development of our human resources independently of the department, and we believe that the employee should rise by gaining skills and competence based on merit.',
          image: '/uploads/site/kuadron-takim-gorev.jpg',
        },
      ],
    },
    franchising: {
      metaTitle: 'Franchising | Kuadron Information Technologies Inc.',
      metaDescription:
        'We take your business further with our cloud-based products that add value to the evolving needs of working life. Make your dealership application today!',
      eyebrow: 'Partner Ecosystem',
      title: 'Franchising',
      introTitle: 'We are looking forward to meet you!',
      introDescription:
        'We are excited to carry your work forward with our products which add value to the evolving needs of business life.',
      faqs: [
        {
          question: 'For which products can I apply for franchising?',
          answer:
            'You can apply for franchising for the business software TORK and Reportql, which are trademarks registered by Kuadron. For detailed information please contact via info@kuadron.com.',
        },
        {
          question: 'What is the sales/business model of the products?',
          answer:
            'TORK provides the franchisor with an annual recurring income advantage with its PaaS/SaaS business model. For profitability ratios and detailed information, please contact kanal@kuadron.com.',
        },
        {
          question: 'Do you provide support for the marketing of the products?',
          answer:
            'Support for media and press relations, graphic design, visual communication, event management, digital marketing and campaign management is managed by the Kuadron Corporate Communications Directorate. Business partners who complete the franchise process are provided with support on the above subjects. For detailed information, you can send an e-mail to kurumsaliletisim@kuadron.com.',
        },
        {
          question: 'Do you carry out product support and training activities?',
          answer:
            'Yes. You can join our online support training with webinars organized upon request. For detailed information, send an e-mail to destek@kuadron.com.',
        },
      ],
      benefitsTitle: 'Partner Advantages',
      benefits: [
        {
          title: 'Latest Technology Products',
          description: 'Help businesses make a difference in their daily business with our new generation software.',
          icon: 'rocket',
        },
        {
          title: 'Support and Education',
          description: 'Your personal development is always at the forefront with webinars and training organized under the coordination of Kuadron Academy.',
          icon: 'award',
        },
        {
          title: 'Problem Solution',
          description: "Let's partner on sectoral and vertical solutions that work in harmony with the products developed by Kuadron.",
          icon: 'code',
        },
        {
          title: 'Customer Loyalty Management',
          description: 'We conduct surveys to measure customer satisfaction and share data-based analyzes with our business partners.',
          icon: 'chart',
        },
        {
          title: 'Marketing',
          description: 'By ensuring that our products are visible on the market, we make certain the value that we create meets with the right target audience.',
          icon: 'compass',
        },
        {
          title: 'Digital Transformation',
          description: 'We work very close with our business partners so that businesses can go through their digital transformation processes painlessly.',
          icon: 'layers',
        },
      ],
      ctaBannerTitle: 'Contact us!',
      ctaBannerSubtitle: 'You can contact us and submit your partnership application using the button below.',
      ctaButtonLabel: 'Franchise Application Form',
      bannerImage: '/assets/img/bayi-iletisim1.jpg',
    },
    career: {
      metaTitle: 'Career | Kuadron Information Technologies Inc.',
      metaDescription: 'Check out the open positions now to be a part of the Kuadron team!',
      eyebrow: 'Careers at Kuadron',
      title: 'Career',
      subtitle: 'Join Our Team!',
      openPositionsTitle: 'Open Positions',
      positions: [
        {
          title: 'Full-Stack Developer',
          location: 'Ankara, Remote',
          badge: 'Engineering',
        },
        {
          title: 'Front-end Developer',
          location: 'Ankara, Remote',
          badge: 'Engineering',
        },
        {
          title: 'Senior Product Marketing Manager',
          location: 'Ankara, Full Time/Remote',
          badge: 'Product & Marketing',
        },
        {
          title: 'Marketing Intern',
          location: 'Ankara, Part-Time/Remote',
          badge: 'Will Close Soon',
        },
      ],
      hrTitle: 'Our Human Resources Policy',
      hrDescription:
        'We owe the quality and success we have achieved in the industry to our employees. We take care to create a profile that works in a team spirit by blending the experiences of our employees who have just joined our family and contributed to our day. Because we see human not as a "resource", but as a "value".',
      hrTraits: [
        'Clear',
        'Intrinsically Focused',
        'Participative',
        'Productive',
        'Innovator',
        'Continuous Learning',
        'Environmentally Sensitive',
      ],
      hrImage: '/uploads/site/human-resources-img.jpg',
      cvCtaTitle: 'Submit Your Resume!',
      cvCtaSubtitle: 'Share your CV with us now, along with the position you are interested in.',
      cvCtaButton: 'Apply Now',
    },
    softwareDev: {
      metaTitle: 'Software Development | Kuadron Information Technologies Inc.',
      metaDescription: 'Kuadron takes care of coding within the framework of agile software development principles.',
      eyebrow: 'Our Services',
      title: 'Software Development',
      lead:
        'Kuadron takes care of coding within the framework of agile software development principles. The development service can be summarized as designing the system specific to the business dynamics of the companies, maintaining the software and updating it when necessary.',
      workflowTitle: 'Seamless Workflow',
      workflowSubtitle:
        'We analyze your business processes meticulously and design the necessary system design by anticipating your future needs.',
      steps: [
        {
          number: '01',
          title: 'Analysis and Design',
          description: 'By analyzing your business dynamics, we reveal the most suitable system design for your company.',
        },
        {
          number: '02',
          title: 'Software Development',
          description: 'Our software engineers use the latest technology to code the project with the principle of iterative development.',
        },
        {
          number: '03',
          title: 'Test Process',
          description: 'Our support and test team makes various experiments on the project to detect errors in the software.',
        },
        {
          number: '04',
          title: 'Delivery',
          description: 'For the projects whose development and testing processes are completed, final approval is obtained and the delivery stage is started.',
        },
      ] as WorkflowStep[],
      projectsTitle: 'Projects',
    },
    productDev: {
      metaTitle: 'Product Development and Marketing | Kuadron Information Technologies Inc.',
      metaDescription:
        'We develop technologies that allow companies to do business independently of the platform without incurring investment costs.',
      eyebrow: 'Our Services',
      title: 'Product Development and Marketing',
      lead:
        'We develop technologies that allow companies to do business with minimal payments regardless of the platform, without incurring investment costs (license/server cost, training, support, updates).',
      workflowTitle: 'From Idea to Product',
      workflowSubtitle:
        'We meticulously design all processes from the idea stage of the software product to the market launch.',
      steps: [
        {
          number: '01',
          title: 'Idea and Planning',
          description: 'Business ideas with high product potential are evaluated, and the most suitable ones put on the table.',
        },
        {
          number: '02',
          title: 'Analysis, Prototype and Test',
          description: 'Test processes are run by creating a prototype (MVP) for the product whose business plan is completed.',
        },
        {
          number: '03',
          title: 'Market Test',
          description: 'The marketing team carries out the pricing policy, market research and branding processes.',
        },
        {
          number: '04',
          title: 'Commercialization',
          description: 'Our sales partners contribute to the commercial activities of the final product and present the product to the market.',
        },
      ] as WorkflowStep[],
      productsTitle: 'Products',
    },
    digitalTransformation: {
      metaTitle: 'Digital Transformation Consultancy | Kuadron Information Technologies Inc.',
      metaDescription:
        'We determine a roadmap for your company to adapt to digital transformation and design your digitalization process meticulously.',
      eyebrow: 'Our Services',
      title: 'Digital Transformation Consultancy',
      lead:
        'Digitization has become a necessity rather than a choice for companies. Companies that cannot achieve digitalization may cause business loss because they cannot adapt to the requirements of the new age.',
      workflowTitle: 'Step by Step Digital Transformation',
      workflowSubtitle:
        'We determine a roadmap for your company to adapt to digital transformation and design your digitalization process meticulously.',
      steps: [
        {
          number: '01',
          title: 'Preparation Phase',
          description: 'Digital transformation is a journey. We prepare your business for transformation and make a needs analysis.',
        },
        {
          number: '02',
          title: 'Creating a Digital Culture',
          description: 'We work to spread digitalization to all levels and increase efficiency between departments.',
        },
        {
          number: '03',
          title: 'Legislation and Network Security',
          description: 'We transfer paper documents to digital and apply bank-level security protocols against cyber attacks.',
        },
        {
          number: '04',
          title: 'Customer Experience',
          description: 'Increase productivity at work by providing the customer with a different experience with digital transformation.',
        },
      ] as WorkflowStep[],
    },
    newsPage: {
      metaTitle: 'News | Kuadron Information Technologies Inc.',
      metaDescription: 'Press releases, media coverage, and announcements from Kuadron Information Technologies Inc.',
      eyebrow: 'Press Archive',
      title: 'News',
      subtitle: 'Media appearances and press coverage featuring Kuadron, TORK, and Reportql.',
      searchPlaceholder: 'Search headlines or publications (e.g. TORK, NTV, Webrazzi)...',
      searchLabel: 'Search news',
      allYearsLabel: 'All Years',
      readLabel: 'READ',
      emptyLabel: 'No press articles matched your search.',
    },
    contact: {
      anchor: 'contact-us',
      eyebrow: 'Contact',
      title: 'Contact Us',
      description:
        "You can ask us all questions about Digital Transformation and business software that will increase your company's efficiency.",
      formTitle: 'Quick Contact Form',
      jotformButton: 'Open Detailed Contact Form',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your Full Name',
      nameError: 'Please enter your full name.',
      phoneLabel: 'Phone',
      phonePlaceholder: '+90 5XX XXX XX XX',
      phoneError: 'Please enter a valid phone number.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@company.com',
      emailError: 'Please enter a valid email address.',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Tell us briefly about your project or question...',
      messageError: 'Please enter your message.',
      submitLabel: 'Send Message',
      submittingLabel: 'Sending...',
      successMessage: 'Thank you! Your message has been received and our team will get back to you shortly.',
      fallbackNotice: 'Your message has not been sent. Send it from your email app or open the detailed contact form.',
      addressTitle: 'Headquarters',
      mapLabel: 'View on Google Maps',
    },
    footer: {
      summary:
        'Operating at Ankara OSTİM Technopark, Kuadron develops tailor-made enterprise software systems and cloud-native business management products.',
      corporateTitle: 'Corporate',
      corporateLinks: [
        { label: 'About Us', href: '/en/about-us' },
        { label: 'Franchising', href: '/en/franchising' },
        { label: 'Career', href: '/en/career' },
        { label: 'News', href: '/en/news' },
        { label: 'Blog (TR)', href: '/blog' },
        { label: 'Cookie Policy', href: '/en/cookie-policy' },
      ],
      servicesTitle: 'Our Services',
      servicesLinks: [
        { label: 'Software Development', href: '/en/software-development' },
        { label: 'Product Development and Marketing', href: '/en/product-development-and-marketing' },
        { label: 'Digital Transformation Consultancy', href: '/en/digital-transformation-consultancy' },
      ],
      completedProjectsTitle: 'Completed Projects',
      completedProjects: [
        { label: 'Kütahya Çinigas - QMS', href: 'https://www.cinigaz.com/' },
        { label: 'Parkim Grup - CRM System', href: 'http://www.parkimgroup.com/tr/index' },
        { label: 'TİGEM - Online Horse Tender System', href: 'https://www.tigem.gov.tr/' },
        { label: 'ARGESAN - CRM System', href: 'https://www.argesan.com.tr/' },
      ],
      contactTitle: 'Contact Us',
      copyright: '© 2017–2026 Kuadron Information Technologies Inc. All rights reserved.',
    },
    cookieBanner: {
      text: 'May we measure site use? Analytics loads only if you accept.',
      linkLabel: 'Click here for our Cookie Policy.',
      linkHref: '/en/cookie-policy',
      acceptLabel: 'Allow analytics',
    },
  },
} as const;
