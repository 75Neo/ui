import { useState } from "react";
import { Copy, FileText, Scissors, Settings, Trash2 } from "lucide-react";
import { menu, variantValues } from "@75neo/themes";
import { Button, Menu } from "@75neo/react";

const sizes = variantValues(menu, "size");
const colors = variantValues(menu, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const basic = [
  { label: "New file", icon: <FileText />, shortcut: "⌘N" },
  { label: "Copy", icon: <Copy />, shortcut: "⌘C" },
  { label: "Cut", icon: <Scissors />, shortcut: "⌘X", disabled: true },
  { type: "separator" as const },
  { label: "Delete", icon: <Trash2 />, shortcut: "⌫" },
];

export default function MenuPreview() {
  const [wrap, setWrap] = useState(true);
  const [minimap, setMinimap] = useState(false);
  const [chosen, setChosen] = useState("nothing yet");

  const grouped = [
    { type: "label" as const, label: "File" },
    { label: "New file", icon: <FileText /> },
    { label: "Open recent", children: [{ label: "index.ts" }, { label: "menu.ts" }] },
    { type: "label" as const, label: "Danger" },
    { label: "Delete", icon: <Trash2 /> },
  ];

  const views = [
    { type: "label" as const, label: "View" },
    { type: "checkbox" as const, label: "Word wrap", checked: wrap, onCheckedChange: setWrap },
    {
      type: "checkbox" as const,
      label: "Minimap",
      checked: minimap,
      onCheckedChange: setMinimap,
    },
    { type: "separator" as const },
    { label: "Settings", icon: <Settings />, href: "#settings" },
  ];

  const nested = [
    { label: "Share" },
    {
      label: "Export as",
      children: [
        { label: "PDF" },
        { label: "PNG" },
        { label: "More", children: [{ label: "SVG" }, { label: "WebP" }] },
      ],
    },
  ];

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Menu size={size} items={basic}>
            <Button size="sm" variant="outline">
              Actions
            </Button>
          </Menu>
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the highlighted row and a checked one, so open a menu and
          arrow down to see it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <Menu color={accent} size="sm" items={basic}>
            <Button size="sm" variant="outline" color={accent}>
              Actions
            </Button>
          </Menu>
        </div>
      ))}

      <hr className="border-muted" />

      <div className="flex flex-wrap items-start gap-3">
        <Menu items={grouped}>
          <Button variant="outline">Headings</Button>
        </Menu>
        <Menu items={views}>
          <Button variant="outline">Ticks and a link</Button>
        </Menu>
        <Menu items={nested}>
          <Button variant="outline">Three deep</Button>
        </Menu>
        <Menu items={basic} arrow placement="right-start">
          <Button variant="outline">With an arrow</Button>
        </Menu>
        <Menu items={basic} transition={false}>
          <Button variant="outline">No motion</Button>
        </Menu>
      </div>

      <hr className="border-muted" />

      {/* Every row carries a value, which is what Ark reports when one is chosen. */}
      <div className="flex flex-wrap items-center gap-4">
        <Menu items={basic} onSelect={(details: { value: string }) => setChosen(details.value)}>
          <Button variant="outline">Tell me what was chosen</Button>
        </Menu>
        <output className="font-mono text-sm text-toned">{chosen}</output>
      </div>
    </div>
  );
}
