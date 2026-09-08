<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tour();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
