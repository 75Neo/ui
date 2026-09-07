<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Drawer as Ark } from "@ark-ui/vue/drawer";

interface DrawerTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DrawerTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger :class="props.class">
    <slot />
  </Ark.Trigger>
</template>
