<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUploadStyles as styles } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadItemDeleteTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadItemDeleteTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemDeleteTrigger :class="cn(styles.itemDeleteTrigger(), props.class)">
    <slot />
  </Ark.ItemDeleteTrigger>
</template>
