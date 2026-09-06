<script setup lang="ts">
import { computed } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cva } from "class-variance-authority";
import { cn, navigationMenuDefaults, navigationMenuOrientationData } from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuList = cva("flex min-w-0 items-center gap-1", {
  variants: { orientation: navigationMenuOrientationData.list },
  defaultVariants: navigationMenuDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useNavigationMenuVariants();
const listClass = computed(() =>
  cn(navigationMenuList({ orientation: variants.orientation }), props.class as string | undefined),
);
</script>

<template>
  <Ark.List data-slot="navigation-menu-list" :class="listClass">
    <slot />
  </Ark.List>
</template>
