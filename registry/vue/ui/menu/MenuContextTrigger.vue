<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";

interface MenuContextTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MenuContextTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ContextTrigger :class="props.class">
    <slot />
  </Ark.ContextTrigger>
</template>
