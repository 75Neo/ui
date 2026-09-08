<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

interface StepsContentProps {
  index: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsContentProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Content :index="props.index" :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
