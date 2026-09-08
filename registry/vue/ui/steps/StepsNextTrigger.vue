<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

interface StepsNextTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsNextTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = steps();
</script>

<template>
  <Ark.NextTrigger :class="cn(styles.nextTrigger(), props.class)">
    <slot />
  </Ark.NextTrigger>
</template>
