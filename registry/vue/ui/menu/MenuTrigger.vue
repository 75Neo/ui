<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Menu as Ark } from "@ark-ui/vue/menu";

interface MenuTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<MenuTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger :class="props.class">
    <slot />
  </Ark.Trigger>
</template>
