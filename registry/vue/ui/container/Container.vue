<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { container } from "@/registry/shared/lib/container.styles";

interface ContainerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ContainerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <div :class="cn(container(), props.class)">
    <slot />
  </div>
</template>
