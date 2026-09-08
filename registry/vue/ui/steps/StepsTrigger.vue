<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

interface StepsTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = steps();
</script>

<template>
  <Ark.Trigger :class="cn(styles.trigger(), props.class)">
    <slot />
  </Ark.Trigger>
</template>
