---
title: File Upload
description: A dropzone and a file list, with size and count validation.
category: Forms
registryItem: file-upload
---

## Usage

The accepted files live in the machine. Read them from the context component and render an item for
each one.

```vue
<template>
  <FileUpload :max-files="3" accept="image/*">
    <FileUploadLabel>Screenshots</FileUploadLabel>
    <FileUploadDropzone>Drop images here, or click to choose</FileUploadDropzone>

    <FileUploadItemGroup>
      <FileUploadContext v-slot="upload">
        <FileUploadItem v-for="file in upload.acceptedFiles" :key="file.name" :file="file">
          <FileUploadItemPreview type="image/*">
            <FileUploadItemPreviewImage />
          </FileUploadItemPreview>
          <FileUploadItemName />
          <FileUploadItemSizeText />
          <FileUploadItemDeleteTrigger aria-label="Remove">
            <X />
          </FileUploadItemDeleteTrigger>
        </FileUploadItem>
      </FileUploadContext>
    </FileUploadItemGroup>

    <FileUploadHiddenInput />
  </FileUpload>
</template>
```

## It does not upload

The name is Ark's. This picks files, validates them and hands you a list. Sending them is yours,
which is the right split: retries, progress and cancellation belong to your transport, not to a
form control.

## Validation

`accept`, `maxFiles`, `maxFileSize` and `minFileSize` filter what gets in, and anything rejected
arrives separately with a reason rather than being dropped silently. Show it. A file that vanishes
without explanation is the worst version of this control.

## The dropzone

The dropzone is also the trigger, so clicking it opens the file picker and dragging onto it works
too. It reports `data-dragging` while a file is over it. Add `FileUploadTrigger` as well when the
dropzone is large and the button needs to be somewhere else.

`preventDocumentDrop` stops the browser from navigating away when a file is dropped outside the
zone, which is almost always what you want.

## Previews

`FileUploadItemPreview` takes a `type` and renders only for files that match it, so an image
thumbnail and a generic icon are two previews in the same item rather than a conditional.
