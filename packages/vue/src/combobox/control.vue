<script setup lang="ts">
import { computed } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cva } from "class-variance-authority";
import { cn, comboboxControlCompoundData, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxControl = cva(
  "flex w-full min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
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
      size: comboboxSizeData.control,
    },
    compoundVariants: comboboxControlCompoundData,
    defaultVariants: comboboxDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useComboboxVariants();
const controlClass = computed(() =>
  cn(comboboxControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="combobox-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
