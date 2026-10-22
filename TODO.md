# TODO — OrLabs website

Open items for the owner. Nothing below has been invented — every unknown is
still an explicit placeholder in the code.

## Pages built

### Public site — `frontend/src/app/(marketing)/`

| Route | File | Status |
| --- | --- | --- |
| `/` | `(marketing)/page.tsx` | Done — hero with animated device mockups, clients, services, industries, process, why-us, work, CTA. |
| `/about` | `(marketing)/about/page.tsx` | Done — story, mission, vision, values, team grid. |
| `/services` | `(marketing)/services/page.tsx` | Done — overview of the 6 services + process. |
| `/services/[slug]` | `(marketing)/services/[slug]/page.tsx` | Done — 6 pages, generated from `src/content/services.ts`. |
| `/industries` | `(marketing)/industries/page.tsx` | Done — 9 industries, challenge → how OrLabs helps. |
| `/work` | `(marketing)/work/page.tsx` | Done — case-study cards. |
| `/work/[slug]` | `(marketing)/work/[slug]/page.tsx` | Done — Problem → Solution → Result, tech used, testimonial. |
| `/labs` | `(marketing)/labs/page.tsx` | Done — post list. |
| `/labs/[slug]` | `(marketing)/labs/[slug]/page.tsx` | Done — note body, tags, date. |
| `/careers` | `(marketing)/careers/page.tsx` | Done — culture, open roles, how to apply. |
| `/contact` | `(marketing)/contact/page.tsx` | Done — full form, address, map. |
| `/sitemap.xml` | `frontend/src/app/sitemap.ts` | Done — every public route incl. service, work and lab slugs. The portal is not in it. |
| `/robots.txt` | `frontend/src/app/robots.ts` | Done — points at the sitemap and keeps `/portal` out of the index. |

The root layout only holds the document shell. The public header, footer and
skip link live in `(marketing)/layout.tsx`; the shared pieces are in
`frontend/src/components/site/`.

### Portal — `frontend/src/app/(portal)/portal/`

| Route | File | Status |
| --- | --- | --- |
| `/portal` | `(auth)/page.tsx` | Done — placeholder sign-in (clearly marked *not connected*) + development role switcher. |
| `/portal/admin` | `(workspace)/admin/page.tsx` | Done — overview: numbers counted from the store, deliveries in flight, progress bars. |
| `/portal/admin/projects` | `(workspace)/admin/projects/page.tsx` | Done — every project, filter by state. |
| `/portal/admin/content` | `(workspace)/admin/content/page.tsx` | Done — the public pages and where each one stands. |
| `/portal/admin/team` | `(workspace)/admin/team/page.tsx` | Done — the roster and the availability of every person. |
| `/portal/worker` | `(workspace)/worker/page.tsx` | Done — what is waiting for the person who is signed in. |
| `/portal/worker/tasks` | `(workspace)/worker/tasks/page.tsx` | Done — the task list; a task can be moved along. |
| `/portal/worker/tickets` | `(workspace)/worker/tickets/page.tsx` | Done — the tickets; a ticket can be closed. |
| `/api/portal/*` | `frontend/src/app/api/portal/` | Done — JSON route handlers over the mock store. |

The portal data lives in `frontend/src/data/portal/store.ts` — an in-memory
mock. Changes last until the server restarts.

## Placeholders still on the site

| Placeholder | Where | Notes |
| --- | --- | --- |
| `[CLIENT LOGO]` × 4 | `src/components/landing/Clients.tsx` | Replace with real client logos (SVG, `loading="lazy"`). |
| `[PROJECT SCREENSHOT]` | `src/components/landing/Work.tsx`, `(marketing)/work/page.tsx`, `(marketing)/work/[slug]/page.tsx` | Real product screenshots. |
| `[Project name]`, `[one-line result]` | `src/content/projects.ts` | Case-study title and outcome. |
| `[The problem the client came to us with.]`, `[What we built, and how we built it.]`, `[What changed for the client after launch.]` | `src/content/projects.ts` | Case-study body. |
| `[TECHNOLOGY]` × 3 | `src/content/projects.ts` | Tech used on the case study. |
| `[CLIENT QUOTE …]`, `[Name]`, `[Role, Company]` | `src/content/projects.ts` | Testimonial + attribution. |
| `[TEAM PHOTO]`, `[Name]`, `[Role]` | `(marketing)/about/page.tsx` | Team grid: photo, name and role per person. |
| `[LAB POST PREVIEW]`, `[LAB POST TITLE]`, `[Date]`, `[One-line summary of the note.]`, `[TAG]` | `(marketing)/labs/page.tsx`, `src/content/labs.ts` | Lab post preview image, title, date, summary, tags. |
| `[ROLE]`, `[Team or discipline]`, `[Employment type]`, `[One-line description of the role.]` | `(marketing)/careers/page.tsx` | Open roles. |
| `[FORM_ENDPOINT]` | `src/components/landing/CtaForm.tsx`, `src/components/site/ContactForm.tsx` | Form `action` fallback; the live submission uses `NEXT_PUBLIC_FORM_ENDPOINT`. |
| `[EMAIL]` | `src/lib/contact.ts`, `src/components/site/Footer.tsx`, `src/components/site/ContactForm.tsx`, `(marketing)/careers/page.tsx` | Company email — used in the footer, on the contact page and in form messages. |
| `[Street address]`, `[PHONE / WHATSAPP]` | `src/components/site/Footer.tsx`, `(marketing)/contact/page.tsx` | Kigali address and phone / WhatsApp number. |
| `[PROJECT NAME]`, `[CLIENT NAME]`, `[ONE-LINE SUMMARY]`, `[TARGET DATE]` | `src/data/portal/store.ts` | The mock projects in the portal. |
| `[TEAM MEMBER]` | `src/data/portal/store.ts`, `(marketing)/about/page.tsx` | The mock roster in the portal and the team grid on the public site. |
| `[NOTE]`, `[TICKET SUBJECT]`, `[TICKET BODY]` | `src/data/portal/store.ts` | The mock tasks and tickets. |

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
- `PORTAL_SESSION_SECRET` — secret that signs the portal session cookie
  (HMAC-SHA256). Change it in every environment that is not a local build;
  a change signs everyone out.

## The portal — what still has to be connected

- **The sign-in.** The form on `/portal` is a placeholder and says so. It
  has no identity provider behind it. The development role switcher under
  it opens the two areas with a demo session
  (`frontend/src/app/(portal)/portal/actions.ts`). When the real provider
  is in place, replace that action with the provider's callback — the
  session format (`frontend/src/lib/portal/token.ts`) stays the same.
- **The data.** Everything comes from the in-memory mock store. Replace
  `frontend/src/data/portal/store.ts` with the real database; the JSON
  shapes the portal reads stay the same.
- **The roles.** Two roles: `admin` and `worker`. The proxy
  (`frontend/src/proxy.ts`) keeps a worker out of `/portal/admin` and the
  other way round. A third role means a third area and a third nav.
- **The counters on the dashboard** are counted from the store, never
  written down by hand — they stay honest when the data changes.

## Motion system

One vocabulary for movement across the whole site, defined in
`frontend/src/app/globals.css`:

| Piece | How to use it |
| --- | --- |
| Reveal on scroll | `data-reveal` (or `data-reveal="up\|left\|scale\|fade"`) on a section. |
| Staggered reveal | `data-reveal-group` on a container — its direct children fade in one after another. |
| Card hover | `motion-lift` on a card (the hover uses `transform`, the reveal uses `translate`, so they compose). |
| Link arrow | `motion-arrow` on the arrow inside a text link. |
| Animated number | `CountUp` from `src/components/motion/CountUp.tsx`. |
| Progress bar | `ProgressBar` from `src/components/motion/ProgressBar.tsx`. |
| Loading state | `skeleton` on a placeholder block. |
| Busy state | `spinner` on a small element. |

`prefers-reduced-motion` turns all of it off: nothing stays hidden, the
counters and bars show their real value and nothing moves.

## Notes

- Every page renders `<RevealController />` inside its own `<main>`: the
  controller hides below-the-fold sections after hydration, so it must run
  *after* the page segment has hydrated — putting it in the root layout
  causes hydration mismatches on streamed pages.
- The reveal controller also watches the DOM, so content that arrives
  later (the portal loads its data in the browser) fades in as well.
- `/services/[slug]`, `/work/[slug]` and `/labs/[slug]` read `params` while
  rendering, so they export `instant = false` to opt out of the instant
  navigation validation.
- The proxy only guards documents (`GET`/`HEAD`). Server actions post to
  the page they belong to; a redirect would turn that post into a request
  for a page.
- `cookies()` is asynchronous in this version of Next.js and cannot be read
  outside a `<Suspense>` boundary — the portal top bar sits in one.
