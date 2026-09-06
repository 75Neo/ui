<script setup lang="ts">
import { computed } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cva } from "class-variance-authority";
import { ChevronDown as ChevronDownIcon } from "@lucide/vue";
import { cn, selectDefaults, selectSizeData, type SelectIndicatorProps } from "@75neo/themes";
import { useSelectVariants } from "./variants";

const selectIndicator = cva(
  "inline-flex shrink-0 items-center justify-center text-dimmed transition-transform [&>svg]:size-full",
  {
    variants: {
      size: selectSizeData.indicator,
      spin: { true: "data-[state=open]:rotate-180", false: "" },
    },
    defaultVariants: { ...selectDefaults, spin: true },
  },
);

const props = withDefaults(
  defineProps<
    SelectIndicatorProps & {
      class?: unknown;
    }
  >(),
  { spin: true },
);

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSelectVariants();
const indicatorClass = computed(() =>
  cn(selectIndicator({ ...variants, spin: props.spin }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator data-slot="select-indicator" :class="indicatorClass">
    <slot>
      <component :is="ChevronDownIcon" />
    </slot>
  </Ark.Indicator>
</template>
