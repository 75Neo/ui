<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUploadStyles as styles } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadItemProps {
  file: File;
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadItemProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item :file="props.file" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
