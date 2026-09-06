<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import {
  cn,
  sidebarClasses,
  sidebarDefaults,
  sidebarRailCompoundData,
  sidebarSideData,
  sidebarVariantData,
} from "@75neo/themes";
import { useSidebarVariants } from "./variants";

const sidebarRail = cva(sidebarClasses.rail, {
  variants: {
    side: sidebarSideData.rail,
    variant: sidebarVariantData.rail,
  },
  compoundVariants: sidebarRailCompoundData,
  defaultVariants: sidebarDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

const sidebar = useSidebarVariants();
const railClass = computed(() =>
  cn(
    sidebarRail({ side: sidebar.side, variant: sidebar.variant }),
    props.class as string | undefined,
  ),
);
</script>

<template>
  <!-- The strip along the sidebar's outer edge that toggles it when clicked. -->
  <button
    type="button"
    :tabindex="-1"
    aria-label="Toggle sidebar"
    data-slot="sidebar-rail"
    :data-state="sidebar.state"
    :class="railClass"
    @click="sidebar.setOpen(!sidebar.open)"
  />
</template>
