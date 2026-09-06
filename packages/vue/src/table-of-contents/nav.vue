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
  <Ark.Nav
    data-slot="table-of-contents-nav"
    :class="cn('flex min-w-0 flex-col gap-3', props.class as string | undefined)"
  >
    <slot />
  </Ark.Nav>
</template>
