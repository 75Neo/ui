<script setup lang="ts">
import { computed } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemGroup = cva("flex list-none flex-col", {
  variants: { size: fileUploadSizeData.itemGroup },
  defaultVariants: fileUploadDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFileUploadVariants();
const itemGroupClass = computed(() =>
  cn(fileUploadItemGroup({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemGroup data-slot="file-upload-item-group" :class="itemGroupClass">
    <slot />
  </Ark.ItemGroup>
</template>
