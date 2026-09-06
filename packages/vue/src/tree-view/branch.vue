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
  <Ark.Branch
    data-slot="tree-view-branch"
    :class="cn('flex min-w-0 flex-col', props.class as string | undefined)"
  >
    <slot />
  </Ark.Branch>
</template>
