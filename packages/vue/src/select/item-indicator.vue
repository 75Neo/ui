<script setup lang="ts">
import { computed } from "vue";
import { Select as Ark } from "@ark-ui/vue/select";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import { cn, selectDefaults, selectSizeData } from "@75neo/themes";
import { useSelectVariants } from "./variants";

const selectItemIndicator = cva("ms-auto shrink-0 [&>svg]:size-full", {
  variants: { size: selectSizeData.itemIndicator },
  defaultVariants: selectDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSelectVariants();
const itemIndicatorClass = computed(() =>
  cn(selectItemIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemIndicator data-slot="select-item-indicator" :class="itemIndicatorClass">
    <slot>
      <component :is="CheckIcon" />
    </slot>
  </Ark.ItemIndicator>
</template>
