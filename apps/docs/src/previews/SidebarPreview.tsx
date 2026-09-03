import { Files, Home, Settings, Users } from "lucide-react";
import { Container, Header, Main, Sidebar } from "@75neo/react";

/* `transform-gpu` makes the frame the containing block for the panel's own `fixed`. */
const frame = "relative h-80 transform-gpu overflow-hidden rounded-lg ring ring-default";

/* The panel is `h-dvh` against the real viewport, which a framed specimen has to cap. */
const boxed = { container: "h-full", inner: "h-full" };

const items = [
  { label: "Overview", icon: Home },
  { label: "Files", icon: Files },
  { label: "People", icon: Users },
  { label: "Settings", icon: Settings },
];

export function SidebarPreview() {
  return (
    <div className={frame}>
      <div className="flex h-full">
        <Sidebar title="Acme" description="Workspace" close rail ui={boxed}>
          <nav className="flex flex-col gap-1">
            {items.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-toned hover:bg-elevated"
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}
          </nav>
        </Sidebar>

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <Header title="Overview" ui={{ base: "h-14" }} />
          <Main ui={{ base: "min-h-0 flex-1" }}>
            <Container className="py-6 text-sm text-muted">
              The spacer beside the panel keeps this column out from under it, so collapsing moves
              both together.
            </Container>
          </Main>
        </div>
      </div>
    </div>
  );
}
