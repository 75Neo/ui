<script setup lang="ts">
import { type Component, computed } from "vue";
import { cva } from "class-variance-authority";
import { Menu, X } from "@lucide/vue";
import { cn, headerClasses, headerDefaults, headerToggleSideData } from "@75neo/themes";
import { useHeaderVariants } from "./variants";

const headerToggle = cva(headerClasses.toggle, {
  variants: { toggleSide: headerToggleSideData.toggle },
  defaultVariants: headerDefaults,
});

const props = defineProps<{
  /** Replaces the icon shown while the menu is closed. */
  openIcon?: Component;
  /** Replaces the icon shown while the menu is open. */
  closeIcon?: Component;
  class?: unknown;
}>();

const header = useHeaderVariants();
const toggleClass = computed(() =>
  cn(headerToggle({ toggleSide: header.toggleSide }), props.class as string | undefined),
);
const glyph = computed(() => (header.open ? (props.closeIcon ?? X) : (props.openIcon ?? Menu)));
</script>

<template>
  <!--
    A plain button driving the header's own state rather than one of Ark's triggers:
    the same button renders inside the menu too, and a trigger inside a modal panel is
    inert.
  -->
  <button
    type="button"
    :aria-label="header.open ? 'Close menu' : 'Open menu'"
    :aria-expanded="header.open"
    data-slot="header-toggle"
    :class="toggleClass"
    @click="header.setOpen(!header.open)"
  >
    <component :is="glyph" />
  </button>
</template>
