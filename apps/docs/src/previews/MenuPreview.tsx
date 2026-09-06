import { Menu } from "@75neo/react/menu";

const items = [
  { value: "new", label: "New file" },
  { value: "open", label: "Open…" },
  { value: "save", label: "Save", shortcut: "⌘S" },
];

export function MenuPreview() {
  return (
    <Menu items={items}>
      <button type="button">File</button>
    </Menu>
  );
}
