<script setup lang="ts">
import { computed } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cva } from "class-variance-authority";
import {
  cn,
  tabsDefaults,
  tabsSizeData,
  tabsTriggerCompoundData,
  tabsVariantData,
  type TabsTriggerProps,
} from "@75neo/themes";
import { useTabsVariants } from "./variants";

const tabsTrigger = cva(
  "inline-flex min-w-0 cursor-pointer items-center gap-2 font-medium whitespace-nowrap transition-colors select-none group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      variant: tabsVariantData.trigger,
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: tabsSizeData.trigger,
    },
    compoundVariants: tabsTriggerCompoundData,
    defaultVariants: tabsDefaults,
  },
);

const props = defineProps<
  TabsTriggerProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTabsVariants();
const triggerClass = computed(() => cn(tabsTrigger(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Trigger
    :value="props.value"
    :disabled="props.disabled"
    data-slot="tabs-trigger"
    :class="triggerClass"
  >
    <slot />
  </Ark.Trigger>
</template>
