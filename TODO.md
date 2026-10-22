# TODO — OrLabs website

Open items for the owner. Nothing below has been invented — every unknown is
still an explicit placeholder, either in the code or in the portal store.

## Pages built

### Public site — `frontend/src/app/(marketing)/`

| Route | File | Status |
| --- | --- | --- |
| `/` | `(marketing)/page.tsx` | Done — hero with animated device mockups, clients, services, industries, process, why-us, work, CTA. |
| `/about` | `(marketing)/about/page.tsx` | Done — story, mission, vision, values, team grid. |
| `/services` | `(marketing)/services/page.tsx` | Done — overview of the services + process. |
| `/services/[slug]` | `(marketing)/services/[slug]/page.tsx` | Done — one page per published service. |
| `/industries` | `(marketing)/industries/page.tsx` | Done — the industries, challenge → how OrLabs helps. |
| `/work` | `(marketing)/work/page.tsx` | Done — case-study cards. |
| `/work/[slug]` | `(marketing)/work/[slug]/page.tsx` | Done — Problem → Solution → Result, tech used, testimonial. |
| `/labs` | `(marketing)/labs/page.tsx` | Done — note list. |
| `/labs/[slug]` | `(marketing)/labs/[slug]/page.tsx` | Done — note body, tags, date. |
| `/careers` | `(marketing)/careers/page.tsx` | Done — culture, open roles, how to apply. |
| `/contact` | `(marketing)/contact/page.tsx` | Done — full form, address, map. |
| `/sitemap.xml` | `frontend/src/app/sitemap.ts` | Done — every public route incl. service, work and lab slugs. The portal is not in it. |
| `/robots.txt` | `frontend/src/app/robots.ts` | Done — points at the sitemap and keeps `/portal` out of the index. |

Every text, picture and order on the public site comes from the portal store
through `frontend/src/lib/site/content.ts`. A record that is published in the
portal shows on the site; a draft does not. Saving a record revalidates the
cache of the pages that show it, so the site follows the portal without a
rebuild.

The root layout only holds the document shell. The public header, footer and
skip link live in `(marketing)/layout.tsx`; the shared pieces are in
`frontend/src/components/site/`.

### Portal — `frontend/src/app/(portal)/portal/`

| Route | File | Status |
| --- | --- | --- |
| `/portal` | `(auth)/page.tsx` | Done — placeholder sign-in (clearly marked *not connected*) + development role switcher. |
| `/portal/admin` | `(workspace)/admin/page.tsx` | Done — overview: numbers counted from the store, deliveries in flight, progress bars. |
| `/portal/admin/content` | `(workspace)/admin/content/page.tsx` | Done — every record the website shows, in one list, with its state. |
| `/portal/admin/[group]/[resource]` | `(workspace)/admin/[group]/[resource]/page.tsx` | Done — the list of one collection: search, filter, order, publish, remove. |
| `/portal/admin/[group]/[resource]/new` | `(workspace)/admin/[group]/[resource]/new/page.tsx` | Done — the form for a new record. |
| `/portal/admin/[group]/[resource]/[id]` | `(workspace)/admin/[group]/[resource]/[id]/page.tsx` | Done — the form for one record. |
| `/portal/admin/projects` | `(workspace)/admin/projects/page.tsx` | Redirect — the address now belongs to `/portal/admin/delivery/projects`. |
| `/portal/admin/team` | `(workspace)/admin/team/page.tsx` | Redirect — the address now belongs to `/portal/admin/people/team`. |
| `/portal/worker` | `(workspace)/worker/page.tsx` | Done — what is waiting for the person who is signed in. |
| `/portal/worker/tasks` | `(workspace)/worker/tasks/page.tsx` | Done — the task list; a task can be moved along. |
| `/portal/worker/tickets` | `(workspace)/worker/tickets/page.tsx` | Done — the tickets; a ticket can be closed. |
| `/api/portal/*` | `frontend/src/app/api/portal/` | Done — JSON route handlers over the store. |

Every collection gets the same three screens. The address says which
collection it is — the group and the name of the collection — and the
description of the resource in `frontend/src/lib/portal/resources.ts` says
what the screens show, so a new kind of record is one entry and not three
screens.

The portal data lives in one JSON file: `frontend/data/portal.json`. The file
is not in the repository; it is written from the seed in
`frontend/src/data/portal/seed.ts` the first time the portal is used, and
`PORTAL_DATA_FILE` points it somewhere else on a host with a persistent disk.

## Placeholders still on the site

The placeholders of the public site are records in the portal now: they are
filled in there and shown on the site.

| Placeholder | Where | Notes |
| --- | --- | --- |
| `[CLIENT LOGO]` × 4 | Portal → Website → Client logos | Real client logos — a picture address per client. |
| `[PROJECT SCREENSHOT]` | Portal → Website → Work | The cover picture of a case study. |
| `[Project name]`, `[one-line result]`, `[The problem the client came to us with.]`, `[What we built, and how we built it.]`, `[What changed for the client after launch.]`, `[TECHNOLOGY]` × 3, `[CLIENT QUOTE …]`, `[Name]`, `[Role, Company]` | Portal → Website → Work | The body of a case study. |
| `[TEAM PHOTO]`, `[Name]`, `[Role]` | Portal → Website → Public team | The team grid on the about page. |
| `[LAB POST PREVIEW]`, `[LAB POST TITLE]`, `[Date]`, `[One-line summary of the note.]`, `[TAG]` | Portal → Website → Labs notes | The lab note preview, title, date, summary, tags. |
| `[ROLE]`, `[Team or discipline]`, `[Employment type]`, `[One-line description of the role.]` | Portal → Website → Open roles | The open roles on the careers page. |
| `[EMAIL]`, `[PHONE / WHATSAPP]`, `[Street address]` | Portal → Site → Contact details | Shown on the contact page, in the footer and in the careers page. |
| `[PROJECT NAME]`, `[CLIENT NAME]`, `[ONE-LINE SUMMARY]`, `[TARGET DATE]` | Portal → Delivery → Projects | The projects in the portal. |
| `[TEAM MEMBER]` | Portal → People → Roster | The roster in the portal. |
| `[NOTE]`, `[TICKET SUBJECT]`, `[TICKET BODY]` | Portal → Delivery → Tasks and Tickets | The tasks and tickets. |
| `[FORM_ENDPOINT]` | `src/components/landing/CtaForm.tsx`, `src/components/site/ContactForm.tsx` | Form `action` fallback; the live submission uses `NEXT_PUBLIC_FORM_ENDPOINT`. |
| `[EMAIL]` | `src/lib/contact.ts` | The address in the error message of the contact form. |

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
- `PORTAL_DATA_FILE` — where the portal keeps its JSON file. Defaults to
  `data/portal.json` next to the application. Point it at a path on a
  persistent disk when the site runs on a host that has one.

## The portal — what still has to be connected

- **The sign-in.** The form on `/portal` is a placeholder and says so. It
  has no identity provider behind it. The development role switcher under
  it opens the two areas with a demo session
  (`frontend/src/app/(portal)/portal/actions.ts`). When the real provider
  is in place, replace that action with the provider's callback — the
  session format (`frontend/src/lib/portal/token.ts`) stays the same.
- **The data.** The store is a JSON file on disk, written atomically and
  through one queue, so nothing is lost and nothing is overwritten. It is
  good enough for one studio on one host; a real database is the next step,
  and the JSON shapes the portal reads stay the same
  (`frontend/src/data/portal/types.ts`).
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
- The public pages read the store through `frontend/src/lib/site/content.ts`.
  Every read there is cached under the tag of its collection, and the portal
  revalidates that tag after a write — that is what makes a record saved in
  the portal appear on the site.
- The proxy only guards documents (`GET`/`HEAD`). Server actions post to
  the page they belong to; a redirect would turn that post into a request
  for a page.
- `cookies()` is asynchronous in this version of Next.js and cannot be read
  outside a `<Suspense>` boundary — the portal top bar sits in one.
