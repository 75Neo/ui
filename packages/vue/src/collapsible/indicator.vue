<script setup lang="ts">
import { computed } from "vue";
import { Collapsible as Ark } from "@ark-ui/vue/collapsible";
import { cva } from "class-variance-authority";
import { ChevronDown } from "@lucide/vue";
import { cn, collapsibleDefaults, collapsibleSizeData } from "@75neo/themes";
import { useCollapsibleVariants } from "./variants";

const collapsibleIndicator = cva(
  "ms-auto shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-full",
  {
    variants: { size: collapsibleSizeData.indicator },
    defaultVariants: collapsibleDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useCollapsibleVariants();
const indicatorClass = computed(() =>
  cn(collapsibleIndicator({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator data-slot="collapsible-indicator" :class="indicatorClass">
    <slot>
      <component :is="ChevronDown" />
    </slot>
  </Ark.Indicator>
</template>
