<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadItemPreviewImageProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadItemPreviewImageProps>();

const styles = fileUpload();
</script>

<template>
  <Ark.ItemPreviewImage :class="cn(styles.itemPreviewImage(), props.class)" />
</template>
