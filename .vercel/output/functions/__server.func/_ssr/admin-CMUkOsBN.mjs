import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BRKMugTt.mjs";
import { i as fetchSiteContent, t as FALLBACK_BANNER } from "./site-content-D4nRf8os.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CMUkOsBN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("banner");
	const [email, setEmail] = (0, import_react.useState)("");
	const [banner, setBanner] = (0, import_react.useState)(FALLBACK_BANNER);
	const [products, setProducts] = (0, import_react.useState)([]);
	const [lookbook, setLookbook] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) return;
			setEmail(u.user.email ?? "");
			const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
			setIsAdmin(!!roles?.some((r) => r.role === "admin"));
			await reload();
		})();
	}, []);
	async function reload() {
		const { banner, products, lookbook } = await fetchSiteContent();
		setBanner(banner);
		const [p, l] = await Promise.all([supabase.from("products").select("*").order("sort_order"), supabase.from("lookbook_images").select("*").order("sort_order")]);
		setProducts(p.data ?? products);
		setLookbook(l.data ?? lookbook);
	}
	function flash(msg) {
		setStatus(msg);
		setTimeout(() => setStatus(null), 2e3);
	}
	async function signOut() {
		await supabase.auth.signOut();
		navigate({ to: "/auth" });
	}
	if (isAdmin === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-12 text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen flex items-center justify-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl mb-4",
					children: "Not authorized"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground mb-6",
					children: [
						"Your account (",
						email,
						") doesn't have admin access. The first account created on this site becomes the admin."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: signOut,
					className: "bg-ink text-cream px-6 py-3 text-xs uppercase tracking-[0.2em]",
					children: "Sign out"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-xl",
						children: "Maison Oré"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.3em] text-muted-foreground",
						children: "Admin"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 text-xs uppercase tracking-[0.2em]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-rust",
						children: "View Site →"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: signOut,
						className: "text-muted-foreground hover:text-ink",
						children: "Sign out"
					})]
				})]
			}),
			status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-rust text-cream text-xs uppercase tracking-[0.2em] px-6 py-3 text-center",
				children: status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 md:px-12 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex gap-2 mb-10 border-b border-border",
						children: [
							"banner",
							"products",
							"lookbook"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setTab(t),
							className: `px-5 py-3 text-xs uppercase tracking-[0.2em] border-b-2 -mb-px transition ${tab === t ? "border-ink text-ink" : "border-transparent text-muted-foreground hover:text-ink"}`,
							children: t === "banner" ? "Campaign Banner" : t === "products" ? "Featured Collection" : "Lookbook"
						}, t))
					}),
					tab === "banner" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerEditor, {
						banner,
						setBanner,
						flash,
						reload
					}),
					tab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsEditor, {
						products,
						reload,
						flash
					}),
					tab === "lookbook" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookbookEditor, {
						items: lookbook,
						reload,
						flash
					})
				]
			})
		]
	});
}
function BannerEditor({ banner, setBanner, flash, reload }) {
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function save() {
		setSaving(true);
		const { error } = await supabase.from("campaign_banner").update(banner).eq("id", 1);
		setSaving(false);
		if (error) flash("Error: " + error.message);
		else {
			flash("Saved");
			await reload();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero image URL",
				value: banner.image_url,
				onChange: (v) => setBanner({
					...banner,
					image_url: v
				}),
				placeholder: "https://…"
			}),
			banner.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: banner.image_url,
				alt: "",
				className: "w-full aspect-[3/2] object-cover border border-border"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Eyebrow text",
				value: banner.eyebrow,
				onChange: (v) => setBanner({
					...banner,
					eyebrow: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Headline",
				value: banner.headline,
				onChange: (v) => setBanner({
					...banner,
					headline: v
				}),
				multiline: true,
				placeholder: "Use line breaks for stacked styling"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "CTA button label",
					value: banner.cta_label,
					onChange: (v) => setBanner({
						...banner,
						cta_label: v
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "CTA link",
					value: banner.cta_href,
					onChange: (v) => setBanner({
						...banner,
						cta_href: v
					}),
					placeholder: "#collection or https://…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: save,
				disabled: saving,
				className: "bg-ink text-cream px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-rust transition disabled:opacity-50",
				children: saving ? "Saving…" : "Save Banner"
			})
		]
	});
}
function ProductsEditor({ products, reload, flash }) {
	async function add() {
		const { error } = await supabase.from("products").insert({
			name: "New piece",
			price: "$0",
			tag: "New",
			image_url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
			sort_order: (products.at(-1)?.sort_order ?? 0) + 10
		});
		if (error) flash("Error: " + error.message);
		else {
			flash("Added");
			await reload();
		}
	}
	async function remove(id) {
		if (!confirm("Delete this product?")) return;
		const { error } = await supabase.from("products").delete().eq("id", id);
		if (error) flash("Error: " + error.message);
		else {
			flash("Deleted");
			await reload();
		}
	}
	async function update(id, patch) {
		const { error } = await supabase.from("products").update(patch).eq("id", id);
		if (error) flash("Error: " + error.message);
		else {
			flash("Saved");
			await reload();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					products.length,
					" product",
					products.length === 1 ? "" : "s",
					". Hidden items don't show on the site."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: add,
				className: "bg-ink text-cream px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-rust transition",
				children: "+ Add product"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRow, {
				product: p,
				onSave: (patch) => update(p.id, patch),
				onDelete: () => remove(p.id)
			}, p.id)), products.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyHint, { label: "No products yet — the site is showing the starter set." })]
		})]
	});
}
function ProductRow({ product, onSave, onDelete }) {
	const [draft, setDraft] = (0, import_react.useState)(product);
	const dirty = JSON.stringify(draft) !== JSON.stringify(product);
	(0, import_react.useEffect)(() => setDraft(product), [product]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[100px_1fr_auto] gap-4 border border-border p-4 items-start bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: draft.image_url,
				alt: "",
				className: "w-[100px] h-[120px] object-cover bg-muted"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						value: draft.name,
						onChange: (v) => setDraft({
							...draft,
							name: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Price",
						value: draft.price,
						onChange: (v) => setDraft({
							...draft,
							price: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tag",
						value: draft.tag,
						onChange: (v) => setDraft({
							...draft,
							tag: v
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Sort order",
						value: String(draft.sort_order),
						onChange: (v) => setDraft({
							...draft,
							sort_order: Number(v) || 0
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Image URL",
							value: draft.image_url,
							onChange: (v) => setDraft({
								...draft,
								image_url: v
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "col-span-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: draft.visible,
							onChange: (e) => setDraft({
								...draft,
								visible: e.target.checked
							})
						}), "Visible on site"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: !dirty,
					onClick: () => onSave(draft),
					className: "bg-ink text-cream px-4 py-2 text-xs uppercase tracking-[0.2em] disabled:opacity-30 hover:bg-rust transition",
					children: "Save"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onDelete,
					className: "text-xs uppercase tracking-[0.2em] text-destructive hover:underline",
					children: "Delete"
				})]
			})
		]
	});
}
function LookbookEditor({ items, reload, flash }) {
	async function add() {
		const { error } = await supabase.from("lookbook_images").insert({
			image_url: "https://images.unsplash.com/photo-1485518882345-15568b007407?w=1200",
			caption: "New look",
			sort_order: (items.at(-1)?.sort_order ?? 0) + 10
		});
		if (error) flash("Error: " + error.message);
		else {
			flash("Added");
			await reload();
		}
	}
	async function remove(id) {
		if (!confirm("Delete this image?")) return;
		const { error } = await supabase.from("lookbook_images").delete().eq("id", id);
		if (error) flash("Error: " + error.message);
		else {
			flash("Deleted");
			await reload();
		}
	}
	async function update(id, patch) {
		const { error } = await supabase.from("lookbook_images").update(patch).eq("id", id);
		if (error) flash("Error: " + error.message);
		else {
			flash("Saved");
			await reload();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					items.length,
					" image",
					items.length === 1 ? "" : "s"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: add,
				className: "bg-ink text-cream px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-rust transition",
				children: "+ Add image"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-2 gap-4",
			children: [items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookbookCard, {
				item: i,
				onSave: (patch) => update(i.id, patch),
				onDelete: () => remove(i.id)
			}, i.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyHint, { label: "No images yet — the site is showing the starter lookbook." })]
		})]
	});
}
function LookbookCard({ item, onSave, onDelete }) {
	const [draft, setDraft] = (0, import_react.useState)(item);
	const dirty = JSON.stringify(draft) !== JSON.stringify(item);
	(0, import_react.useEffect)(() => setDraft(item), [item]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border p-4 bg-card space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: draft.image_url,
				alt: "",
				className: "w-full aspect-[4/5] object-cover bg-muted"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Image URL",
				value: draft.image_url,
				onChange: (v) => setDraft({
					...draft,
					image_url: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Caption",
				value: draft.caption,
				onChange: (v) => setDraft({
					...draft,
					caption: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Sort order",
				value: String(draft.sort_order),
				onChange: (v) => setDraft({
					...draft,
					sort_order: Number(v) || 0
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-xs uppercase tracking-[0.2em]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: draft.visible,
					onChange: (e) => setDraft({
						...draft,
						visible: e.target.checked
					})
				}), "Visible on site"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: !dirty,
					onClick: () => onSave(draft),
					className: "flex-1 bg-ink text-cream py-2 text-xs uppercase tracking-[0.2em] disabled:opacity-30 hover:bg-rust transition",
					children: "Save"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onDelete,
					className: "px-4 py-2 text-xs uppercase tracking-[0.2em] text-destructive border border-destructive/30 hover:bg-destructive hover:text-cream transition",
					children: "Delete"
				})]
			})
		]
	});
}
function Field({ label, value, onChange, placeholder, multiline }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1",
			children: label
		}), multiline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			rows: 3,
			className: "w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-rust"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-rust"
		})]
	});
}
function EmptyHint({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
		children: label
	});
}
//#endregion
export { AdminPage as component };
