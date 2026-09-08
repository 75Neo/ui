<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

interface StepsCompletedContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsCompletedContentProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.CompletedContent :class="cn(styles.completedContent(), props.class)">
    <slot />
  </Ark.CompletedContent>
</template>
