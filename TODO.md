# TODO — OrLabs website

Open items for the owner. Nothing below has been invented — every unknown is
still an explicit placeholder in the code.

## Pages built

| Route | File | Status |
| --- | --- | --- |
| `/` | `frontend/src/app/page.tsx` | Done — hero with animated device mockups, clients, services, industries, process, why-us, work, CTA. |
| `/about` | `frontend/src/app/about/page.tsx` | Done — story, mission, vision, values, team grid. |
| `/services` | `frontend/src/app/services/page.tsx` | Done — overview of the 6 services + process. |
| `/services/[slug]` | `frontend/src/app/services/[slug]/page.tsx` | Done — 6 pages, generated from `src/content/services.ts`. |
| `/industries` | `frontend/src/app/industries/page.tsx` | Done — 9 industries, challenge → how OrLabs helps. |
| `/work` | `frontend/src/app/work/page.tsx` | Done — case-study cards. |
| `/work/[slug]` | `frontend/src/app/work/[slug]/page.tsx` | Done — Problem → Solution → Result, tech used, testimonial. |
| `/labs` | `frontend/src/app/labs/page.tsx` | Done — post list. |
| `/labs/[slug]` | `frontend/src/app/labs/[slug]/page.tsx` | Done — note body, tags, date. |
| `/careers` | `frontend/src/app/careers/page.tsx` | Done — culture, open roles, how to apply. |
| `/contact` | `frontend/src/app/contact/page.tsx` | Done — full form, address, map. |
| `/sitemap.xml` | `frontend/src/app/sitemap.ts` | Done — every route incl. service, work and lab slugs. |
| `/robots.txt` | `frontend/src/app/robots.ts` | Done — points at the sitemap. |

Shared header, footer, skip link and reveal-on-scroll live in
`frontend/src/components/site/`.

## Placeholders still on the site

| Placeholder | Where | Notes |
| --- | --- | --- |
| `[CLIENT LOGO]` × 4 | `src/components/landing/Clients.tsx` | Replace with real client logos (SVG, `loading="lazy"`). |
| `[PROJECT SCREENSHOT]` | `src/components/landing/Work.tsx`, `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx` | Real product screenshots. |
| `[Project name]`, `[one-line result]` | `src/content/projects.ts` | Case-study title and outcome. |
| `[The problem the client came to us with.]`, `[What we built, and how we built it.]`, `[What changed for the client after launch.]` | `src/content/projects.ts` | Case-study body. |
| `[TECHNOLOGY]` × 3 | `src/content/projects.ts` | Tech used on the case study. |
| `[CLIENT QUOTE …]`, `[Name]`, `[Role, Company]` | `src/content/projects.ts` | Testimonial + attribution. |
| `[TEAM PHOTO]`, `[Name]`, `[Role]` | `src/app/about/page.tsx` | Team grid: photo, name and role per person. |
| `[LAB POST PREVIEW]`, `[LAB POST TITLE]`, `[Date]`, `[One-line summary of the note.]`, `[TAG]` | `src/app/labs/page.tsx`, `src/content/labs.ts` | Lab post preview image, title, date, summary, tags. |
| `[ROLE]`, `[Team or discipline]`, `[Employment type]`, `[One-line description of the role.]` | `src/app/careers/page.tsx` | Open roles. |
| `[FORM_ENDPOINT]` | `src/components/landing/CtaForm.tsx`, `src/components/site/ContactForm.tsx` | Form `action` fallback; the live submission uses `NEXT_PUBLIC_FORM_ENDPOINT`. |
| `[EMAIL]` | `src/lib/contact.ts`, `src/components/site/Footer.tsx`, `src/components/site/ContactForm.tsx`, `src/app/careers/page.tsx` | Company email — used in the footer, on the contact page and in form messages. |
| `[Street address]`, `[PHONE / WHATSAPP]` | `src/components/site/Footer.tsx`, `src/app/contact/page.tsx` | Kigali address and phone / WhatsApp number. |

Still needed for the rest of the site: street address, phone / WhatsApp,
RDB registration number, email address.

## Configuration

- `NEXT_PUBLIC_FORM_ENDPOINT` — URL that accepts the contact form `POST`
  (Formspree, Resend route, own API). Until it is set, the form shows a clear
  "not connected yet" error instead of pretending to succeed.
  See `frontend/.env.example`.
- `NEXT_PUBLIC_SITE_URL` — public origin of the site. Used for `metadataBase`
  (so Open Graph images resolve absolutely), `sitemap.xml` and `robots.txt`.
  Defaults to `http://localhost:3000` in development.

## Notes

- Every page renders `<RevealController />` inside its own `<main>`: the
  controller hides below-the-fold sections after hydration, so it must run
  *after* the page segment has hydrated — putting it in the root layout
  causes hydration mismatches on streamed pages.
- `/services/[slug]`, `/work/[slug]` and `/labs/[slug]` read `params` while
  rendering, so they export `instant = false` to opt out of the instant
  navigation validation.
