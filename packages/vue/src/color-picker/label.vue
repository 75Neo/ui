<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const cls = computed(() =>
  cn("font-medium text-highlighted select-none", props.class as string | undefined),
);
</script>

<template>
  <Ark.Label data-slot="color-picker-label" :class="cls">
    <slot />
  </Ark.Label>
</template>
