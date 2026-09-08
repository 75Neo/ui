import { FileUploadContext } from "@ark-ui/react/file-upload";
import { Upload, X } from "lucide-react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemName,
  FileUploadItemPreview,
  FileUploadItemPreviewImage,
  FileUploadItemSizeText,
  FileUploadLabel,
} from "@/components/react";

export default function FileUploadOverview() {
  return (
    <FileUpload maxFiles={3} accept="image/*">
      <FileUploadLabel>Screenshots</FileUploadLabel>
      <FileUploadDropzone>
        <Upload className="size-5 text-dimmed" />
        Drop images here, or click to choose
      </FileUploadDropzone>

      <FileUploadItemGroup>
        <FileUploadContext>
          {(upload) =>
            upload.acceptedFiles.map((file) => (
              <FileUploadItem key={file.name} file={file}>
                <FileUploadItemPreview type="image/*">
                  <FileUploadItemPreviewImage />
                </FileUploadItemPreview>
                <FileUploadItemName />
                <FileUploadItemSizeText />
                <FileUploadItemDeleteTrigger aria-label="Remove">
                  <X />
                </FileUploadItemDeleteTrigger>
              </FileUploadItem>
            ))
          }
        </FileUploadContext>
      </FileUploadItemGroup>

      <FileUploadHiddenInput />
    </FileUpload>
  );
}
