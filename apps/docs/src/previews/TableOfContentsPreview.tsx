import { TableOfContents } from "@75neo/react/table-of-contents";

const items = [
  { value: "install", depth: 2, label: "Install" },
  { value: "usage", depth: 2, label: "Usage" },
  { value: "api", depth: 2, label: "API" },
];

export function TableOfContentsPreview() {
  return (
    <div className="max-w-xs">
      <TableOfContents items={items} />
    </div>
  );
}
