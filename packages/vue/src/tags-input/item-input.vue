<script setup lang="ts">
import { computed } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cva } from "class-variance-authority";
import { cn, tagsInputDefaults, tagsInputSizeData } from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputItemInput = cva(
  "min-w-0 rounded-sm bg-elevated text-highlighted ring-1 ring-accented outline-none ring-inset",
  {
    variants: { size: tagsInputSizeData.itemInput },
    defaultVariants: tagsInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useTagsInputVariants();
const itemInputClass = computed(() =>
  cn(tagsInputItemInput(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemInput data-slot="tags-input-item-input" :class="itemInputClass" />
</template>
