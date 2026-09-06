<script setup lang="ts">
import { computed } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cva } from "class-variance-authority";
import { cn, tabsDefaults, tabsIndicatorCompoundData, tabsVariantData } from "@75neo/themes";
import { useTabsVariants } from "./variants";

const tabsIndicator = cva("absolute -z-10", {
  variants: {
    variant: tabsVariantData.indicator,
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: "",
    },
  },
  compoundVariants: tabsIndicatorCompoundData,
  defaultVariants: tabsDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

const variants = useTabsVariants();
const indicatorClass = computed(() =>
  cn(tabsIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator data-slot="tabs-indicator" :class="indicatorClass" />
</template>
