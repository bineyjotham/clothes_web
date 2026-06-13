import { i as fetchSiteContent, n as FALLBACK_LOOKBOOK, r as FALLBACK_PRODUCTS, t as FALLBACK_BANNER } from "./site-content-D4nRf8os.mjs";
import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CHNRggxS.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { data } = useQuery({
		queryKey: ["site-content"],
		queryFn: fetchSiteContent,
		initialData: {
			banner: FALLBACK_BANNER,
			products: FALLBACK_PRODUCTS,
			lookbook: FALLBACK_LOOKBOOK
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { banner: data.banner }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection, { products: data.products }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lookbook, { items: data.lookbook }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Nav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-6 flex items-center justify-between text-cream mix-blend-difference",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "hidden md:flex gap-8 text-xs uppercase tracking-[0.2em]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#collection",
						className: "hover:opacity-70 transition",
						children: "Collection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#lookbook",
						className: "hover:opacity-70 transition",
						children: "Lookbook"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#story",
						className: "hover:opacity-70 transition",
						children: "Story"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#",
				className: "font-display text-2xl tracking-tight",
				children: "Maison Oré"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "hidden md:flex gap-8 text-xs uppercase tracking-[0.2em]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hover:opacity-70 transition",
						children: "Search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "hover:opacity-70 transition",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hover:opacity-70 transition",
						children: "Bag (0)"
					})
				]
			})
		]
	});
}
function Hero({ banner }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative h-screen min-h-[700px] w-full overflow-hidden bg-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: banner.image_url,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-95"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex h-full flex-col justify-end px-6 md:px-12 pb-16 md:pb-24 text-cream",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] mb-4 opacity-80",
						children: banner.eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-6xl md:text-[9rem] leading-[0.9] max-w-5xl whitespace-pre-line",
						children: banner.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap items-center gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: banner.cta_href,
							className: "inline-flex items-center gap-3 bg-cream text-ink px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-clay transition",
							children: [banner.cta_label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "→"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#lookbook",
							className: "text-xs uppercase tracking-[0.2em] border-b border-cream/40 pb-1 hover:border-cream transition",
							children: "View Lookbook"
						})]
					})
				]
			})
		]
	});
}
function Marquee() {
	const items = [
		"New Arrivals",
		"Free Shipping over $200",
		"Crafted in Portugal",
		"AW26 Now Live",
		"Atelier Edition"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-y border-border bg-cream overflow-hidden py-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-16 marquee whitespace-nowrap text-xs uppercase tracking-[0.3em]",
			children: [
				...items,
				...items,
				...items
			].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-16",
				children: [t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "text-rust",
					children: "✦"
				})]
			}, i))
		})
	});
}
function Collection({ products }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "collection",
		className: "px-6 md:px-12 py-24 md:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between mb-16 gap-8 flex-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4",
				children: "Featured"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-5xl md:text-7xl max-w-xl",
				children: [
					"The Season's ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "italic",
						children: "Essentials"
					}),
					"."
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#",
				className: "text-xs uppercase tracking-[0.2em] border-b border-ink pb-1",
				children: "All Pieces →"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12",
			children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "#",
				className: "group block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden bg-muted aspect-[3/4] mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image_url,
						alt: p.name,
						loading: "lazy",
						className: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
					}), p.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-3 left-3 bg-cream/90 text-ink text-[10px] uppercase tracking-[0.2em] px-2 py-1",
						children: p.tag
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-baseline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: p.price
					})]
				})]
			}, p.id))
		})]
	});
}
function Lookbook({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "lookbook",
		className: "bg-ink text-cream px-6 md:px-12 py-24 md:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-12 gap-8 mb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.3em] opacity-70 mb-4",
					children: "Lookbook"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-5xl md:text-7xl leading-[0.95]",
					children: [
						"Studies in",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: "italic",
							children: "warm"
						}),
						" minimalism."
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "md:col-span-5 md:col-start-8 self-end text-base md:text-lg leading-relaxed opacity-80",
				children: "Each piece is conceived in our Lisbon atelier, patterned, cut, and finished by hand. The Autumn/Winter 26 collection draws from the textures of unpolished stone, sun-faded linen, and the russet of late October."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-12 gap-4 md:gap-6",
			children: items.map((img, idx) => {
				const span = idx % 4 === 0 || idx % 4 === 3 ? "md:col-span-7" : "md:col-span-5";
				const tall = idx < 2 ? "h-[60vh] md:h-[80vh]" : "h-[50vh] md:h-[70vh]";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: span,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: img.image_url,
						alt: img.caption,
						loading: "lazy",
						className: `w-full ${tall} object-cover`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "text-xs uppercase tracking-[0.2em] opacity-60 mt-3",
						children: img.caption
					})]
				}, img.id);
			})
		})]
	});
}
function Story() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "story",
		className: "px-6 md:px-12 py-24 md:py-32 bg-clay/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-12 gap-12 items-center max-w-7xl mx-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:col-span-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6",
						children: "Our Atelier"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-5xl md:text-6xl mb-8 leading-[1]",
						children: [
							"Slow craft.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "italic",
								children: "Lasting"
							}),
							" form."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base md:text-lg leading-relaxed text-foreground/80 max-w-lg mb-6",
						children: "Founded in 2014, Maison Oré is a small house of fifteen makers. We work in deadstock wool, Portuguese cashmere, and naturally tanned leather, producing fewer than 600 garments each season."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-rust transition",
						children: "Read the Manifesto →"
					})
				]
			})
		})
	});
}
function Newsletter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-6 md:px-12 py-24 md:py-32 text-center border-t border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6",
				children: "The Journal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-4xl md:text-6xl max-w-3xl mx-auto mb-8 leading-[1.05]",
				children: [
					"Letters from the ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "italic",
						children: "atelier"
					}),
					", twice a month."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => e.preventDefault(),
				className: "max-w-md mx-auto flex border-b border-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					placeholder: "your@email.com",
					className: "flex-1 bg-transparent py-3 px-1 text-sm placeholder:text-muted-foreground focus:outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "text-xs uppercase tracking-[0.2em] px-4 hover:text-rust transition",
					children: "Subscribe"
				})]
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-ink text-cream px-6 md:px-12 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-4 gap-12 mb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#",
				className: "font-display text-3xl",
				children: "Maison Oré"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] opacity-60 mt-3",
				children: "Lisbon · Est. 2014"
			})] }), [
				{
					h: "Shop",
					l: [
						"Women",
						"Men",
						"Atelier Edition",
						"Archive Sale"
					]
				},
				{
					h: "House",
					l: [
						"Our Story",
						"Sustainability",
						"Stockists",
						"Press"
					]
				},
				{
					h: "Care",
					l: [
						"Contact",
						"Shipping",
						"Returns",
						"Garment Care"
					]
				}
			].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-xs uppercase tracking-[0.3em] mb-5 opacity-70",
				children: col.h
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3 text-sm",
				children: col.l.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#",
					className: "hover:text-clay transition",
					children: i
				}) }, i))
			})] }, col.h))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap justify-between items-center text-xs uppercase tracking-[0.2em] opacity-60 pt-8 border-t border-cream/10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Maison Oré. All rights reserved." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Privacy · Terms · Cookies" })]
		})]
	});
}
//#endregion
export { Index as component };
