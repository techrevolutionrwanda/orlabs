# Prompts for AI agents

Upload or open this whole folder in your agent first (Claude Code, Cursor, Lovable, Bolt, v0, Replit, etc.), then paste one of the prompts below.

---

## 1. Build the full website (recommended first prompt)

```
Read AGENTS.md, design-tokens.json and index.html in this folder. They define the brand,
design system and the finished Home page for OrLabs Tech Industries, a software engineering
company in Kigali, Rwanda.

Build the complete marketing website described in AGENTS.md section 5 using
Next.js (App Router) + TypeScript + Tailwind CSS. Requirements:
- Recreate the Home page so it matches index.html and the screenshots in /screenshots.
- Turn the header, footer, buttons, cards, chips, section heads and CTA box into reusable components.
- Use only the colors and fonts in design-tokens.json; map them into tailwind.config.
- Use the logo files in assets/logo — do not redraw the logo.
- Keep every [PLACEHOLDER] visible; never invent clients, stats, quotes or contact details.
  List all placeholders in TODO.md.
- Meet the accessibility, performance and SEO rules in AGENTS.md section 4.
When done, give me a short summary and how to run it locally.
```

## 2. Plain HTML version (no framework, easiest to host)

```
Using AGENTS.md, design-tokens.json and index.html, create a static multi-page site in plain
HTML/CSS (one shared styles.css extracted from index.html, a small main.js for the mobile menu).
Pages: index, about, services, industries, work, careers, contact. Reuse the same header and
footer on every page. Keep placeholders in [BRACKETS]. Make it deployable to Netlify by drag-and-drop.
```

## 3. Add one page

```
Following AGENTS.md and the existing components, add the [About / Services / Contact] page.
Use the approved copy in AGENTS.md section 7. Match the look of index.html exactly.
```

## 4. Visual-only tools (v0, Lovable, Bolt)

```
Design a marketing website for "OrLabs Tech Industries", a software engineering company in
Kigali, Rwanda. "Or" means light; tagline "Light, engineered." Match the attached screenshots
(home-desktop.png, home-mobile.png) and logo. Colors: navy #0B1F3A (base), gold #F5B301 (accent,
CTAs), teal #00A6A6 (decoration), background #F7F8FA, text #2B2F36. Fonts: Sora (headings),
Inter (body). Rounded cards (18px), pill buttons. Sections: sticky navy header; navy hero with
the headline "Software that brings light to your business." and a gold sun rising over navy
hills; client-logo row; 6 service cards; industry chips; 5-step process; navy "Why OrLabs"
values section; case study + gold testimonial card; navy CTA box with email field; dark footer.
Mobile-first, accessible, no gradients or emoji, no invented stats or client names.
```
