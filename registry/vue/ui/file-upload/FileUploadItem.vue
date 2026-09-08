<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadItemProps {
  file: File;
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadItemProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fileUpload();
</script>

<template>
  <Ark.Item :file="props.file" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
