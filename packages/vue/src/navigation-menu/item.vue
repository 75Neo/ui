<script setup lang="ts">
import { computed } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cva } from "class-variance-authority";
import {
  cn,
  navigationMenuDefaults,
  navigationMenuOrientationData,
  type NavigationMenuItemProps,
} from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuItem = cva("relative flex min-w-0 shrink-0", {
  variants: { orientation: navigationMenuOrientationData.item },
  defaultVariants: navigationMenuDefaults,
});

const props = defineProps<
  NavigationMenuItemProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useNavigationMenuVariants();
const itemClass = computed(() =>
  cn(navigationMenuItem({ orientation: variants.orientation }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Item
    :value="props.value"
    :disabled="props.disabled"
    data-slot="navigation-menu-item"
    :class="itemClass"
  >
    <slot />
  </Ark.Item>
</template>
