import { Clipboard } from "@75neo/react/clipboard";

export function ClipboardPreview() {
  return (
    <div className="flex max-w-md flex-col gap-2">
      <Clipboard value="pnpm add @75neo/react" />
      <Clipboard label="Registry URL" value="https://75neo.dev/r/button.json" color="primary" />
    </div>
  );
}
