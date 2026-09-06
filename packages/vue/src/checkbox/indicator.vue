<script setup lang="ts">
import { computed } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import { cn, checkboxDefaults, checkboxSizeData } from "@75neo/themes";
import { useCheckboxVariants } from "./variants";

const checkboxIndicator = cva("flex items-center justify-center [&>svg]:size-full", {
  variants: { size: checkboxSizeData.indicator },
  defaultVariants: checkboxDefaults,
});

const props = defineProps<{
  class?: unknown;
  indeterminate?: boolean;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useCheckboxVariants();
const indicatorClass = computed(() =>
  cn(checkboxIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator
    data-slot="checkbox-indicator"
    :class="indicatorClass"
    :indeterminate="props.indeterminate"
  >
    <slot>
      <component :is="CheckIcon" />
    </slot>
  </Ark.Indicator>
</template>
