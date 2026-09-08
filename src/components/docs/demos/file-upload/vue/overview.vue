<script setup lang="ts">
import { FileUploadContext } from "@ark-ui/vue/file-upload";
import { Upload, X } from "@lucide/vue";
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
} from "@/components/vue";
</script>

<template>
  <FileUpload :max-files="3" accept="image/*">
    <FileUploadLabel>Screenshots</FileUploadLabel>
    <FileUploadDropzone>
      <Upload class="size-5 text-dimmed" />
      Drop images here, or click to choose
    </FileUploadDropzone>

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
