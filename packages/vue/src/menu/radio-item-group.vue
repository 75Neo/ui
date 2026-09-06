<script setup lang="ts">
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.RadioItemGroup
    data-slot="menu-radio-item-group"
    :class="cn('flex flex-col', props.class as string | undefined)"
  >
    <slot />
  </Ark.RadioItemGroup>
</template>
