<script setup lang="ts">
import { computed } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import { cn, listboxDefaults, listboxSizeData } from "@75neo/themes";
import { useListboxVariants } from "./variants";

const listboxItemIndicator = cva("ms-auto shrink-0 [&>svg]:size-full", {
  variants: { size: listboxSizeData.itemIndicator },
  defaultVariants: listboxDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useListboxVariants();
const itemIndicatorClass = computed(() =>
  cn(listboxItemIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemIndicator data-slot="listbox-item-indicator" :class="itemIndicatorClass">
    <slot>
      <component :is="CheckIcon" />
    </slot>
  </Ark.ItemIndicator>
</template>
