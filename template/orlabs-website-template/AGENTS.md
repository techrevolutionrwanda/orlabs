# OrLabs Tech Industries — Website Build Brief (for AI coding agents)

You are building the marketing website for **OrLabs Tech Industries**, a software engineering company based in Kigali, Rwanda. This folder is the source of truth. Read this whole file before writing code.

## 1. What is in this folder

| Path | What it is |
| --- | --- |
| `index.html` | Finished, framework-free **Home page** reference. Match its look, structure and copy. Sections are marked `<!-- SECTION: name -->`. |
| `design-tokens.json` | Colors, fonts, type scale, radius, spacing. Use these values — do not invent new colors. |
| `assets/logo/` | Logo files (SVG with outlined text, plus PNGs). Use the SVGs in code. |
| `screenshots/` | Desktop and mobile renders of `index.html`, for visual reference (headings show the Inter fallback; the live site loads Sora). |
| `PROMPTS.md` | Ready-made prompts the owner can paste into an agent. |

## 2. Brand in one minute

- **Name meaning:** *Or* = light. *Labs* = experimentation. *Tech* = engineering. *Industries* = serves many sectors.
- **Tagline:** "Light, engineered."
- **Promise:** "We bring light to your business."
- **Positioning:** Software engineering from Kigali that brings clarity, speed and opportunity to organisations across Africa.
- **Voice:** confident, clear, warm, optimistic. Short sentences, plain words, active verbs. No buzzwords ("synergy", "world-class", "cutting-edge").
- **Values:** Clarity · Craft · Curiosity · Partnership · Impact.

## 3. Visual rules (must follow)

1. **Colors:** only the tokens in `design-tokens.json`. Navy `#0B1F3A` is the base, Gold `#F5B301` is the single accent (primary CTA, highlights), Teal `#00A6A6` is decorative only. On light backgrounds, teal text uses `#007C7C`.
2. **Never** put gold text on white for body copy (fails contrast). Gold on navy is fine.
3. **Type:** Sora (600/700) for headings; Inter (400/500/600) for everything else. Headings use `letter-spacing: -0.02em`.
4. **Shapes:** rounded — cards 18px, big panels 28px, buttons and chips fully rounded (pill).
5. **Layout:** 1200px max container, 24px gutters, sections alternate light (`#F7F8FA` / white) and navy.
6. **No:** gradient washes, emoji, stock photos of handshakes, purple, drop shadows heavier than `0 8px 24px rgba(11,31,58,.06)`.
7. **Imagery:** real Rwandan/African teams, places and users. The hero illustration is a gold sun ring rising over layered navy hills (Kigali's hills) — reuse this motif.
8. **Logo:** the mark is an open gold ring with three rays escaping the gap and a centre dot. Do not redraw or recolor it; use files from `assets/logo/`. Minimum width 120px for the full lockup; use `favicon.svg` below 32px.

## 4. Accessibility & quality bar

- WCAG 2.1 AA: text contrast ≥ 4.5:1, visible focus states (gold outline), real `<button>`/`<a>`/`<label>` elements, `alt` on images, `aria-label` on icon-only buttons.
- Mobile-first: works from 360px wide. Navigation collapses to a menu button below 860px.
- Fast on slow networks (many users are on mobile data): no heavy JS frameworks for static pages, images in WebP/AVIF with `loading="lazy"`, total page weight target < 1 MB.
- SEO: unique `<title>` and meta description per page, Open Graph tags, semantic headings (one `h1` per page), `sitemap.xml`, `robots.txt`.
- Respect `prefers-reduced-motion`.

## 5. Site map to build

| Page | Route | Content (reuse copy from `index.html` and section 7) |
| --- | --- | --- |
| Home | `/` | Exactly as `index.html`. |
| About | `/about` | Brand story, name meaning, mission, vision, values, team grid (`[TEAM PHOTO]`, `[Name]`, `[Role]`). |
| Services | `/services` + `/services/[slug]` | Overview of 6 services; one page each: problem it solves, what's included, process, CTA. |
| Industries | `/industries` | One block per industry: challenge → how OrLabs helps. |
| Work | `/work` + `/work/[slug]` | Case-study cards; detail page = Problem → Solution → Result, screenshots, tech used, testimonial. |
| Labs | `/labs` + `/labs/[slug]` | Blog / insights / experiments. |
| Careers | `/careers` | "Join the Lab" — culture, open roles (`[ROLE]`), how to apply. |
| Contact | `/contact` | Form (name, email, company, service of interest, message), Kigali address, phone, WhatsApp link, email, embedded map. |

Every page shares the header and footer from `index.html`.

## 6. Recommended tech stack (if the owner does not specify one)

- **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on Vercel or Netlify. Static generation for all marketing pages.
- Content in Markdown/MDX files (`/content/work`, `/content/labs`) so non-developers can add case studies and posts.
- Contact form: a serverless route that emails the team (e.g. Resend) or a form service (Formspree). Add spam protection (honeypot field).
- Map the tokens into Tailwind:

```js
// tailwind.config.js (theme.extend)
colors: {
  navy: { DEFAULT: '#0B1F3A', deep: '#071628', line: '#22406A' },
  gold: { DEFAULT: '#F5B301', hover: '#FFC21F' },
  teal: { DEFAULT: '#00A6A6', text: '#007C7C' },
  bg: '#F7F8FA', surface: '#FFFFFF', chip: '#EEF2F7', border: '#E3E7ED',
  ink: { DEFAULT: '#2B2F36', muted: '#4A515C', subtle: '#5A6270' },
},
fontFamily: { display: ['Sora', 'Inter', 'sans-serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
borderRadius: { card: '18px', panel: '28px' },
maxWidth: { container: '1200px' },
```

A plain HTML/CSS site built from `index.html` is also acceptable for a first launch.

## 7. Copy library (approved text)

- **Micro bio:** Software engineering from Kigali. OrLabs builds web, mobile, cloud and data solutions that bring light to business across Africa.
- **Short bio:** OrLabs Tech Industries is a software engineering company based in Kigali, Rwanda. "Or" means light — and that is what we bring: clarity, speed and smart technology to organisations across many industries.
- **Mission:** To engineer reliable, human-centred software that brings clarity and growth to organisations across Africa.
- **Vision:** To be Africa's most trusted software engineering house — a source of light that powers industries, creates opportunity and puts African talent on the global stage.
- **Brand story:** Light reveals what is hidden, guides the way forward and makes growth possible. OrLabs was founded in Kigali on that idea. We believe Africa's next chapter will be written in code — by engineers who understand local realities and build to global standards.
- **Services:** Custom Software · Web & Mobile Apps · Cloud & DevOps · Data, AI & Automation · Integrations & Fintech (mobile money, payment gateways) · IT Consulting & Digital Transformation.
- **Industries:** Finance & microfinance · Health · Agriculture · Construction & real estate · Logistics & transport · Education · Hospitality & tourism · Government & NGOs · Retail & e-commerce.
- **Process:** Discover → Design → Build → Launch → Support.
- **CTAs:** Start a project · Book a free consultation · See our work · Talk to an engineer · Join the Lab.
- **Optional languages:** English first; plan for French and Kinyarwanda (e.g. "Murakaza neza" = welcome) via i18n.

## 8. Placeholders — never invent these

Anything in `[SQUARE BRACKETS]` is unknown. **Keep it as a visible placeholder; do not make up** client names, logos, testimonials, statistics, team members, addresses, phone numbers or registration numbers. Current placeholders: `[CLIENT LOGO]`, `[PROJECT SCREENSHOT]`, `[Project name]`, `[CLIENT QUOTE …]`, `[Name]`, `[Role, Company]`, `[Street address]`, `[EMAIL]`, `[PHONE / WHATSAPP]`, `[RDB registration no.]`, `[FORM_ENDPOINT]`.

## 9. Definition of done

- [ ] Home page matches `screenshots/home-desktop.png` and `screenshots/home-mobile.png`.
- [ ] All pages in section 5 exist, share header/footer, and use only the tokens.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on mobile.
- [ ] Contact form submits and shows a success and an error state.
- [ ] No invented facts; all placeholders listed in a `TODO.md` for the owner.
