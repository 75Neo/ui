<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadItemPreviewProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadItemPreviewProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fileUpload();
</script>

<template>
  <Ark.ItemPreview :class="cn(styles.itemPreview(), props.class)">
    <slot />
  </Ark.ItemPreview>
</template>
