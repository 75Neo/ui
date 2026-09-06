<script setup lang="ts">
import { computed } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxItemIndicator = cva("ms-auto shrink-0 [&>svg]:size-full", {
  variants: { size: comboboxSizeData.itemIndicator },
  defaultVariants: comboboxDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useComboboxVariants();
const itemIndicatorClass = computed(() =>
  cn(comboboxItemIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemIndicator data-slot="combobox-item-indicator" :class="itemIndicatorClass">
    <slot>
      <component :is="CheckIcon" />
    </slot>
  </Ark.ItemIndicator>
</template>
