<script setup lang="ts">
import { Toc as Ark } from "@ark-ui/vue/toc";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.List
    data-slot="table-of-contents-list"
    :class="
      cn('relative flex min-w-0 flex-col border-s border-muted', props.class as string | undefined)
    "
  >
    <slot />
  </Ark.List>
</template>
