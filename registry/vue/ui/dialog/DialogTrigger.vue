<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";

interface DialogTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DialogTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger :class="props.class">
    <slot />
  </Ark.Trigger>
</template>
