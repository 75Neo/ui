<script setup lang="ts">
import { computed } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cva } from "class-variance-authority";
import {
  cn,
  tagsInputControlCompoundData,
  tagsInputDefaults,
  tagsInputSizeData,
} from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputControl = cva(
  "flex w-full min-w-0 flex-wrap items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
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
      size: tagsInputSizeData.control,
    },
    compoundVariants: tagsInputControlCompoundData,
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
const controlClass = computed(() =>
  cn(tagsInputControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="tags-input-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
