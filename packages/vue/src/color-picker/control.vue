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

const cls = computed(() => cn("flex items-center gap-2", props.class as string | undefined));
</script>

<template>
  <Ark.Control data-slot="color-picker-control" :class="cls">
    <slot />
  </Ark.Control>
</template>
