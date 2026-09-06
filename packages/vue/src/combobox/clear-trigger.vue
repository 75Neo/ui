<script setup lang="ts">
import { computed } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxClearTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: comboboxSizeData.clearTrigger },
    defaultVariants: comboboxDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useComboboxVariants();
const clearTriggerClass = computed(() =>
  cn(comboboxClearTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ClearTrigger data-slot="combobox-clear-trigger" :class="clearTriggerClass">
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.ClearTrigger>
</template>
