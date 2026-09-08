<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

interface StepsProps {
  count: number;
  defaultStep?: number;
  orientation?: "horizontal" | "vertical";
  linear?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<StepsProps>(), {
  linear: undefined,
});

const value = defineModel<number>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :count="props.count"
    :default-step="props.defaultStep"
    :orientation="props.orientation"
    :linear="props.linear"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
