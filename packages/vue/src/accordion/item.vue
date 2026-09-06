<script setup lang="ts">
import { computed } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { cva } from "class-variance-authority";
import {
  accordionDefaults,
  accordionVariantData,
  cn,
  type AccordionItemProps,
} from "@75neo/themes";
import { useAccordionVariants } from "./variants";

const accordionItem = cva(
  "min-w-0 [overflow-anchor:none] group-data-[orientation=horizontal]/accordion:flex",
  {
    variants: { variant: accordionVariantData.item },
    defaultVariants: accordionDefaults,
  },
);

const props = defineProps<
  AccordionItemProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useAccordionVariants();
const itemClass = computed(() => cn(accordionItem(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Item
    :value="props.value"
    :disabled="props.disabled"
    data-slot="accordion-item"
    :class="itemClass"
  >
    <slot />
  </Ark.Item>
</template>
