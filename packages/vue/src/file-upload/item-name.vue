<script setup lang="ts">
import { computed } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemName = cva("truncate font-medium text-highlighted", {
  variants: { size: fileUploadSizeData.itemName },
  defaultVariants: fileUploadDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFileUploadVariants();
const itemNameClass = computed(() =>
  cn(fileUploadItemName({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemName data-slot="file-upload-item-name" :class="itemNameClass">
    <!-- Ark reads the file name itself when no slot arrives; an empty one crashes it. -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Ark.ItemName>
</template>
