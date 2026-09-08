<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadDropzoneProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadDropzoneProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fileUpload();
</script>

<template>
  <Ark.Dropzone :class="cn(styles.dropzone(), props.class)">
    <slot />
  </Ark.Dropzone>
</template>
