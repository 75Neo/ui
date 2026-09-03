import { Files, Home, Settings, Users } from "lucide-react";
import { sidebar, variantValues } from "@75neo/themes";
import { Container, Header, Main, Sidebar } from "@75neo/react";

const variants = variantValues(sidebar, "variant");
const collapsibles = variantValues(sidebar, "collapsible");

const label = "text-dimmed font-mono text-[0.6875rem] leading-none";

/*
 * The frame is `transform-gpu`, which makes it the containing block for the sidebar's
 * own `fixed` panel and for the scrim behind it, so a specimen stays inside its box.
 * In a real page both are measured against the viewport and nothing overrides them.
 */
const frame = "relative h-80 transform-gpu overflow-hidden rounded-lg ring ring-default";

/* The panel is `h-dvh` against the real viewport, which a frame this size has to cap. */
const boxed = { container: "h-full", inner: "h-full" };

const items = [
  { label: "Overview", icon: Home },
  { label: "Files", icon: Files },
  { label: "People", icon: Users },
  { label: "Settings", icon: Settings },
];

function Nav() {
  return (
    <nav className="flex flex-col gap-1">
      {items.map(({ label: name, icon: Icon }) => (
        <a
          key={name}
          href="#"
          className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-toned hover:bg-elevated"
        >
          <Icon className="size-4 shrink-0" />
          <span className="truncate">{name}</span>
        </a>
      ))}
    </nav>
  );
}

function Shell({
  variant,
  collapsible,
}: {
  variant: (typeof variants)[number];
  collapsible: (typeof collapsibles)[number];
}) {
  return (
    <div className={frame}>
      <div className="flex h-full">
        <Sidebar
          variant={variant}
          collapsible={collapsible}
          title="Acme"
          description="Workspace"
          close
          rail
          ui={boxed}
          footer={<span className="truncate text-sm text-muted">chien@acme.dev</span>}
        >
          <Nav />
        </Sidebar>

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <Header title="Overview" ui={{ base: "h-14" }} />
          <Main ui={{ base: "min-h-0 flex-1" }}>
            <Container className="py-6 text-sm text-muted">
              The spacer beside the panel is what keeps this column out from under it, so collapsing
              moves both together.
            </Container>
          </Main>
        </div>
      </div>
    </div>
  );
}

export default function SidebarPreview() {
  return (
    <div className="flex flex-col gap-6">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <p className={label} data-identifier>
            {variant}
          </p>
          <Shell variant={variant} collapsible="offcanvas" />
        </div>
      ))}

      <hr className="border-muted" />

      {collapsibles.map((collapsible) => (
        <div key={collapsible} className="flex flex-col gap-2">
          <p className={label} data-identifier>
            {collapsible}
          </p>
          <Shell variant="sidebar" collapsible={collapsible} />
        </div>
      ))}
    </div>
  );
}
