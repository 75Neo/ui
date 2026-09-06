import type { ReactNode } from "react";
import { Menu } from "@75neo/react/menu";
import { menuSchema } from "@75neo/themes";

const sizes = menuSchema.size.values;
const colors = menuSchema.color.values;

const items = [
  { value: "new", label: "New file" },
  { value: "open", label: "Open…" },
  { type: "separator" as const },
  { value: "save", label: "Save", shortcut: "⌘S" },
];

const checkItems = [
  { value: "toolbar", label: "Show toolbar", type: "checkbox" as const, checked: true },
  { value: "status", label: "Show status bar", type: "checkbox" as const },
];

const nestedItems = [
  { value: "email", label: "Email" },
  {
    value: "share",
    label: "Share",
    children: [
      { value: "message", label: "Message" },
      { value: "airdrop", label: "AirDrop" },
    ],
  },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
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

export default function MenuPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Menu size={size} items={items}>
              <button type="button">File</button>
            </Menu>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          {colors.map((color) => (
            <Menu key={color} color={color} items={checkItems}>
              <button type="button">{color}</button>
            </Menu>
          ))}
        </Row>

        <Row label="checkbox">
          <Menu items={checkItems}>
            <button type="button">View</button>
          </Menu>
        </Row>

        <Row label="submenu">
          <Menu items={nestedItems}>
            <button type="button">Share</button>
          </Menu>
        </Row>

        <Row label="arrow">
          <Menu items={items} arrow>
            <button type="button">File</button>
          </Menu>
        </Row>
      </div>
    </div>
  );
}
