<script setup lang="ts">
import { computed } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, selectDefaults, selectSizeData } from "@75neo/themes";
import { useSelectVariants } from "./variants";

const selectClearTrigger = cva(
  "pointer-events-auto inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: selectSizeData.clearTrigger },
    defaultVariants: selectDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSelectVariants();
const clearTriggerClass = computed(() =>
  cn(selectClearTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ClearTrigger data-slot="select-clear-trigger" :class="clearTriggerClass">
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.ClearTrigger>
</template>
