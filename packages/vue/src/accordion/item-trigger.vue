<script setup lang="ts">
import { type Component, computed } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { cva } from "class-variance-authority";
import { ChevronDown } from "@lucide/vue";
import {
  accordionDefaults,
  accordionSizeData,
  accordionVariantData,
  cn,
  type AccordionItemTriggerProps,
} from "@75neo/themes";
import { useAccordionVariants } from "./variants";
import AccordionItemIndicator from "./item-indicator.vue";

defineOptions({ inheritAttrs: false });

const accordionItemTrigger = cva(
  "flex w-full min-w-0 cursor-pointer items-center gap-2 text-start font-medium outline-primary/25 transition-colors select-none group-data-[orientation=horizontal]/accordion:h-full group-data-[orientation=horizontal]/accordion:w-auto group-data-[orientation=horizontal]/accordion:[writing-mode:vertical-rl] focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:-outline-offset-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      variant: accordionVariantData.trigger,
      size: accordionSizeData.trigger,
    },
    defaultVariants: accordionDefaults,
  },
);

const props = defineProps<
  AccordionItemTriggerProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useAccordionVariants();
const triggerClass = computed(() =>
  cn(accordionItemTrigger(variants), props.class as string | undefined),
);
const leadingClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", accordionSizeData.leadingIcon[variants.size]),
);
</script>

<template>
  <!--
    Ark has no header part, so the WAI-ARIA heading wrapper renders here and is
    never exported. The Ark part is not the root node, which is the one
    documented exception to default fallthrough: attrs are re-bound by hand.
  -->
  <h3
    data-slot="accordion-header"
    class="flex min-w-0 group-data-[orientation=horizontal]/accordion:h-full group-data-[orientation=horizontal]/accordion:shrink-0"
  >
    <Ark.ItemTrigger v-bind="$attrs" data-slot="accordion-item-trigger" :class="triggerClass">
      <span v-if="props.leadingIcon" data-slot="accordion-leading-icon" :class="leadingClass">
        <component :is="props.leadingIcon" />
      </span>
      <slot />
      <AccordionItemIndicator>
        <component :is="props.trailingIcon ?? ChevronDown" />
      </AccordionItemIndicator>
    </Ark.ItemTrigger>
  </h3>
</template>
