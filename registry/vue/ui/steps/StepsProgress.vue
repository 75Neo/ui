<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

interface StepsProgressProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsProgressProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Progress :class="cn(styles.progress(), props.class)">
    <slot />
  </Ark.Progress>
</template>
