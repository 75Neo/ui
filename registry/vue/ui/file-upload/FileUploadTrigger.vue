<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

interface FileUploadTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FileUploadTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = fileUpload();
</script>

<template>
  <Ark.Trigger :class="cn(styles.trigger(), props.class)">
    <slot />
  </Ark.Trigger>
</template>
