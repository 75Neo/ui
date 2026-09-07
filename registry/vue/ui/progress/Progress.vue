<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Progress as Ark } from "@ark-ui/vue/progress";
import { cn } from "cn";
import { progress, type ProgressSize } from "@/registry/shared/lib/progress.styles";

interface ProgressProps {
  defaultValue?: number | null;
  min?: number;
  max?: number;
  orientation?: "horizontal" | "vertical";
  locale?: string;
  formatOptions?: Intl.NumberFormatOptions;
  size?: ProgressSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ProgressProps>(), {
  size: "md",
});

const value = defineModel<number | null>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = progress();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :min="props.min"
    :max="props.max"
    :orientation="props.orientation"
    :locale="props.locale"
    :format-options="props.formatOptions"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
