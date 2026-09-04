import { FileUpload } from "@75neo/react";

export function FileUploadPreview() {
  return (
    <FileUpload
      label="Attachments"
      accept="image/*"
      maxFiles={4}
      description="PNG, JPG or WebP, up to 5 MB"
      maxFileSize={5_000_000}
    />
  );
}
