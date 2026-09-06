<script setup lang="ts">
import { computed } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cva } from "class-variance-authority";
import { cn, tagsInputDefaults, tagsInputSizeData } from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputInput = cva(
  "min-w-24 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: { size: tagsInputSizeData.input },
    defaultVariants: tagsInputDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** Shown in the field while nothing is being typed. */
  placeholder?: string;
}>();

const variants = useTagsInputVariants();
const inputClass = computed(() => cn(tagsInputInput(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Input data-slot="tags-input-input" :class="inputClass" :placeholder="props.placeholder" />
</template>
