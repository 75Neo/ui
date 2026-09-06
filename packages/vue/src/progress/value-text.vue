<script setup lang="ts">
import { computed } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cva } from "class-variance-authority";
import { cn, progressDefaults, progressSizeData } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressValueText = cva("text-dimmed tabular-nums", {
  variants: { size: progressSizeData.valueText },
  defaultVariants: progressDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useProgressVariants();
const valueTextClass = computed(() =>
  cn(progressValueText({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.ValueText data-slot="progress-value-text" :class="valueTextClass">
    <!-- Ark renders its own text when no slot arrives; an empty one crashes that fallback. -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Ark.ValueText>
</template>
