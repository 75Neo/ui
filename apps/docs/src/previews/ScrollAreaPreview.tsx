import { ScrollArea } from "@75neo/react/scroll-area";

const lines = Array.from({ length: 14 }, (_, index) => `Line ${index + 1}`);

export function ScrollAreaPreview() {
  return (
    <ScrollArea className="h-32 w-full max-w-xs rounded-lg ring ring-default ring-inset">
      <div className="flex flex-col gap-2 p-3 text-sm text-toned">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </ScrollArea>
  );
}
