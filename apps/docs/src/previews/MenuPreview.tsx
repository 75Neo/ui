import { Copy, FileText, Trash2 } from "lucide-react";
import { Button, Menu } from "@75neo/react";

const items = [
  { type: "label" as const, label: "File" },
  { label: "New file", icon: <FileText />, shortcut: "⌘N" },
  { label: "Duplicate", icon: <Copy />, shortcut: "⌘D" },
  { label: "Export as", children: [{ label: "PDF" }, { label: "PNG" }] },
  { type: "separator" as const },
  { label: "Delete", icon: <Trash2 />, shortcut: "⌫" },
];

export function MenuPreview() {
  return (
    <Menu items={items}>
      <Button variant="outline">Actions</Button>
    </Menu>
  );
}
