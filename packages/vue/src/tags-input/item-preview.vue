<script setup lang="ts">
import { computed } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cva } from "class-variance-authority";
import {
  cn,
  tagsInputDefaults,
  tagsInputItemPreviewCompoundData,
  tagsInputSizeData,
} from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputItemPreview = cva(
  "inline-flex min-w-0 items-center rounded-sm bg-elevated text-toned select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: tagsInputSizeData.itemPreview,
    },
    compoundVariants: tagsInputItemPreviewCompoundData,
    defaultVariants: tagsInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTagsInputVariants();
const itemPreviewClass = computed(() =>
  cn(tagsInputItemPreview(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemPreview data-slot="tags-input-item-preview" :class="itemPreviewClass">
    <slot />
  </Ark.ItemPreview>
</template>
