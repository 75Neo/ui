<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cn } from "cn";
import {
  navigationMenuStyles as styles,
  type NavigationMenuSize,
} from "@/registry/shared/lib/navigation-menu.styles";

interface NavigationMenuProps {
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  openDelay?: number;
  closeDelay?: number;
  disableClickTrigger?: boolean;
  disableHoverTrigger?: boolean;
  disablePointerLeaveClose?: boolean;
  lazyMount?: boolean;
  unmountOnExit?: boolean;
  size?: NavigationMenuSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<NavigationMenuProps>(), {
  disableClickTrigger: undefined,
  disableHoverTrigger: undefined,
  disablePointerLeaveClose: undefined,
  lazyMount: undefined,
  unmountOnExit: undefined,
  size: "md",
});

const value = defineModel<string>("value");

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:value="value"
    :default-value="props.defaultValue"
    :orientation="props.orientation"
    :open-delay="props.openDelay"
    :close-delay="props.closeDelay"
    :disable-click-trigger="props.disableClickTrigger"
    :disable-hover-trigger="props.disableHoverTrigger"
    :disable-pointer-leave-close="props.disablePointerLeaveClose"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
