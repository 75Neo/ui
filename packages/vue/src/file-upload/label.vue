<script setup lang="ts">
import { computed } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadLabel = cva("font-medium text-highlighted select-none", {
  variants: { size: fileUploadSizeData.label },
  defaultVariants: fileUploadDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFileUploadVariants();
const labelClass = computed(() =>
  cn(fileUploadLabel({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Label data-slot="file-upload-label" :class="labelClass">
    <slot />
  </Ark.Label>
</template>
