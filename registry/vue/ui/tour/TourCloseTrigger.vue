<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourCloseTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourCloseTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tour();
</script>

<template>
  <Ark.CloseTrigger :class="cn(styles.closeTrigger(), props.class)">
    <slot />
  </Ark.CloseTrigger>
</template>
