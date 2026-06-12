import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero.jpg";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";
import look3 from "@/assets/look3.jpg";
import campaignImg from "@/assets/campaign.jpg";

export type Product = {
  id: string;
  name: string;
  price: string;
  tag: string;
  image_url: string;
  sort_order: number;
  visible: boolean;
};

export type LookbookImage = {
  id: string;
  image_url: string;
  caption: string;
  sort_order: number;
  visible: boolean;
};

export type Banner = {
  image_url: string;
  eyebrow: string;
  headline: string;
  cta_label: string;
  cta_href: string;
};

export const FALLBACK_BANNER: Banner = {
  image_url: heroImg,
  eyebrow: "Autumn / Winter 2026",
  headline: "A Quiet Devotion to Form.",
  cta_label: "Shop the Collection",
  cta_href: "#collection",
};

export const FALLBACK_PRODUCTS: Product[] = [
  { id: "f1", name: "Oversized Wool Coat", price: "$1,290", tag: "Atelier", image_url: heroImg, sort_order: 1, visible: true },
  { id: "f2", name: "Tailored Silk Blazer", price: "$890", tag: "New", image_url: look1, sort_order: 2, visible: true },
  { id: "f3", name: "Cashmere Knit, Camel", price: "$420", tag: "Essential", image_url: look2, sort_order: 3, visible: true },
  { id: "f4", name: "Long Trench, Sand", price: "$1,120", tag: "Signature", image_url: look3, sort_order: 4, visible: true },
];

export const FALLBACK_LOOKBOOK: LookbookImage[] = [
  { id: "l1", image_url: campaignImg, caption: "Look 01 — The Field Edit", sort_order: 1, visible: true },
  { id: "l2", image_url: look1, caption: "Look 02 — Evening Forms", sort_order: 2, visible: true },
  { id: "l3", image_url: look2, caption: "Look 03 — Cashmere Study", sort_order: 3, visible: true },
  { id: "l4", image_url: look3, caption: "Look 04 — In Motion", sort_order: 4, visible: true },
];

export async function fetchSiteContent() {
  const [bannerRes, productsRes, lookbookRes] = await Promise.all([
    supabase.from("campaign_banner").select("*").eq("id", 1).maybeSingle(),
    supabase.from("products").select("*").eq("visible", true).order("sort_order"),
    supabase.from("lookbook_images").select("*").eq("visible", true).order("sort_order"),
  ]);

  const banner: Banner =
    bannerRes.data && bannerRes.data.image_url
      ? {
          image_url: bannerRes.data.image_url,
          eyebrow: bannerRes.data.eyebrow,
          headline: bannerRes.data.headline,
          cta_label: bannerRes.data.cta_label,
          cta_href: bannerRes.data.cta_href,
        }
      : FALLBACK_BANNER;

  const products =
    productsRes.data && productsRes.data.length > 0 ? productsRes.data : FALLBACK_PRODUCTS;
  const lookbook =
    lookbookRes.data && lookbookRes.data.length > 0 ? lookbookRes.data : FALLBACK_LOOKBOOK;

  return { banner, products, lookbook };
}
