import { Picture } from "@/src/components/site/Picture";
import { siteClients } from "@/src/lib/site/content";

export async function Clients() {
  // The logos come from the portal: only the published ones are shown.
  const clients = await siteClients();

  return (
    <section
      className="border-b border-border bg-surface"
      aria-label="Clients"
    >
      <div className="container-page flex flex-wrap items-center justify-between gap-6 py-9">
        <p
          data-reveal
          className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink-subtle"
        >
          Trusted by teams across Rwanda
        </p>
        <ul
          data-reveal-group
          className="flex flex-wrap gap-4"
        >
          {clients.map((client) => (
            <li key={client.id} className="h-11 w-[132px]">
              <Picture
                src={client.logoUrl}
                alt={client.name}
                placeholder="[CLIENT LOGO]"
                placeholderClass="text-[0.625rem]"
                className="h-full w-full"
                sizes="132px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
