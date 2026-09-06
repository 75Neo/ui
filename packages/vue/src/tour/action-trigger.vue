<script setup lang="ts">
import { computed } from "vue";
import { Tour as Ark, type TourActionTriggerProps } from "@ark-ui/vue/tour";
import { cva } from "class-variance-authority";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourActionTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-elevated font-medium text-default outline-primary/25 transition-colors hover:bg-accented/75 focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50 [&:last-child]:bg-inverted [&:last-child]:text-inverted [&:last-child]:hover:bg-inverted/90",
  {
    variants: { size: tourSizeData.actionTrigger },
    defaultVariants: tourDefaults,
  },
);

const props = defineProps<{
  action: TourActionTriggerProps["action"];
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTourVariants();
const actionTriggerClass = computed(() =>
  cn(tourActionTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ActionTrigger
    data-slot="tour-action-trigger"
    :action="props.action"
    :class="actionTriggerClass"
  >
    <!-- Ark renders its own text when no slot arrives; an empty one crashes that fallback. -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Ark.ActionTrigger>
</template>
