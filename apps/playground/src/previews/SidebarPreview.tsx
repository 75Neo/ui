import type { ReactNode } from "react";
import { Sidebar } from "@75neo/react/sidebar";
import { sidebarSchema } from "@75neo/themes";

const variants = sidebarSchema.variant.values;
const sides = sidebarSchema.side.values;

const frame = "relative h-56 overflow-hidden rounded-lg ring ring-default ring-inset";
const column = "h-full [--sidebar-width:12rem]";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-md";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={row}>
      <p className={rowLabel} data-identifier>
        {label}
      </p>
      <div className={rowItems}>{children}</div>
    </div>
  );
}

function Links() {
  return (
    <nav className="flex flex-col gap-1 text-sm text-toned">
      <a href="#button">Button</a>
      <a href="#select">Select</a>
      <a href="#dialog">Dialog</a>
    </nav>
  );
}

export default function SidebarPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            <div className={frame}>
              <Sidebar
                collapsible="none"
                variant={variant}
                title="75NeoUI"
                description="Components"
                className={column}
              >
                <Links />
              </Sidebar>
            </div>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        {sides.map((side) => (
          <Row key={side} label={side}>
            <div className={`${frame} flex ${side === "end" ? "justify-end" : ""}`}>
              <Sidebar collapsible="none" side={side} title="75NeoUI" className={column}>
                <Links />
              </Sidebar>
            </div>
          </Row>
        ))}

        <Row label="footer">
          <div className={frame}>
            <Sidebar
              collapsible="none"
              title="75NeoUI"
              className={column}
              footer={<span className="text-sm text-muted">Signed in</span>}
            >
              <Links />
            </Sidebar>
          </div>
        </Row>
      </div>
    </div>
  );
}
