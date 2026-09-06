import type { ReactNode } from "react";
import { FileUpload } from "@75neo/react/file-upload";
import { fileUploadSchema } from "@75neo/themes";

const sizes = fileUploadSchema.size.values;
const colors = fileUploadSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-sm";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={row}>
      <p className={rowLabel} data-identifier>
        {label}
      </p>
      <div className={rowItems}>{children}</div>
    </div>
  );
}

export default function FileUploadPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <FileUpload size={size} label="Attachment" />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        {colors.map((color) => (
          <Row key={color} label={color}>
            <FileUpload color={color} />
          </Row>
        ))}

        <Row label="described">
          <FileUpload
            label="Avatar"
            title="Drop an image here"
            description="PNG or JPG, up to 2 MB"
            accept="image/*"
            maxFileSize={2_000_000}
          />
        </Row>

        <Row label="multiple">
          <FileUpload maxFiles={5} triggerLabel="Choose files" />
        </Row>

        <Row label="disabled">
          <FileUpload disabled />
        </Row>

        <Row label="invalid">
          <FileUpload invalid />
        </Row>
      </div>
    </div>
  );
}
