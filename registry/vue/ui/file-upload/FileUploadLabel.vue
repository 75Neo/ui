<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fileUpload();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
