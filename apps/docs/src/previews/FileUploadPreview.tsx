import { FileUpload } from "@75neo/react/file-upload";

export function FileUploadPreview() {
  return (
    <FileUpload
      className="max-w-sm"
      label="Attachment"
      description="PNG or JPG, up to 2 MB"
      maxFileSize={2_000_000}
      accept="image/*"
    />
  );
}
