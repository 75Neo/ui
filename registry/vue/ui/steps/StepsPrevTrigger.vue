<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

interface StepsPrevTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsPrevTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = steps();
</script>

<template>
  <Ark.PrevTrigger :class="cn(styles.prevTrigger(), props.class)">
    <slot />
  </Ark.PrevTrigger>
</template>
