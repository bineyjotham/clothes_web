import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchSiteContent,
  type Product,
  type LookbookImage,
  type Banner,
  FALLBACK_BANNER,
} from "@/lib/site-content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Maison Oré" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"banner" | "products" | "lookbook">("banner");
  const [email, setEmail] = useState<string>("");

  const [banner, setBanner] = useState<Banner>(FALLBACK_BANNER);
  const [products, setProducts] = useState<Product[]>([]);
  const [lookbook, setLookbook] = useState<LookbookImage[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setEmail(u.user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.user.id);
      setIsAdmin(!!roles?.some((r) => r.role === "admin"));
      await reload();
    })();
  }, []);

  async function reload() {
    const { banner, products, lookbook } = await fetchSiteContent();
    setBanner(banner);
    // re-fetch ALL (including hidden) for admin
    const [p, l] = await Promise.all([
      supabase.from("products").select("*").order("sort_order"),
      supabase.from("lookbook_images").select("*").order("sort_order"),
    ]);
    setProducts(p.data ?? products);
    setLookbook(l.data ?? lookbook);
  }

  function flash(msg: string) {
    setStatus(msg);
    setTimeout(() => setStatus(null), 2000);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isAdmin === null) return <div className="p-12 text-sm text-muted-foreground">Loading…</div>;
  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-4xl mb-4">Not authorized</h1>
          <p className="text-muted-foreground mb-6">
            Your account ({email}) doesn't have admin access. The first account created on this site becomes the admin.
          </p>
          <button onClick={signOut} className="bg-ink text-cream px-6 py-3 text-xs uppercase tracking-[0.2em]">
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-display text-xl">Maison Oré</Link>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Admin</span>
        </div>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em]">
          <Link to="/" className="hover:text-rust">View Site →</Link>
          <button onClick={signOut} className="text-muted-foreground hover:text-ink">Sign out</button>
        </div>
      </header>

      {status && (
        <div className="bg-rust text-cream text-xs uppercase tracking-[0.2em] px-6 py-3 text-center">{status}</div>
      )}

      <div className="px-6 md:px-12 py-10">
        <nav className="flex gap-2 mb-10 border-b border-border">
          {(["banner", "products", "lookbook"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.2em] border-b-2 -mb-px transition ${
                tab === t ? "border-ink text-ink" : "border-transparent text-muted-foreground hover:text-ink"
              }`}
            >
              {t === "banner" ? "Campaign Banner" : t === "products" ? "Featured Collection" : "Lookbook"}
            </button>
          ))}
        </nav>

        {tab === "banner" && <BannerEditor banner={banner} setBanner={setBanner} flash={flash} reload={reload} />}
        {tab === "products" && <ProductsEditor products={products} reload={reload} flash={flash} />}
        {tab === "lookbook" && <LookbookEditor items={lookbook} reload={reload} flash={flash} />}
      </div>
    </main>
  );
}

/* ---------------- Banner ---------------- */

function BannerEditor({
  banner, setBanner, flash, reload,
}: { banner: Banner; setBanner: (b: Banner) => void; flash: (s: string) => void; reload: () => Promise<void> }) {
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const { error } = await supabase.from("campaign_banner").update(banner).eq("id", 1);
    setSaving(false);
    if (error) flash("Error: " + error.message);
    else { flash("Saved"); await reload(); }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Field label="Hero image URL" value={banner.image_url}
        onChange={(v) => setBanner({ ...banner, image_url: v })} placeholder="https://…" />
      {banner.image_url && (
        <img src={banner.image_url} alt="" className="w-full aspect-[3/2] object-cover border border-border" />
      )}
      <Field label="Eyebrow text" value={banner.eyebrow} onChange={(v) => setBanner({ ...banner, eyebrow: v })} />
      <Field label="Headline" value={banner.headline} onChange={(v) => setBanner({ ...banner, headline: v })}
        multiline placeholder="Use line breaks for stacked styling" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="CTA button label" value={banner.cta_label} onChange={(v) => setBanner({ ...banner, cta_label: v })} />
        <Field label="CTA link" value={banner.cta_href} onChange={(v) => setBanner({ ...banner, cta_href: v })} placeholder="#collection or https://…" />
      </div>
      <button onClick={save} disabled={saving}
        className="bg-ink text-cream px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-rust transition disabled:opacity-50">
        {saving ? "Saving…" : "Save Banner"}
      </button>
    </div>
  );
}

/* ---------------- Products ---------------- */

function ProductsEditor({
  products, reload, flash,
}: { products: Product[]; reload: () => Promise<void>; flash: (s: string) => void }) {
  async function add() {
    const { error } = await supabase.from("products").insert({
      name: "New piece", price: "$0", tag: "New",
      image_url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
      sort_order: (products.at(-1)?.sort_order ?? 0) + 10,
    });
    if (error) flash("Error: " + error.message);
    else { flash("Added"); await reload(); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) flash("Error: " + error.message);
    else { flash("Deleted"); await reload(); }
  }

  async function update(id: string, patch: Partial<Product>) {
    const { error } = await supabase.from("products").update(patch).eq("id", id);
    if (error) flash("Error: " + error.message);
    else { flash("Saved"); await reload(); }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{products.length} product{products.length === 1 ? "" : "s"}. Hidden items don't show on the site.</p>
        <button onClick={add} className="bg-ink text-cream px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-rust transition">
          + Add product
        </button>
      </div>
      <div className="space-y-4">
        {products.map((p) => (
          <ProductRow key={p.id} product={p} onSave={(patch) => update(p.id, patch)} onDelete={() => remove(p.id)} />
        ))}
        {products.length === 0 && <EmptyHint label="No products yet — the site is showing the starter set." />}
      </div>
    </div>
  );
}

function ProductRow({ product, onSave, onDelete }: { product: Product; onSave: (p: Partial<Product>) => void; onDelete: () => void }) {
  const [draft, setDraft] = useState(product);
  const dirty = JSON.stringify(draft) !== JSON.stringify(product);
  useEffect(() => setDraft(product), [product]);

  return (
    <div className="grid grid-cols-[100px_1fr_auto] gap-4 border border-border p-4 items-start bg-card">
      <img src={draft.image_url} alt="" className="w-[100px] h-[120px] object-cover bg-muted" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
        <Field label="Price" value={draft.price} onChange={(v) => setDraft({ ...draft, price: v })} />
        <Field label="Tag" value={draft.tag} onChange={(v) => setDraft({ ...draft, tag: v })} />
        <Field label="Sort order" value={String(draft.sort_order)}
          onChange={(v) => setDraft({ ...draft, sort_order: Number(v) || 0 })} />
        <div className="col-span-2">
          <Field label="Image URL" value={draft.image_url} onChange={(v) => setDraft({ ...draft, image_url: v })} />
        </div>
        <label className="col-span-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
          <input type="checkbox" checked={draft.visible} onChange={(e) => setDraft({ ...draft, visible: e.target.checked })} />
          Visible on site
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <button disabled={!dirty} onClick={() => onSave(draft)}
          className="bg-ink text-cream px-4 py-2 text-xs uppercase tracking-[0.2em] disabled:opacity-30 hover:bg-rust transition">
          Save
        </button>
        <button onClick={onDelete} className="text-xs uppercase tracking-[0.2em] text-destructive hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}

/* ---------------- Lookbook ---------------- */

function LookbookEditor({
  items, reload, flash,
}: { items: LookbookImage[]; reload: () => Promise<void>; flash: (s: string) => void }) {
  async function add() {
    const { error } = await supabase.from("lookbook_images").insert({
      image_url: "https://images.unsplash.com/photo-1485518882345-15568b007407?w=1200",
      caption: "New look",
      sort_order: (items.at(-1)?.sort_order ?? 0) + 10,
    });
    if (error) flash("Error: " + error.message);
    else { flash("Added"); await reload(); }
  }
  async function remove(id: string) {
    if (!confirm("Delete this image?")) return;
    const { error } = await supabase.from("lookbook_images").delete().eq("id", id);
    if (error) flash("Error: " + error.message);
    else { flash("Deleted"); await reload(); }
  }
  async function update(id: string, patch: Partial<LookbookImage>) {
    const { error } = await supabase.from("lookbook_images").update(patch).eq("id", id);
    if (error) flash("Error: " + error.message);
    else { flash("Saved"); await reload(); }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{items.length} image{items.length === 1 ? "" : "s"}</p>
        <button onClick={add} className="bg-ink text-cream px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-rust transition">
          + Add image
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((i) => (
          <LookbookCard key={i.id} item={i} onSave={(patch) => update(i.id, patch)} onDelete={() => remove(i.id)} />
        ))}
        {items.length === 0 && <EmptyHint label="No images yet — the site is showing the starter lookbook." />}
      </div>
    </div>
  );
}

function LookbookCard({ item, onSave, onDelete }: { item: LookbookImage; onSave: (p: Partial<LookbookImage>) => void; onDelete: () => void }) {
  const [draft, setDraft] = useState(item);
  const dirty = JSON.stringify(draft) !== JSON.stringify(item);
  useEffect(() => setDraft(item), [item]);

  return (
    <div className="border border-border p-4 bg-card space-y-3">
      <img src={draft.image_url} alt="" className="w-full aspect-[4/5] object-cover bg-muted" />
      <Field label="Image URL" value={draft.image_url} onChange={(v) => setDraft({ ...draft, image_url: v })} />
      <Field label="Caption" value={draft.caption} onChange={(v) => setDraft({ ...draft, caption: v })} />
      <Field label="Sort order" value={String(draft.sort_order)}
        onChange={(v) => setDraft({ ...draft, sort_order: Number(v) || 0 })} />
      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
        <input type="checkbox" checked={draft.visible} onChange={(e) => setDraft({ ...draft, visible: e.target.checked })} />
        Visible on site
      </label>
      <div className="flex gap-2">
        <button disabled={!dirty} onClick={() => onSave(draft)}
          className="flex-1 bg-ink text-cream py-2 text-xs uppercase tracking-[0.2em] disabled:opacity-30 hover:bg-rust transition">
          Save
        </button>
        <button onClick={onDelete} className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-destructive border border-destructive/30 hover:bg-destructive hover:text-cream transition">
          Delete
        </button>
      </div>
    </div>
  );
}

/* ---------------- Bits ---------------- */

function Field({
  label, value, onChange, placeholder, multiline,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3}
          className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-rust" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-rust" />
      )}
    </label>
  );
}

function EmptyHint({ label }: { label: string }) {
  return <div className="border border-dashed border-border p-8 text-center text-sm text-muted-foreground">{label}</div>;
}
