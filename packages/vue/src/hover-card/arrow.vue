<script setup lang="ts">
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Arrow
    data-slot="hover-card-arrow"
    :class="
      cn(
        '[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]',
        props.class as string | undefined,
      )
    "
  >
    <Ark.ArrowTip data-slot="hover-card-arrow-tip" />
  </Ark.Arrow>
</template>
