import { Clipboard } from "@75neo/react";

export function ClipboardPreview() {
  return (
    <div className="flex flex-col gap-4">
      <Clipboard value="pnpm add @75neo/react" />
      <Clipboard
        label="Registry URL"
        value="https://75neo.dev/r/button.json"
        color="primary"
        size="lg"
      />
    </div>
  );
}
