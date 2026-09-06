<script setup lang="ts">
import { computed } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { cva } from "class-variance-authority";
import { ChevronDown } from "@lucide/vue";
import { accordionDefaults, accordionSizeData, cn } from "@75neo/themes";
import { useAccordionVariants } from "./variants";

const accordionItemIndicator = cva(
  "ms-auto shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-full",
  {
    variants: { size: accordionSizeData.indicator },
    defaultVariants: accordionDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useAccordionVariants();
const indicatorClass = computed(() =>
  cn(accordionItemIndicator({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemIndicator data-slot="accordion-item-indicator" :class="indicatorClass">
    <slot>
      <component :is="ChevronDown" />
    </slot>
  </Ark.ItemIndicator>
</template>
