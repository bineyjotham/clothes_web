import { t as supabase } from "./client-BRKMugTt.mjs";
import { t as hero_default } from "./hero-BLnvWFMe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-content-D4nRf8os.js
var look1_default = "/assets/look1-DXY7tM8h.jpg";
var look2_default = "/assets/look2-NfH11yo4.jpg";
var look3_default = "/assets/look3-zTvgRCfM.jpg";
var campaign_default = "/assets/campaign-CPVg47NT.jpg";
var FALLBACK_BANNER = {
	image_url: hero_default,
	eyebrow: "Autumn / Winter 2026",
	headline: "A Quiet Devotion to Form.",
	cta_label: "Shop the Collection",
	cta_href: "#collection"
};
var FALLBACK_PRODUCTS = [
	{
		id: "f1",
		name: "Oversized Wool Coat",
		price: "$1,290",
		tag: "Atelier",
		image_url: hero_default,
		sort_order: 1,
		visible: true
	},
	{
		id: "f2",
		name: "Tailored Silk Blazer",
		price: "$890",
		tag: "New",
		image_url: look1_default,
		sort_order: 2,
		visible: true
	},
	{
		id: "f3",
		name: "Cashmere Knit, Camel",
		price: "$420",
		tag: "Essential",
		image_url: look2_default,
		sort_order: 3,
		visible: true
	},
	{
		id: "f4",
		name: "Long Trench, Sand",
		price: "$1,120",
		tag: "Signature",
		image_url: look3_default,
		sort_order: 4,
		visible: true
	}
];
var FALLBACK_LOOKBOOK = [
	{
		id: "l1",
		image_url: campaign_default,
		caption: "Look 01 — The Field Edit",
		sort_order: 1,
		visible: true
	},
	{
		id: "l2",
		image_url: look1_default,
		caption: "Look 02 — Evening Forms",
		sort_order: 2,
		visible: true
	},
	{
		id: "l3",
		image_url: look2_default,
		caption: "Look 03 — Cashmere Study",
		sort_order: 3,
		visible: true
	},
	{
		id: "l4",
		image_url: look3_default,
		caption: "Look 04 — In Motion",
		sort_order: 4,
		visible: true
	}
];
async function fetchSiteContent() {
	const [bannerRes, productsRes, lookbookRes] = await Promise.all([
		supabase.from("campaign_banner").select("*").eq("id", 1).maybeSingle(),
		supabase.from("products").select("*").eq("visible", true).order("sort_order"),
		supabase.from("lookbook_images").select("*").eq("visible", true).order("sort_order")
	]);
	return {
		banner: bannerRes.data && bannerRes.data.image_url ? {
			image_url: bannerRes.data.image_url,
			eyebrow: bannerRes.data.eyebrow,
			headline: bannerRes.data.headline,
			cta_label: bannerRes.data.cta_label,
			cta_href: bannerRes.data.cta_href
		} : FALLBACK_BANNER,
		products: productsRes.data && productsRes.data.length > 0 ? productsRes.data : FALLBACK_PRODUCTS,
		lookbook: lookbookRes.data && lookbookRes.data.length > 0 ? lookbookRes.data : FALLBACK_LOOKBOOK
	};
}
//#endregion
export { fetchSiteContent as i, FALLBACK_LOOKBOOK as n, FALLBACK_PRODUCTS as r, FALLBACK_BANNER as t };
