<script setup lang="ts">
import { computed } from "vue";
import { TagsInput as Ark } from "@ark-ui/vue/tags-input";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, tagsInputDefaults, tagsInputSizeData } from "@75neo/themes";
import { useTagsInputVariants } from "./variants";

const tagsInputItemDeleteTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xs text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: tagsInputSizeData.itemDeleteTrigger },
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
const itemDeleteTriggerClass = computed(() =>
  cn(tagsInputItemDeleteTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemDeleteTrigger data-slot="tags-input-item-delete-trigger" :class="itemDeleteTriggerClass">
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.ItemDeleteTrigger>
</template>
