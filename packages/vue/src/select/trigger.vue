<script setup lang="ts">
import { computed } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cva } from "class-variance-authority";
import { cn, selectDefaults, selectSizeData, selectTriggerCompoundData } from "@75neo/themes";
import { useSelectVariants } from "./variants";

const selectTrigger = cva(
  "flex w-full min-w-0 cursor-pointer items-center bg-default text-start text-highlighted ring ring-accented outline-none ring-inset disabled:cursor-not-allowed disabled:opacity-75 data-invalid:ring-error data-[placeholder-shown]:text-dimmed",
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
      size: selectSizeData.trigger,
    },
    compoundVariants: selectTriggerCompoundData,
    defaultVariants: selectDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSelectVariants();
const triggerClass = computed(() => cn(selectTrigger(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Trigger data-slot="select-trigger" :class="triggerClass">
    <slot />
  </Ark.Trigger>
</template>
