<script setup lang="ts">
import { computed } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, tagsInputDefaults, tagsInputSizeData } from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputClearTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: tagsInputSizeData.clearTrigger },
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
const clearTriggerClass = computed(() =>
  cn(tagsInputClearTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ClearTrigger data-slot="tags-input-clear-trigger" :class="clearTriggerClass">
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.ClearTrigger>
</template>
