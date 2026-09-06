import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import {
  cn,
  fileUploadDefaults,
  type FileUploadRootProps as FileUploadContract,
} from "@75neo/themes";
import { FileUploadVariantsContext } from "./variants";
import { FileUploadDropzone } from "./dropzone";
import { FileUploadItem } from "./item";
import { FileUploadItemGroup } from "./item-group";
import { FileUploadLabel } from "./label";
import { FileUploadTrigger } from "./trigger";

/**
 * Props for the FileUpload.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the axis of the same name. The files come from Ark, because
 * React and Vue spell a controlled list too differently to share one type.
 */
export interface FileUploadProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "acceptedFiles" | "defaultAcceptedFiles" | "onFileChange" | "onFileReject" | "ids"
    >,
    FileUploadContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function FileUpload({
  color,
  size,
  label,
  title,
  description,
  triggerLabel,
  accept,
  maxFiles,
  maxFileSize,
  minFileSize,
  allowDrop,
  directory,
  capture,
  preview = true,
  list = true,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  locale,
  icon,
  deleteIcon,
  acceptedFiles,
  defaultAcceptedFiles,
  onFileChange,
  onFileReject,
  ids,
  className,
  children,
  ...rest
}: FileUploadProps) {
  const resolved = {
    color: color ?? fileUploadDefaults.color,
    size: size ?? fileUploadDefaults.size,
  };

  return (
    <FileUploadVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        acceptedFiles={acceptedFiles}
        defaultAcceptedFiles={defaultAcceptedFiles}
        onFileChange={onFileChange}
        onFileReject={onFileReject}
        accept={accept}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        minFileSize={minFileSize}
        allowDrop={allowDrop}
        directory={directory}
        capture={capture}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        name={name}
        locale={locale}
        ids={ids}
        data-slot="file-upload"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
      >
        {children ?? (
          <>
            {label != null && <FileUploadLabel>{label}</FileUploadLabel>}
            <FileUploadDropzone title={title} description={description} icon={icon}>
              <FileUploadTrigger>{triggerLabel}</FileUploadTrigger>
            </FileUploadDropzone>
            {list && (
              <FileUploadItemGroup>
                <Ark.Context>
                  {(api) =>
                    api.acceptedFiles.map((file) => (
                      <FileUploadItem
                        key={`${file.name}-${file.size}-${file.lastModified}`}
                        file={file}
                        preview={preview}
                        deleteIcon={deleteIcon}
                      />
                    ))
                  }
                </Ark.Context>
              </FileUploadItemGroup>
            )}
          </>
        )}
        <Ark.HiddenInput />
      </Ark.Root>
    </FileUploadVariantsContext.Provider>
  );
}
