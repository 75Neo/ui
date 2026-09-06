<script setup lang="ts">
import { computed } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cva } from "class-variance-authority";
import { cn, editableDefaults, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editablePreview = cva(
  "col-start-1 row-start-1 min-w-0 cursor-text truncate rounded-md text-toned hover:bg-elevated data-disabled:cursor-not-allowed data-disabled:opacity-75 data-[placeholder-shown]:text-dimmed",
  {
    variants: { size: editableSizeData.preview },
    defaultVariants: editableDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useEditableVariants();
const previewClass = computed(() =>
  cn(editablePreview(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Preview data-slot="editable-preview" :class="previewClass">
    <slot />
  </Ark.Preview>
</template>
