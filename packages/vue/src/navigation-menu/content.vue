<script setup lang="ts">
import { computed } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cva } from "class-variance-authority";
import { cn, navigationMenuDefaults, navigationMenuOrientationData } from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuContent = cva(
  "absolute z-50 flex max-w-[min(26rem,calc(100vw-2rem))] min-w-52 flex-col gap-0.5 rounded-md bg-default p-1.5 shadow-lg ring ring-accented outline-none data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
  {
    variants: { orientation: navigationMenuOrientationData.content },
    defaultVariants: navigationMenuDefaults,
  },
);

const props = defineProps<{
  /** The row this panel belongs to. */
  value: string;
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useNavigationMenuVariants();
const contentClass = computed(() =>
  cn(
    navigationMenuContent({ orientation: variants.orientation }),
    props.class as string | undefined,
  ),
);
</script>

<template>
  <Ark.Content :value="props.value" data-slot="navigation-menu-content" :class="contentClass">
    <slot />
  </Ark.Content>
</template>
