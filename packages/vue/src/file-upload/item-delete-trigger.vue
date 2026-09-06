<script setup lang="ts">
import { computed } from "vue";
import { FileUpload as Ark } from "@ark-ui/vue/file-upload";
import { cva } from "class-variance-authority";
import { X } from "@lucide/vue";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemDeleteTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-accented hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: fileUploadSizeData.itemDeleteTrigger },
    defaultVariants: fileUploadDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFileUploadVariants();
const deleteTriggerClass = computed(() =>
  cn(fileUploadItemDeleteTrigger({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemDeleteTrigger data-slot="file-upload-item-delete-trigger" :class="deleteTriggerClass">
    <slot>
      <component :is="X" />
    </slot>
  </Ark.ItemDeleteTrigger>
</template>
