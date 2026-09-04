import { useState } from "react";
import { fileUpload, variantValues } from "@75neo/themes";
import { FileUpload } from "@75neo/react";

const sizes = variantValues(fileUpload, "size");
const colors = variantValues(fileUpload, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function FileUploadPreview() {
  const [held, setHeld] = useState<File[]>([]);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <FileUpload size={size} description="Up to 5 MB" maxFileSize={5_000_000} />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent shows on focus and while a file is over the window, so tab to a
          dropzone or drag something onto it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <FileUpload color={accent} size="sm" title="Drop it here" />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        <FileUpload
          label="Images only"
          accept="image/*"
          maxFiles={4}
          title="Drop up to four pictures"
          description="PNG, JPG or WebP"
        />
        <FileUpload
          label="No thumbnails"
          accept="image/*"
          maxFiles={4}
          preview={false}
          title="The rows stay plain"
        />
        <FileUpload label="One document" accept=".pdf,.docx" title="Drop a document" />
        <FileUpload label="Disabled" disabled title="Not today" />
      </div>

      <hr className="border-muted" />

      {/* Controlled: the value is `File[]`, which is what a form body wants. */}
      <div className="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-start @lg:gap-6">
        <FileUpload
          label="Controlled"
          maxFiles={5}
          acceptedFiles={held}
          onFileChange={(details: { acceptedFiles: File[] }) => setHeld(details.acceptedFiles)}
        />
        <output className="font-mono text-sm text-toned">
          {held.length === 0 ? "nothing yet" : `${held.length} file(s)`}
        </output>
      </div>
    </div>
  );
}
