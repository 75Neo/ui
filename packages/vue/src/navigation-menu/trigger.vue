<script setup lang="ts">
import { type Component, computed } from "vue";
import { NavigationMenu as Ark } from "@ark-ui/vue/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "@lucide/vue";
import {
  cn,
  navigationMenuDefaults,
  navigationMenuOrientationData,
  navigationMenuSizeData,
  type NavigationMenuTriggerProps,
} from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuTrigger = cva(
  "group/trigger inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-md font-medium text-toned transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted disabled:cursor-not-allowed disabled:opacity-75 data-[state=open]:bg-elevated data-[state=open]:text-highlighted",
  {
    variants: {
      size: navigationMenuSizeData.trigger,
      orientation: navigationMenuOrientationData.trigger,
    },
    defaultVariants: navigationMenuDefaults,
  },
);

const props = defineProps<
  NavigationMenuTriggerProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useNavigationMenuVariants();
const triggerClass = computed(() =>
  cn(navigationMenuTrigger(variants), props.class as string | undefined),
);
const leadingClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", navigationMenuSizeData.leadingIcon[variants.size]),
);
const trailingClass = computed(() =>
  cn(
    "shrink-0 text-dimmed transition-transform duration-200 group-data-[state=open]/trigger:rotate-180 [&>svg]:size-full",
    navigationMenuSizeData.trailingIcon[variants.size],
  ),
);
</script>

<template>
  <Ark.Trigger data-slot="navigation-menu-trigger" :class="triggerClass">
    <span v-if="props.leadingIcon" data-slot="navigation-menu-leading-icon" :class="leadingClass">
      <component :is="props.leadingIcon" />
    </span>
    <slot />
    <span data-slot="navigation-menu-trailing-icon" :class="trailingClass">
      <component :is="props.trailingIcon ?? ChevronDown" />
    </span>
  </Ark.Trigger>
</template>
