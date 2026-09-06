<script setup lang="ts">
import { computed } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { cva } from "class-variance-authority";
import { cn, switchControlCompoundData, switchDefaults, switchSizeData } from "@75neo/themes";
import { useSwitchVariants } from "./variants";

const switchControl = cva(
  "inline-flex shrink-0 items-center rounded-full bg-accented p-0.5 ring ring-transparent transition-colors ring-inset data-focus-visible:outline-3 data-invalid:ring-error hover:data-[state=unchecked]:bg-accented/75",
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
      size: switchSizeData.control,
    },
    compoundVariants: switchControlCompoundData,
    defaultVariants: switchDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSwitchVariants();
const controlClass = computed(() => cn(switchControl(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Control data-slot="switch-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
