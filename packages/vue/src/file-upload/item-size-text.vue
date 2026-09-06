<script setup lang="ts">
import { computed } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemSizeText = cva("text-dimmed tabular-nums", {
  variants: { size: fileUploadSizeData.itemSizeText },
  defaultVariants: fileUploadDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFileUploadVariants();
const sizeTextClass = computed(() =>
  cn(fileUploadItemSizeText({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemSizeText data-slot="file-upload-item-size-text" :class="sizeTextClass">
    <!-- Ark reads the file size itself when no slot arrives; an empty one crashes it. -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Ark.ItemSizeText>
</template>
