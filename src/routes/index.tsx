import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent, FALLBACK_BANNER, FALLBACK_PRODUCTS, FALLBACK_LOOKBOOK, type Product, type LookbookImage, type Banner } from "@/lib/site-content";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAISON ORÉ — Autumn/Winter Collection 2026" },
      { name: "description", content: "Considered tailoring, raw textures, and warm tones. Discover the new season from Maison Oré." },
      { property: "og:title", content: "MAISON ORÉ — Autumn/Winter 2026" },
      { property: "og:description", content: "Considered tailoring, raw textures, and warm tones." },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent,
    initialData: { banner: FALLBACK_BANNER, products: FALLBACK_PRODUCTS, lookbook: FALLBACK_LOOKBOOK },
  });

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero banner={data.banner} />
      <Marquee />
      <Collection products={data.products} />
      <Lookbook items={data.lookbook} />
      <Story />
      <Newsletter />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-6 flex items-center justify-between text-cream mix-blend-difference">
      <nav className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em]">
        <a href="#collection" className="hover:opacity-70 transition">Collection</a>
        <a href="#lookbook" className="hover:opacity-70 transition">Lookbook</a>
        <a href="#story" className="hover:opacity-70 transition">Story</a>
      </nav>
      <a href="#" className="font-display text-2xl tracking-tight">Maison Oré</a>
      <nav className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em]">
        <a href="#" className="hover:opacity-70 transition">Search</a>
        <Link to="/auth" className="hover:opacity-70 transition">Admin</Link>
        <a href="#" className="hover:opacity-70 transition">Bag (0)</a>
      </nav>
    </header>
  );
}

function Hero({ banner }: { banner: Banner }) {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-ink">
      <img src={banner.image_url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-16 md:pb-24 text-cream">
        <p className="text-xs uppercase tracking-[0.3em] mb-4 opacity-80">{banner.eyebrow}</p>
        <h1 className="font-display text-6xl md:text-[9rem] leading-[0.9] max-w-5xl whitespace-pre-line">
          {banner.headline}
        </h1>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href={banner.cta_href} className="inline-flex items-center gap-3 bg-cream text-ink px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-clay transition">
            {banner.cta_label}
            <span aria-hidden>→</span>
          </a>
          <a href="#lookbook" className="text-xs uppercase tracking-[0.2em] border-b border-cream/40 pb-1 hover:border-cream transition">
            View Lookbook
          </a>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["New Arrivals", "Free Shipping over $200", "Crafted in Portugal", "AW26 Now Live", "Atelier Edition"];
  const row = [...items, ...items, ...items];
  return (
    <div className="border-y border-border bg-cream overflow-hidden py-5">
      <div className="flex gap-16 marquee whitespace-nowrap text-xs uppercase tracking-[0.3em]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-16">
            {t}
            <span aria-hidden className="text-rust">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Collection({ products }: { products: Product[] }) {
  return (
    <section id="collection" className="px-6 md:px-12 py-24 md:py-32">
      <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Featured</p>
          <h2 className="font-display text-5xl md:text-7xl max-w-xl">The Season's <em className="italic">Essentials</em>.</h2>
        </div>
        <a href="#" className="text-xs uppercase tracking-[0.2em] border-b border-ink pb-1">All Pieces →</a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
        {products.map((p) => (
          <a key={p.id} href="#" className="group block">
            <div className="relative overflow-hidden bg-muted aspect-[3/4] mb-4">
              <img src={p.image_url} alt={p.name} loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              {p.tag && (
                <span className="absolute top-3 left-3 bg-cream/90 text-ink text-[10px] uppercase tracking-[0.2em] px-2 py-1">{p.tag}</span>
              )}
            </div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-display text-lg">{p.name}</h3>
              <span className="text-sm text-muted-foreground">{p.price}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Lookbook({ items }: { items: LookbookImage[] }) {
  return (
    <section id="lookbook" className="bg-ink text-cream px-6 md:px-12 py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.3em] opacity-70 mb-4">Lookbook</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Studies in<br /><em className="italic">warm</em> minimalism.
          </h2>
        </div>
        <p className="md:col-span-5 md:col-start-8 self-end text-base md:text-lg leading-relaxed opacity-80">
          Each piece is conceived in our Lisbon atelier, patterned, cut, and finished by hand. The Autumn/Winter 26 collection draws from the textures of unpolished stone, sun-faded linen, and the russet of late October.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-4 md:gap-6">
        {items.map((img, idx) => {
          const span = idx % 4 === 0 || idx % 4 === 3 ? "md:col-span-7" : "md:col-span-5";
          const tall = idx < 2 ? "h-[60vh] md:h-[80vh]" : "h-[50vh] md:h-[70vh]";
          return (
            <figure key={img.id} className={span}>
              <img src={img.image_url} alt={img.caption} loading="lazy" className={`w-full ${tall} object-cover`} />
              <figcaption className="text-xs uppercase tracking-[0.2em] opacity-60 mt-3">{img.caption}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="px-6 md:px-12 py-24 md:py-32 bg-clay/30">
      <div className="grid md:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
        <div className="md:col-span-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Our Atelier</p>
          <h2 className="font-display text-5xl md:text-6xl mb-8 leading-[1]">
            Slow craft.<br />
            <em className="italic">Lasting</em> form.
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-foreground/80 max-w-lg mb-6">
            Founded in 2014, Maison Oré is a small house of fifteen makers. We work in deadstock wool, Portuguese cashmere, and naturally tanned leather, producing fewer than 600 garments each season.
          </p>
          <a href="#" className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-rust transition">
            Read the Manifesto →
          </a>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 text-center border-t border-border">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">The Journal</p>
      <h2 className="font-display text-4xl md:text-6xl max-w-3xl mx-auto mb-8 leading-[1.05]">
        Letters from the <em className="italic">atelier</em>, twice a month.
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex border-b border-ink">
        <input type="email" placeholder="your@email.com"
          className="flex-1 bg-transparent py-3 px-1 text-sm placeholder:text-muted-foreground focus:outline-none" />
        <button type="submit" className="text-xs uppercase tracking-[0.2em] px-4 hover:text-rust transition">
          Subscribe
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-cream px-6 md:px-12 py-16">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div>
          <a href="#" className="font-display text-3xl">Maison Oré</a>
          <p className="text-xs uppercase tracking-[0.2em] opacity-60 mt-3">Lisbon · Est. 2014</p>
        </div>
        {[
          { h: "Shop", l: ["Women", "Men", "Atelier Edition", "Archive Sale"] },
          { h: "House", l: ["Our Story", "Sustainability", "Stockists", "Press"] },
          { h: "Care", l: ["Contact", "Shipping", "Returns", "Garment Care"] },
        ].map((col) => (
          <div key={col.h}>
            <h4 className="text-xs uppercase tracking-[0.3em] mb-5 opacity-70">{col.h}</h4>
            <ul className="space-y-3 text-sm">
              {col.l.map((i) => <li key={i}><a href="#" className="hover:text-clay transition">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between items-center text-xs uppercase tracking-[0.2em] opacity-60 pt-8 border-t border-cream/10">
        <p>© 2026 Maison Oré. All rights reserved.</p>
        <p>Privacy · Terms · Cookies</p>
      </div>
    </footer>
  );
}
