# Acuan implementasi Knzy Studio

Update: pengguna menyetujui screenshot prototype DesainPakeAI sebagai acuan visual utama. Arahan berikut menggantikan pilihan warna, tipografi, serta komposisi Cal.com di bagian referensi awal.

- Nuansa romantis dan editorial: latar krem #FBF7F2, blush #F4DFDF, tombol dusty rose #A65369, panel ringkasan plum gelap #422C35.
- Judul memakai Cormorant Garamond, termasuk aksen italic; isi dan kontrol memakai DM Sans. Font di-host sendiri dari paket @fontsource.
- Kolom utama maksimal 1120px, garis pembatas peach, label bagian kecil, ruang kosong yang lapang. Tanpa grid blueprint yang terlihat.
- Hero dua kolom dengan pesan emosional di kiri dan kartu hadiah interaktif berbentuk lengkung di kanan.
- Urutan halaman: navigasi, hero, katalog tiga paket, kalkulator dan ringkasan pesanan, empat langkah pemesanan, FAQ, CTA penutup, footer.
- Mobile: kolom ditumpuk, katalog satu kartu per baris, kontrol ramah sentuhan, ringkasan berada setelah opsi add-on.
- Fitur, harga paket, dan tautan demo tetap mengikuti prd.md. Harga add-on bersifat estimasi sampai dikonfirmasi pemilik.
- Semua kontrol harus bisa diakses keyboard, punya fokus terlihat, dan menghormati preferensi reduced motion.

---

## Referensi awal (historis)

Cal.com
A structured SaaS and dashboard foundation with a quiet blueprint grid, white scheduling panels, and open-source Cal Sans UI.

Overview
Cal.com is a light foundation for scheduling products, collaboration SaaS, client portals, workflow tools, and operational dashboards. It is grounded in a fresh Context.dev extraction of cal.com on 2026-08-28: Styleguide supplied the type hierarchy, spacing, card radius, and shadows; Scrape HTML exposed the secondary colors, font files, and gradient declarations; Screenshot confirmed how the marketing promise and working calendar share one visual system.

The foundation does not reproduce Cal.com branding, logos, copy, or product screens. It translates the observed logic into a reusable system: a quiet 75px page grid, a 1200px working column, crosshair markers at major section boundaries, white panels, dense scheduling controls, and one dark decisive action. The grid is structural. It aligns landing sections and dashboard panels so the marketing page already feels like the product.

Curation record
Retained. The evidence-backed scheduling grid, restrained gray surfaces, compact control density, Cal Sans UI typography, neutral gradients, and dark primary action are retained as system-level observations.

Translated. The reference logic becomes Cal.com: a reusable SaaS and operations foundation whose 75px grid connects a marketing promise to a credible scheduling dashboard. Crosshair boundaries, semantic status colors, responsive stacking, and dashboard state recipes are deliberate additions for this product point of view.

Excluded. Cal.com logos, brand name, marketing copy, navigation structure, customer marks, illustrations, exact page composition, and proprietary product screens are excluded from generated pages. The official Cal.com logo may appear only in the host catalog's display-only identity row and source badge; it is never exported with the foundation.

Colors
Colour as text. warning is a fill: use it for backgrounds, markers and borders, never as text on canvas or surface. For text, links or numbers in that colour family use warning-text, which meets 4.5:1 on canvas and surface.

Accessibility corrections (alpha.2). These are deliberate derivations, not observed source values: text-muted #898989 to #6F6F6F (3.18:1 to 4.57:1, text at least 4.5); positive #19A874 to #0E865B (3.05:1 to 4.59:1, status fill at least 4.5); danger #E94235 to #DC3429 (3.97:1 to 4.60:1, status fill at least 4.5). Hue is kept; only lightness moved. Values quoted elsewhere in this document remain the observed evidence.

Context.dev identified #F4F4F4 as the page background and white as the dominant card surface. The extracted HTML repeatedly used #242424 and #141414 for ink, #898989 for secondary copy, #E1E2E3 for rules, and #F7F7F8 to #EAEAEB for quiet controls. These neutral roles should dominate the viewport.

Primary is the extracted #242424 ink and owns the main call to action, selected calendar cells, and active navigation. Accent #6349EA appeared in the scraped source and is reserved for keyboard focus, connected-app highlights, and rare scheduling emphasis. It must not replace the dark primary across every control.

Positive #19A874, Warning #FFBA00, and Danger #E94235 also come from the scraped source. Use them only for semantic state and always pair them with text or an icon. Do not infer status from accent purple.

Three gradients are approved because Context.dev found matching declarations in the source. Surface Gradient is linear-gradient(180deg, #FCFCFC 0%, #FFFFFF 100%) for large white showcase panels. Control Gradient is linear-gradient(180deg, #F7F7F8 0%, #EAEAEB 100%) for secondary buttons and inactive controls. Edge Fade is radial-gradient(50% 50% at 50% 50%, rgb(255 255 255 / 0%) 87.1499%, #FFFFFF 100%) for clipping a wide calendar or timeline at its boundary. Do not invent colorful mesh gradients or use the gradients as full-page decoration.

Typography
Cal.com uses Cal Sans UI for display, body, controls, and dashboard data. Context.dev found Cal Sans and Cal Sans UI on the reference and returned accessible WOFF2 links. This repository self-hosts the official @calcom/cal-sans-ui 1.3.0 variable font and its OFL-1.1 license, so no commercial font, proprietary fallback, or runtime font CDN is required for previews.

Use the GEOM axis to create hierarchy without changing families. Display and 40px headings use GEOM 50 for the friendly geometric character visible in the reference. Body, controls, calendar labels, and dense dashboard content use GEOM 0 for faster reading. Data uses tabular numerals rather than a decorative monospace face.

The extracted scale anchors display at 56px, large headings at 40px, section headings at 28px, and body at 14px. This foundation allows the hero to grow to 64px on wide screens while preserving the observed rhythm. Avoid all-caps utility labels unless the product vocabulary genuinely benefits from them.

Layout
The page is a 1200px column made of sixteen 75px grid cells. The two dimensions are intentionally divisible so section edges, dashboard columns, and crosshair markers can coincide. Hero and product-demo sections should snap to full grid rows. The strongest landing composition is a seven-cell message region beside a nine-cell working preview, not a generic centered headline above three feature cards.

Marketing sections are bands that fill grid cells; they do not float as unrelated cards above a decorative background. A band may clear the internal grid with Canvas or Surface while keeping one-pixel boundary rules and crosshair markers visible at the outer column edges. Use cell fills only on integer grid coordinates.

Dashboard layouts inherit the same geometry at a denser scale: a stable navigation rail, a fluid work surface, one vertical divider between details and calendar or timeline, and 4px calendar cells within the broader grid. At mobile widths, remove the full blueprint mesh, preserve section rules, stack the marketing and preview regions, and turn split dashboard panels into one reading order.

Elevation & Depth
Context.dev extracted one restrained shadow: rgba(19, 19, 22, 0.7) 0 1px 5px -4px, rgba(34, 42, 53, 0.08) 0 0 0 1px, rgba(34, 42, 53, 0.05) 0 4px 8px 0. Use it only for the hero product showcase, menus, dialogs, and other surfaces that must detach from the grid.

Ordinary dashboard panels rely on white Surface, Border, and shared dividers. The extracted inset shadow rgba(0, 0, 0, 0.16) 0 1px 1.9px 0 inset may be used on pressed controls. Do not stack multiple shadows or add colored glow.

Shapes
Large product showcase and dashboard panels use the extracted 16px card radius. Buttons and inputs use 8px, compact calendar cells use 4px, and announcement or filter chips may use Pill. This three-level shape vocabulary maps radius to containment rather than decoration.

Crosshair markers are 13px line symbols centered on a section boundary at the left and right edges of the content column. They communicate the page grid and must never become button icons. Calendar selections remain compact rounded squares, not pills, so rows and columns stay legible.

Components
Primary buttons use near-black Primary with white text, 8px radius, and 12px by 16px padding. Secondary buttons may use the extracted neutral Control Gradient with a one-pixel border. Inputs and filter controls use white Surface and a visible purple focus ring. Disabled state uses Surface Strong and Text Muted but must remain readable.

The YAML recipes are visual specifications, not prebuilt component files and not instructions to create reusable components. Agents may apply them directly while implementing a requested page. They must not create or register a component unless the user explicitly asks for that component or explicitly requests reusable component extraction.

Dashboard panels should share dividers rather than each casting a shadow. A scheduling panel combines identity and meeting detail in the first region, duration and timezone controls in the second, and a calendar or timeline in the final region. Calendar cells need current, available, selected, disabled, and focus states that remain distinguishable without color alone.

For a SaaS landing page, place a real-looking product interaction beside the promise: calendar, timeline, workload board, or approval schedule. Do not substitute a decorative browser mockup with unreadable placeholder rectangles. Keep product copy specific to the task the dashboard performs.

Do's and Don'ts
Do use the 1200px by 75px grid relationship for wide landing pages.
Do align section boundaries, dashboard columns, and crosshairs to the same structural grid.
Do use the self-hosted Cal Sans UI variable font under OFL-1.1.
Do use GEOM 50 for display and GEOM 0 for body and dashboard UI.
Do preserve the extracted neutral gradients exactly and use them only for surface depth or edge fades.
Do show an authentic product workflow in the landing page hero or first product section.
Don't add Cal.com logos, copy, screenshots inside generated pages, or other protected brand assets.
Don't add commercial fonts, proprietary font files, or named proprietary fallbacks.
Don't turn the blueprint grid into lines that run through readable content.
Don't introduce mesh gradients, glass effects, or a rainbow SaaS palette.
Don't float every dashboard region as a separate shadowed card.
Don't use purple as the default action when the dark primary already communicates hierarchy.
