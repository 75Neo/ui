import { DownloadTrigger } from "@75neo/react/download-trigger";

const file = () => new Blob(["75NeoUI"], { type: "text/plain" });

export function DownloadTriggerPreview() {
  return (
    <div className="max-w-xs">
      <DownloadTrigger data={file()} fileName="75neo.txt" mimeType="text/plain">
        Save
      </DownloadTrigger>
    </div>
  );
}
