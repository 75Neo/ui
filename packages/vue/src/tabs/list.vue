<script setup lang="ts">
import { computed } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cva } from "class-variance-authority";
import { cn, tabsDefaults, tabsVariantData } from "@75neo/themes";
import { useTabsVariants } from "./variants";

const tabsList = cva(
  "relative isolate flex min-w-0 shrink-0 group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: { variant: tabsVariantData.list },
    defaultVariants: tabsDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTabsVariants();
const listClass = computed(() => cn(tabsList(variants), props.class as string | undefined));
</script>

<template>
  <Ark.List data-slot="tabs-list" :class="listClass">
    <slot />
  </Ark.List>
</template>
