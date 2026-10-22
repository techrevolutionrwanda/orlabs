# TODO — OrLabs website

Open items for the owner. Nothing below has been invented — every unknown is
still an explicit placeholder in the code.

## Placeholders still on the landing page

| Placeholder | Where | Notes |
| --- | --- | --- |
| `[CLIENT LOGO]` × 4 | `frontend/src/components/landing/Clients.tsx` | Replace with real client logos (SVG, `loading="lazy"`). |
| `[PROJECT SCREENSHOT]` | `frontend/src/components/landing/Work.tsx` | Real product screenshot for the first case study. |
| `[Project name]`, `[one-line result]` | `frontend/src/components/landing/Work.tsx` | Case study title and result. |
| `[CLIENT QUOTE …]`, `[Name]`, `[Role, Company]` | `frontend/src/components/landing/Work.tsx` | Testimonial + attribution. |
| `[FORM_ENDPOINT]` | `frontend/src/components/landing/CtaForm.tsx` | Form `action` fallback; the live submission uses `NEXT_PUBLIC_FORM_ENDPOINT`. |
| `[EMAIL]` | `frontend/src/components/landing/CtaForm.tsx` | Shown in the form error message. |

Still needed for the rest of the site: street address, phone / WhatsApp,
RDB registration number, email address.

## Configuration

- `NEXT_PUBLIC_FORM_ENDPOINT` — URL that accepts the contact form `POST`
  (Formspree, Resend route, own API). Until it is set, the form shows a clear
  "not connected yet" error instead of pretending to succeed.
  See `frontend/.env.example`.
- `metadataBase` — set once the production domain is known so Open Graph
  images resolve absolutely.

## Not built yet

- Shared header and footer (deliberately left out of the landing page pass).
- Remaining pages: About, Services (+ slugs), Industries, Work (+ slugs),
  Labs (+ slugs), Careers, Contact, plus `sitemap.xml` and `robots.txt`.
