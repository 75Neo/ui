<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";

interface PopoverAnchorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<PopoverAnchorProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Anchor :class="props.class">
    <slot />
  </Ark.Anchor>
</template>
