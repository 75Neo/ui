<script setup lang="ts">
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label
    data-slot="tree-view-label"
    :class="cn('px-2 text-xs font-semibold text-dimmed', props.class as string | undefined)"
  >
    <slot />
  </Ark.Label>
</template>
