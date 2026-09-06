<script setup lang="ts">
import { computed } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cva } from "class-variance-authority";
import { ChevronDown as ChevronDownIcon } from "@lucide/vue";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-transform outline-none hover:text-default disabled:cursor-not-allowed data-[state=open]:rotate-180 [&>svg]:size-full",
  {
    variants: { size: comboboxSizeData.trigger },
    defaultVariants: comboboxDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useComboboxVariants();
const triggerClass = computed(() =>
  cn(comboboxTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Trigger data-slot="combobox-trigger" :class="triggerClass">
    <slot>
      <component :is="ChevronDownIcon" />
    </slot>
  </Ark.Trigger>
</template>
