<script setup lang="ts">
import { type Component, computed } from "vue";
import { Collapsible as Ark } from "@ark-ui/vue/collapsible";
import { cva } from "class-variance-authority";
import {
  cn,
  collapsibleDefaults,
  collapsibleSizeData,
  collapsibleVariantData,
  type CollapsibleTriggerProps,
} from "@75neo/themes";
import { useCollapsibleVariants } from "./variants";
import CollapsibleIndicator from "./indicator.vue";

const collapsibleTrigger = cva(
  "flex w-full min-w-0 cursor-pointer items-center gap-2 text-start font-medium outline-primary/25 transition-colors select-none focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:-outline-offset-3 data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      variant: collapsibleVariantData.trigger,
      size: collapsibleSizeData.trigger,
    },
    defaultVariants: collapsibleDefaults,
  },
);

const props = defineProps<
  CollapsibleTriggerProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useCollapsibleVariants();
const triggerClass = computed(() =>
  cn(collapsibleTrigger(variants), props.class as string | undefined),
);
const leadingClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", collapsibleSizeData.leadingIcon[variants.size]),
);
</script>

<template>
  <Ark.Trigger data-slot="collapsible-trigger" :class="triggerClass">
    <span v-if="props.leadingIcon" data-slot="collapsible-leading-icon" :class="leadingClass">
      <component :is="props.leadingIcon" />
    </span>
    <span data-slot="collapsible-label" class="min-w-0 flex-1 truncate">
      <slot />
    </span>
    <CollapsibleIndicator>
      <component :is="props.trailingIcon" v-if="props.trailingIcon" />
    </CollapsibleIndicator>
  </Ark.Trigger>
</template>
