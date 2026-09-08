<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Steps as Ark } from "@ark-ui/vue/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

interface StepsItemProps {
  index: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<StepsItemProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = steps();
</script>

<template>
  <Ark.Item :index="props.index" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
