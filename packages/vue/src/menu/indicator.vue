<script setup lang="ts">
import { Menu as Ark } from "@ark-ui/vue/menu";
import { ChevronDown as ChevronDownIcon } from "@lucide/vue";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Indicator data-slot="menu-indicator" :class="cn(props.class as string | undefined)">
    <slot>
      <component :is="ChevronDownIcon" />
    </slot>
  </Ark.Indicator>
</template>
