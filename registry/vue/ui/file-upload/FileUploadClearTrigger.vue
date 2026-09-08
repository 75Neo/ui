<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadClearTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadClearTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fileUpload();
</script>

<template>
  <Ark.ClearTrigger :class="cn(styles.clearTrigger(), props.class)">
    <slot />
  </Ark.ClearTrigger>
</template>
