import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@/components/react";

const items = [
  "accordion",
  "avatar",
  "button",
  "checkbox",
  "collapsible",
  "combobox",
  "dialog",
  "drawer",
  "editable",
  "field",
  "listbox",
  "menu",
];

export default function ScrollAreaOverview() {
  return (
    <ScrollArea className="h-44 max-w-64 rounded-md ring ring-default">
      <ScrollAreaViewport>
        <ScrollAreaContent className="flex flex-col gap-1 p-3">
          {items.map((item) => (
            <p key={item} className="font-mono text-xs text-muted">
              {item}
            </p>
          ))}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
}
