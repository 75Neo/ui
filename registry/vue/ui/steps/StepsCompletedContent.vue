<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

interface StepsCompletedContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsCompletedContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = steps();
</script>

<template>
  <Ark.CompletedContent :class="cn(styles.completedContent(), props.class)">
    <slot />
  </Ark.CompletedContent>
</template>
