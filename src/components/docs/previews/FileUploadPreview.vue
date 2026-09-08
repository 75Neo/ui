<script setup lang="ts">
import { Upload, X } from "@lucide/vue";
import { FileUploadContext } from "@ark-ui/vue/file-upload";
import FileUpload from "@/registry/vue/ui/file-upload/FileUpload.vue";
import FileUploadDropzone from "@/registry/vue/ui/file-upload/FileUploadDropzone.vue";
import FileUploadHiddenInput from "@/registry/vue/ui/file-upload/FileUploadHiddenInput.vue";
import FileUploadItem from "@/registry/vue/ui/file-upload/FileUploadItem.vue";
import FileUploadItemDeleteTrigger from "@/registry/vue/ui/file-upload/FileUploadItemDeleteTrigger.vue";
import FileUploadItemGroup from "@/registry/vue/ui/file-upload/FileUploadItemGroup.vue";
import FileUploadItemName from "@/registry/vue/ui/file-upload/FileUploadItemName.vue";
import FileUploadItemPreview from "@/registry/vue/ui/file-upload/FileUploadItemPreview.vue";
import FileUploadItemPreviewImage from "@/registry/vue/ui/file-upload/FileUploadItemPreviewImage.vue";
import FileUploadItemSizeText from "@/registry/vue/ui/file-upload/FileUploadItemSizeText.vue";
import FileUploadLabel from "@/registry/vue/ui/file-upload/FileUploadLabel.vue";
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
