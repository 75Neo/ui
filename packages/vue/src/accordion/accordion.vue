<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import { Accordion as Ark } from "@ark-ui/vue/accordion";
import { cva } from "class-variance-authority";
import {
  accordionDefaults,
  accordionVariantData,
  cn,
  type AccordionRootProps,
} from "@75neo/themes";
import { accordionVariantsKey } from "./variants";

const accordionRoot = cva(
  "group/accordion flex min-w-0 flex-col data-[orientation=horizontal]:h-full data-[orientation=horizontal]:flex-row",
  {
    variants: { variant: accordionVariantData.root },
    defaultVariants: accordionDefaults,
  },
);

const props = defineProps<
  AccordionRootProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get variant() {
    return props.variant ?? accordionDefaults.variant;
  },
  get size() {
    return props.size ?? accordionDefaults.size;
  },
});
provide(accordionVariantsKey, resolved);

const rootClass = computed(() =>
  cn(accordionRoot({ variant: resolved.variant }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    :multiple="props.multiple"
    :collapsible="props.collapsible"
    :disabled="props.disabled"
    :orientation="props.orientation"
    data-slot="accordion"
    :data-size="resolved.size"
    :data-variant="resolved.variant"
    :class="rootClass"
  >
    <slot />
  </Ark.Root>
</template>
