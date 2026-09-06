<script setup lang="ts">
import { computed } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { cva } from "class-variance-authority";
import { cn, checkboxControlCompoundData, checkboxDefaults, checkboxSizeData } from "@75neo/themes";
import { useCheckboxVariants } from "./variants";

const checkboxControl = cva(
  "inline-flex shrink-0 items-center justify-center rounded-sm bg-default text-inverted ring ring-accented transition-colors ring-inset data-focus-visible:outline-3 data-invalid:ring-error hover:data-[state=unchecked]:ring-inverted/50",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: checkboxSizeData.control,
    },
    compoundVariants: checkboxControlCompoundData,
    defaultVariants: checkboxDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useCheckboxVariants();
const controlClass = computed(() =>
  cn(checkboxControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="checkbox-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
