import type React from "react";
import { FileUpload as Ark, type FileUploadRootProps } from "@ark-ui/react/file-upload";
import { UploadCloud, X } from "lucide-react";
import {
  fileUpload,
  type FileUploadProps as FileUploadContract,
  isPreviewableFile,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the FileUpload.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name, and `accept` because the
 * DOM's is a comma-separated string where Ark's also takes a map of type to extensions.
 *
 * The file props come from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface FileUploadProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "dir" | "accept">,
    Pick<
      FileUploadRootProps,
      "acceptedFiles" | "defaultAcceptedFiles" | "onFileChange" | "onFileReject" | "ids"
    >,
    FileUploadContract<React.ReactNode> {}

export function FileUpload({
  ui,
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
  ...rest
}: FileUploadProps) {
  const theme = useResolvedTheme(fileUpload, "fileUpload", { ui, color, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
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
    >
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}

      {/* The dropzone is the control, and the button inside it is a second way in
          rather than the only one — which is why `disableClick` is not set: clicking
          anywhere on the area opens the picker. */}
      <Ark.Dropzone data-slot="dropzone" className={theme.class.dropzone}>
        <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
          {icon ?? <UploadCloud />}
        </span>
        <p data-slot="title" className={theme.class.title}>
          {title ?? "Drop a file here"}
        </p>
        {description != null && (
          <p data-slot="description" className={theme.class.description}>
            {description}
          </p>
        )}
        <Ark.Trigger data-slot="trigger" className={theme.class.trigger}>
          {triggerLabel ?? "Choose a file"}
        </Ark.Trigger>
      </Ark.Dropzone>

      {list && (
        <Ark.ItemGroup data-slot="list" className={theme.class.list}>
          <Ark.Context>
            {(api) =>
              api.acceptedFiles.map((file) => (
                <Ark.Item
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  file={file}
                  data-slot="item"
                  className={theme.class.item}
                >
                  {/* Drawn for an image and skipped for anything else, so a row's
                      height comes from its text and does not jump between kinds. */}
                  {preview && isPreviewableFile(file) && (
                    <Ark.ItemPreview
                      type="image/*"
                      data-slot="itemPreview"
                      className={theme.class.itemPreview}
                    >
                      <Ark.ItemPreviewImage
                        data-slot="itemPreviewImage"
                        className={theme.class.itemPreviewImage}
                      />
                    </Ark.ItemPreview>
                  )}
                  <div data-slot="wrapper" className={theme.class.wrapper}>
                    <Ark.ItemName data-slot="itemName" className={theme.class.itemName}>
                      {file.name}
                    </Ark.ItemName>
                    <Ark.ItemSizeText
                      data-slot="itemSizeText"
                      className={theme.class.itemSizeText}
                    />
                  </div>
                  <Ark.ItemDeleteTrigger
                    data-slot="itemDeleteTrigger"
                    className={theme.class.itemDeleteTrigger}
                  >
                    {deleteIcon ?? <X />}
                  </Ark.ItemDeleteTrigger>
                </Ark.Item>
              ))
            }
          </Ark.Context>
        </Ark.ItemGroup>
      )}

      {/* The one part with no slot of its own: it is hidden by contract, so a class on
          it would style nothing. It is what puts the files into a form. */}
      <Ark.HiddenInput />
    </Ark.Root>
  );
}
