<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

interface StepsListProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsListProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.List :class="cn(styles.list(), props.class)">
    <slot />
  </Ark.List>
</template>
